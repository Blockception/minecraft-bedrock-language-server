import { Location } from 'bc-minecraft-bedrock-shared';
import { TextDocument } from '../../../types';
import { Structure } from './structure';

/**
 *
 * @param doc
 * @returns
 */
export function process(doc: TextDocument): Structure | undefined {
  const uri = doc.uri;
  let index = uri.indexOf('structures');

  if (index < 0) return undefined;
  index += 11;

  let path = uri.substring(index, uri.length).replace(/\\/g, '/');
  path = path.replace('.mcstructure', '');

  // The first path segment is the namespace; the rest is the identifier.
  // Files directly in the structures/ folder use the 'mystructure' namespace.
  const slashIndex = path.indexOf('/');
  let id: string;

  if (slashIndex < 0) {
    id = `mystructure:${path}`;
  } else {
    const namespace = path.substring(0, slashIndex);
    const name = path.substring(slashIndex + 1);
    id = `${namespace}:${name}`;
  }

  return {
    id: id,
    location: Location.create(uri, 0),
    documentation: `McStructure: ${id}`,
  };
}
