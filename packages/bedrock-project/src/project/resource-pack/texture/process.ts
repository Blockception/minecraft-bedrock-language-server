
import { Location } from '@blockception/packages-shared';
import { TextureAtlas } from '../../../internal/resource-pack/texture-atlas';
import { Documentation, TextDocument } from '../../../types';
import { Texture } from './texture';

/**
 *
 * @param doc
 * @returns
 */
export function ProcessTextureAtlas(doc: TextDocument): Texture[] | undefined {
  const imp = TextDocument.toObject(doc, TextureAtlas.is);
  if (!imp) return undefined;

  const uri = doc.uri;
  const content = doc.getText();

  return Object.entries(imp.texture_data).map(([key]) => {
    return {
      id: key,
      location: Location.create(uri, content.indexOf(key)),
      documentation: Documentation.getDoc(doc, () => `Texture: ${key}`),
    };
  });
}
