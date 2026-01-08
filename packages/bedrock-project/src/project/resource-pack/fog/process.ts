import { Location } from 'bc-minecraft-bedrock-shared';
import * as Internal from '../../../internal/resource-pack';
import { Documentation, TextDocument } from '../../../types';
import { Fog } from './fog';

/**
 *
 * @param doc
 * @returns
 */
export function process(doc: TextDocument): Fog | undefined {
  const imp = TextDocument.toObject(doc, Internal.Fog.is);
  if (!imp) return undefined;

  const uri = doc.uri;
  const content = doc.getText();
  const container = imp['minecraft:fog_settings'];
  const id = container.description.identifier;

  return {
    id: id,
    location: Location.create(uri, content.indexOf(id)),
    documentation: Documentation.getDoc(doc, () => `Fog: ${id}`),
  };
}
