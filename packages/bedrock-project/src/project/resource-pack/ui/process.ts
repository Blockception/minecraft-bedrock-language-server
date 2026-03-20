import { Location } from 'bc-minecraft-bedrock-shared';
import { Json } from '../../../internal/json';
import * as Internal from '../../../internal/resource-pack';
import { Documentation, TextDocument } from '../../../types';
import { UIElement } from './ui-element';

/**
 * Processes a UI definition document and extracts all UI element identifiers
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
    if (typeof imp[key] !== 'object' || imp[key] === null) continue;

    // Strip inheritance suffix from element name (e.g. "button@common.button" -> "button")
    const elementName = key.includes('@') ? key.substring(0, key.indexOf('@')) : key;
    const id = namespace ? `${namespace}.${elementName}` : elementName;

    results.push({
      id: id,
      location: Location.create(uri, content.indexOf(key)),
      documentation: Documentation.getDoc(doc, () => `UI Element: ${id}`),
    });
  }

  return results.length > 0 ? results : undefined;
}
