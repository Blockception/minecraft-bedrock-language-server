import { IIdentifier } from '../interfaces';
import { getDoc } from '../static/json';

/**
 * Texture atlas data from resource packs
 */
export interface TextureAtlas extends IIdentifier {
  id: string;
}

/**
 * Create a new TextureAtlas
 */
export function createTextureAtlas(): TextureAtlas {
  return {
    id: '',
  };
}

/**
 * Convert texture atlas file to TextureAtlas objects
 */
export function convertTextureAtlas(filepath: string): TextureAtlas[] {
  const receiver: TextureAtlas[] = [];
  const doc = getDoc(filepath);
  if (doc === null) return receiver;

  const root = doc as Record<string, unknown>;
  const definitions = root['texture_data'] as Record<string, unknown> | undefined;

  if (definitions) {
    for (const defName of Object.keys(definitions)) {
      const item = createTextureAtlas();
      item.id = defName;
      receiver.push(item);
    }
  }

  return receiver;
}
