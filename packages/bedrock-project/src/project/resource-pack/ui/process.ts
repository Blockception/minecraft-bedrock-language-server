import { Location } from 'bc-minecraft-bedrock-shared';
import { Json } from '../../../internal/json';
import * as Internal from '../../../internal/resource-pack';
import { Documentation, TextDocument } from '../../../types';
import { UIElement } from './ui-element';

/**
 * Processes a UI definition document and extracts all UI element identifiers,
 * variables, bindings, and inheritance references.
 * @param doc The text document to process
 * @returns An array of UI elements or undefined if the document is not a valid UI file
 */
export function process(doc: TextDocument): UIElement[] | undefined {
  const uri = doc.uri;
  const content = doc.getText();
  const imp = Json.To<Internal.UI>(doc);

  if (!Internal.UI.is(imp)) return undefined;

  const namespace = imp.namespace;
  const results: UIElement[] = [];

  for (const key of Object.keys(imp)) {
    if (key === 'namespace') continue;
    const elementDef = imp[key];
    if (typeof elementDef !== 'object' || elementDef === null) continue;

    // Parse element name and optional inheritance (@)
    let elementName: string;
    let extendsRef: string | undefined;
    if (key.includes('@')) {
      const atIdx = key.indexOf('@');
      elementName = key.substring(0, atIdx);
      extendsRef = key.substring(atIdx + 1);
    } else {
      elementName = key;
    }

    const id = namespace ? `${namespace}.${elementName}` : elementName;

    // Extract variables ($-prefixed keys), including ones declared on nested `controls` and
    // conditional entries in a `variables` array — the common template/instance pattern, where
    // a control elsewhere in the tree declares a $variable that only its own nested controls use.
    const variables = new Set<string>();
    collect_variable_keys(elementDef as Record<string, unknown>, variables);

    // Extract binding names from the bindings array
    const bindings = new Set<string>();
    const bindingsArr = (elementDef as any).bindings;
    if (Array.isArray(bindingsArr)) {
      for (const binding of bindingsArr) {
        if (typeof binding === 'object' && binding !== null) {
          const bindingName = binding.binding_name;
          if (typeof bindingName === 'string') {
            bindings.add(bindingName);
          }
        }
      }
    }

    results.push({
      id,
      location: Location.create(uri, content.indexOf(key)),
      documentation: Documentation.getDoc(doc, () => `UI Element: ${id}`),
      variables,
      bindings,
      extends: extendsRef,
    });
  }

  return results.length > 0 ? results : undefined;
}

/**
 * Strips an optional `|default` suffix from a `$`-prefixed key (e.g. `$icon_texture|default_steve_icon`),
 * so the stored variable name matches how it's referenced elsewhere ($icon_texture).
 * @param key The raw `$`-prefixed key
 * @returns The variable name without its default-value suffix
 */
function normalize_variable_key(key: string): string {
  const pipe = key.indexOf('|');
  return pipe === -1 ? key : key.substring(0, pipe);
}

/**
 * Recursively collects every `$`-prefixed key declared anywhere within an element definition —
 * on the element itself, on nested `controls`, and in conditional `variables` array entries —
 * into `into`.
 * @param node The element or control definition to scan
 * @param into The set to add every found variable name to
 */
function collect_variable_keys(node: Record<string, unknown>, into: Set<string>): void {
  for (const [prop, value] of Object.entries(node)) {
    if (prop.startsWith('$')) {
      into.add(normalize_variable_key(prop));
      continue;
    }

    if (prop === 'controls' && Array.isArray(value)) {
      for (const wrapper of value) {
        if (typeof wrapper !== 'object' || wrapper === null) continue;

        for (const controlDef of Object.values(wrapper as Record<string, unknown>)) {
          if (typeof controlDef === 'object' && controlDef !== null) {
            collect_variable_keys(controlDef as Record<string, unknown>, into);
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
            into.add(normalize_variable_key(variantKey));
          }
        }
      }
    }
  }
}
