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

    // Extract variables ($-prefixed keys from the element definition)
    const variables = new Set<string>();
    for (const prop of Object.keys(elementDef as object)) {
      if (prop.startsWith('$')) {
        variables.add(prop);
      }
    }

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
