
import { Location } from 'bc-minecraft-bedrock-shared';
import { Documentation, TextDocument } from '../../../types';
import { Function } from './function';

/**
 * Extracts the function ID from a URI.
 * The ID is the path relative to the `functions/` directory segment, without
 * the `.mcfunction` extension and with backslashes normalised to forward slashes.
 * Returns `undefined` when the URI does not contain a `functions/` segment or
 * ends with `.json`.
 *
 * @param uri The document URI (e.g. `file:///bp/functions/my_folder/my_fn.mcfunction`)
 * @returns The function ID (e.g. `my_folder/my_fn`), or `undefined`
 */
export function extractFunctionId(uri: string): string | undefined {
  if (uri.endsWith('.json')) return undefined;

  const index = uri.indexOf('functions');
  if (index < 0) return undefined;

  const id = uri.substring(index + 10).replace(/\\/g, '/').replace(/\.mcfunction$/, '');
  return id || undefined;
}

/**
 *
 * @param doc
 * @returns
 */
export function process(doc: TextDocument): Function | undefined {
  const uri = doc.uri;

  let id = extractFunctionId(uri);
  if (id === undefined) return undefined;

  if (id.includes(' ') || id.includes('\t')) {
    id = `"${id}"`;
  }

  return {
    id: id,
    location: Location.create(uri, 0),
    documentation: Documentation.getDoc(doc, () => `Mcfunction: ${id}`),
  };
}
