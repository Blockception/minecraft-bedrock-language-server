import { Internal } from 'bc-minecraft-bedrock-project';
import { DiagnosticSeverity, DocumentDiagnosticsBuilder } from '../../../types';
import { Json } from '../../json/json';

/** The set of currently supported UI control "type" values (wiki.bedrock.dev/json-ui element types). */
const VALID_UI_TYPES = new Set<string>([
  'panel',
  'stack_panel',
  'collection_panel',
  'grid',
  'label',
  'image',
  'input_panel',
  'button',
  'toggle',
  'dropdown',
  'slider',
  'slider_box',
  'edit_box',
  'scroll_view',
  'scrollbar_track',
  'scrollbar_box',
  'factory',
  'screen',
  'custom',
  'selection_wheel',
]);

/** Element types that used to exist but no longer function; still worth flagging distinctly from a plain typo. */
const LEGACY_UI_TYPES = new Set<string>(['tab', 'carousel_label', 'grid_item', 'scrollbar']);

/** Valid values for a binding's `binding_type` field. */
const VALID_BINDING_TYPES = new Set<string>(['global', 'view', 'collection', 'collection_details', 'none']);

/** Valid values for a binding's `binding_condition` field. */
const VALID_BINDING_CONDITIONS = new Set<string>(['always', 'always_when_visible', 'visible', 'once', 'none', 'visibility_changed']);

/** The maximum number of `@` links to follow when walking an inheritance chain, as a cycle guard. */
const MAX_INHERITANCE_DEPTH = 16;

/** The name a global variables file may use inside a resource pack's `ui` folder. */
const GLOBAL_VARIABLES_PATTERNS = ['**/ui/_global_variables.json', 'ui/_global_variables.json', '_global_variables.json'];

/**
 * Matches a resource pack's `ui/_ui_defs.json` registry file by name, regardless of its exact
 * folder depth. This file lists every UI file Minecraft actually loads for the pack.
 * @param uri The document uri to test
 */
function is_ui_defs_file(uri: string): boolean {
  return /(^|[\\/])_ui_defs\.json$/i.test(uri);
}

/** A reference to a `$variable` usage site, for deferred undefined-variable reporting. */
interface VariableUsage {
  name: string;
  key: string;
}

/** The type of the project-wide indexed UI element collection. */
type UiElementCollection = ReturnType<DocumentDiagnosticsBuilder['context']['getProjectData']>['projectData']['resourcePacks']['uiElements'];

/** Shared state accumulated while walking a UI document's elements and nested controls. */
interface WalkState {
  diagnoser: DocumentDiagnosticsBuilder;
  namespace?: string;
  uiElements: UiElementCollection;
  declared: Set<string>;
  usages: VariableUsage[];
}

/**
 * Diagnoses the given document as a UI definition.
 * Validates JSON structure, reports broken @ inheritance references, unrecognized control
 * types, undefined `$variable` usages, and malformed `bindings` entries.
 * @param diagnoser The diagnoser builder to receive the errors
 */
export function diagnose_ui_document(diagnoser: DocumentDiagnosticsBuilder): void {
  if (is_ui_defs_file(diagnoser.document.uri)) {
    diagnose_ui_defs_document(diagnoser);
    return;
  }

  const imp = Json.LoadReport<Internal.ResourcePack.UI>(diagnoser);
  if (!Internal.ResourcePack.UI.is(imp)) return;

  // Get all indexed UI elements for cross-reference validation
  const uiElements = diagnoser.context.getProjectData().projectData.resourcePacks.uiElements;
  const namespace = typeof imp.namespace === 'string' ? imp.namespace : undefined;

  const state: WalkState = { diagnoser, namespace, uiElements, declared: new Set(), usages: [] };

  // Variables declared anywhere else in the project (e.g. an inherited parent in another file)
  // are also accepted, to avoid flagging legitimately inherited `$variable`s as undefined.
  uiElements.forEach((element) => {
    element.variables.forEach((name) => state.declared.add(normalize_variable(name)));
  });

  collect_global_variables(diagnoser, state.declared);

  for (const key of Object.keys(imp)) {
    if (key === 'namespace') continue;
    const elementDef = imp[key];
    if (typeof elementDef !== 'object' || elementDef === null) continue;

    const resolved = check_inheritance(key, state);
    walk(elementDef as Record<string, unknown>, key, state, !resolved);
  }

  for (const usage of state.usages) {
    if (!state.declared.has(usage.name)) {
      diagnoser.add(
        usage.key,
        `Variable "${usage.name}" is not defined on this element, its inherited chain, or anywhere else in the project`,
        DiagnosticSeverity.warning,
        'resourcepack.ui.variable.undefined',
      );
    }
  }
}

/**
 * Diagnoses a resource pack's `ui/_ui_defs.json` registry file: the explicit list of UI files
 * Minecraft loads for the pack. Gathers each listed entry and validates it resolves to a real
 * file within the resource pack.
 * @param diagnoser The diagnoser builder to receive the errors
 */
function diagnose_ui_defs_document(diagnoser: DocumentDiagnosticsBuilder): void {
  const imp = Json.LoadReport<{ ui_defs?: unknown }>(diagnoser);
  if (typeof imp !== 'object' || imp === null || !Array.isArray(imp.ui_defs)) return;

  const pack = diagnoser.context.getProjectData().projectData.resourcePacks.get(diagnoser.document.uri);
  if (!pack) return;

  for (const entry of imp.ui_defs) {
    if (typeof entry !== 'string') {
      diagnoser.add(
        'ui_defs',
        `Entry "${JSON.stringify(entry)}" in "ui_defs" is not a file path string`,
        DiagnosticSeverity.warning,
        'resourcepack.ui.defs.entry.invalid',
      );
      continue;
    }

    const found = diagnoser.context.getFiles(pack.folder, [entry], pack.context.ignores);
    if (found.length === 0) {
      diagnoser.add(
        entry,
        `UI file "${entry}" listed in "ui_defs" does not exist in this resource pack`,
        DiagnosticSeverity.warning,
        'resourcepack.ui.defs.missing_file',
      );
    }
  }
}

/**
 * Resolves a (possibly bare) `@` parent reference against a namespace.
 * @param ref The raw reference, e.g. `button` or `common.button`
 * @param namespace The namespace to qualify a bare reference with
 * @returns The fully-qualified id, or `undefined` if `ref` is a dynamic `$variable` reference
 */
function resolve_reference(ref: string, namespace: string | undefined): string | undefined {
  if (ref.startsWith('$')) return undefined;
  return ref.includes('.') ? ref : namespace ? `${namespace}.${ref}` : ref;
}

/**
 * Validates a (possibly nested) element/control key for a resolvable `@` inheritance target,
 * and — if resolvable — walks the rest of the inheritance chain to collect every ancestor's
 * declared `$variable`s.
 * @param key The element or control key, e.g. `my_button@common.button`
 * @param state The shared walk state
 * @returns `true` if `key` has no `@`, or its inheritance chain fully resolves; `false` if any
 * link is unresolvable (a broken reference or a dynamic `$variable` parent)
 */
function check_inheritance(key: string, state: WalkState): boolean {
  if (!key.includes('@')) return true;

  const parentRaw = key.substring(key.indexOf('@') + 1);
  const resolved = resolve_reference(parentRaw, state.namespace);

  // A parent supplied via a $variable is resolved dynamically and cannot be statically checked.
  if (resolved === undefined) return false;

  if (!state.uiElements.has(resolved)) {
    state.diagnoser.add(
      key,
      `UI element "${resolved}" referenced in inheritance is not defined`,
      DiagnosticSeverity.warning,
      'resourcepack.ui.inheritance.missing',
    );
    return false;
  }

  return walk_inheritance_chain(resolved, state);
}

/**
 * Walks an already-resolved ancestor chain (via each element's indexed `extends`), collecting
 * every ancestor's declared `$variable`s. Does not emit diagnostics: a broken deeper link was
 * (or will be) reported while diagnosing the ancestor's own file.
 * @param startId The fully-qualified id to start walking from
 * @param state The shared walk state
 * @returns `true` if every link up to the root resolves; `false` if the chain is broken or cyclic
 */
function walk_inheritance_chain(startId: string, state: WalkState): boolean {
  const visited = new Set<string>();
  let currentId: string | undefined = startId;

  for (let depth = 0; currentId && depth < MAX_INHERITANCE_DEPTH; depth++) {
    if (visited.has(currentId)) return false;
    visited.add(currentId);

    const element = state.uiElements.get(currentId);
    if (!element) return false;

    element.variables.forEach((name) => state.declared.add(normalize_variable(name)));

    if (!element.extends) return true;

    const elementNamespace = currentId.includes('.') ? currentId.substring(0, currentId.indexOf('.')) : undefined;
    currentId = resolve_reference(element.extends, elementNamespace);
  }

  return currentId === undefined;
}

/**
 * Validates the `type` field of an element/control definition.
 * @param key The owning element or control key
 * @param type The `type` value to validate
 * @param diagnoser The diagnoser builder to receive the errors
 */
function validate_type(key: string, type: string, diagnoser: DocumentDiagnosticsBuilder): void {
  if (LEGACY_UI_TYPES.has(type)) {
    diagnoser.add(key, `UI element type "${type}" is a legacy type that no longer works`, DiagnosticSeverity.warning, 'resourcepack.ui.type.legacy');
    return;
  }

  if (!VALID_UI_TYPES.has(type)) {
    diagnoser.add(key, `UI element type "${type}" is not a recognized control type`, DiagnosticSeverity.warning, 'resourcepack.ui.type.invalid');
  }
}

/**
 * Validates the entries of a `bindings` array.
 * @param key The owning element or control key
 * @param bindings The bindings array to validate
 * @param diagnoser The diagnoser builder to receive the errors
 */
function validate_bindings(key: string, bindings: unknown[], diagnoser: DocumentDiagnosticsBuilder): void {
  for (const binding of bindings) {
    if (typeof binding !== 'object' || binding === null) continue;
    const entry = binding as Record<string, unknown>;

    const bindingType = entry.binding_type;
    if (typeof bindingType === 'string' && !VALID_BINDING_TYPES.has(bindingType)) {
      diagnoser.add(key, `Binding type "${bindingType}" is not a recognized binding type`, DiagnosticSeverity.warning, 'resourcepack.ui.binding.type.invalid');
    }

    const bindingCondition = entry.binding_condition;
    if (typeof bindingCondition === 'string' && !VALID_BINDING_CONDITIONS.has(bindingCondition)) {
      diagnoser.add(
        key,
        `Binding condition "${bindingCondition}" is not a recognized binding condition`,
        DiagnosticSeverity.warning,
        'resourcepack.ui.binding.condition.invalid',
      );
    }

    if ((bindingType === 'collection' || bindingType === 'collection_details') && typeof entry.binding_collection_name !== 'string') {
      diagnoser.add(
        key,
        `Binding of type "${bindingType}" requires a "binding_collection_name"`,
        DiagnosticSeverity.warning,
        'resourcepack.ui.binding.collection_name.missing',
      );
    }
  }
}

/**
 * Normalizes a `$variable` key or value by stripping an optional `|default` suffix.
 * @param value The raw `$`-prefixed key or value
 * @returns The variable name without its default-value suffix
 */
function normalize_variable(value: string): string {
  const pipe = value.indexOf('|');
  return pipe === -1 ? value : value.substring(0, pipe);
}

/**
 * Collects `$`-prefixed top-level keys from a project's `ui/_global_variables.json` file(s), if
 * any exist, into `declared`.
 * @param diagnoser The diagnoser builder, used to locate and read sibling files
 * @param declared The set to add every found global variable name to
 */
function collect_global_variables(diagnoser: DocumentDiagnosticsBuilder, declared: Set<string>): void {
  const pack = diagnoser.context.getProjectData().projectData.resourcePacks.get(diagnoser.document.uri);
  if (!pack) return;

  const files = diagnoser.context.getFiles(pack.folder, GLOBAL_VARIABLES_PATTERNS, pack.context.ignores);

  for (const file of files) {
    const doc = diagnoser.context.getDocument(file);
    if (!doc) continue;

    let content: unknown;
    try {
      content = Json.parse(doc.getText());
    } catch {
      // A malformed _global_variables.json is reported by its own diagnostics pass, not here.
      continue;
    }

    if (typeof content !== 'object' || content === null) continue;

    for (const key of Object.keys(content)) {
      if (key.startsWith('$')) declared.add(normalize_variable(key));
    }
  }
}

/**
 * Recursively walks an element/control definition, validating its `type` and `bindings`,
 * collecting `$variable` declarations, recording `$variable` usages, and descending into
 * nested `controls` (checking their own `@` inheritance along the way).
 * @param node The element or control definition to walk
 * @param key The owning element or control key, used for diagnostic positions
 * @param state The shared walk state
 * @param uncertain Whether this node sits under an `@` link that couldn't be fully resolved —
 * if so, its `$variable` usages are not reliably checkable and are not recorded
 */
function walk(node: Record<string, unknown>, key: string, state: WalkState, uncertain: boolean): void {
  const type = node.type;
  if (typeof type === 'string' && !type.startsWith('$')) {
    validate_type(key, type, state.diagnoser);
  }

  if (Array.isArray(node.bindings)) {
    validate_bindings(key, node.bindings, state.diagnoser);
  }

  for (const [prop, value] of Object.entries(node)) {
    if (prop.startsWith('$')) {
      state.declared.add(normalize_variable(prop));
    }

    if (prop === 'controls' && Array.isArray(value)) {
      for (const wrapper of value) {
        if (typeof wrapper !== 'object' || wrapper === null) continue;

        for (const controlKey of Object.keys(wrapper as Record<string, unknown>)) {
          const resolved = check_inheritance(controlKey, state);

          const controlDef = (wrapper as Record<string, unknown>)[controlKey];
          if (typeof controlDef === 'object' && controlDef !== null) {
            walk(controlDef as Record<string, unknown>, controlKey, state, uncertain || !resolved);
          }
        }
      }
      continue;
    }

    if (prop === 'variables' && Array.isArray(value)) {
      // Conditional variable declarations: [{ "requires": "$cond", "$name": "value" }, ...]
      for (const variant of value) {
        if (typeof variant !== 'object' || variant === null) continue;

        for (const variantKey of Object.keys(variant as Record<string, unknown>)) {
          if (variantKey.startsWith('$')) {
            state.declared.add(normalize_variable(variantKey));
          }
        }
      }
      continue;
    }

    if (!uncertain) {
      collect_usages(value, key, state);
    }
  }
}

/**
 * Recursively scans a value for exact `$variable` usage strings.
 * @param value The value to scan
 * @param key The owning element or control key, used for diagnostic positions
 * @param state The shared walk state
 */
function collect_usages(value: unknown, key: string, state: WalkState): void {
  if (typeof value === 'string') {
    const normalized = normalize_variable(value);
    if (/^\$[A-Za-z_]\w*$/.test(normalized)) {
      state.usages.push({ name: normalized, key });
    }
    return;
  }

  if (Array.isArray(value)) {
    for (const item of value) collect_usages(item, key, state);
    return;
  }

  if (typeof value === 'object' && value !== null) {
    for (const nested of Object.values(value as Record<string, unknown>)) {
      collect_usages(nested, key, state);
    }
  }
}
