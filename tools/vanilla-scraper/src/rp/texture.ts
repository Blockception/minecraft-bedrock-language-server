import * as path from 'path';
import * as fs from 'fs';
import { IIdentifier } from '../interfaces';

/**
 * Texture data from resource packs
 */
export interface Texture extends IIdentifier {
  id: string;
}

/**
 * Create a new Texture
 */
export function createTexture(): Texture {
  return {
    id: '',
  };
}

/**
 * Convert pack folder to Texture objects
 */
export function convertTexture(pack: string, receiver: Texture[]): void {
  const texturesFolder = path.join(pack, 'textures');

  const pngFiles = getFilesRecursively(texturesFolder, '.png');
  const tgaFiles = getFilesRecursively(texturesFolder, '.tga');

  convertFiles(pngFiles, receiver);
  convertFiles(tgaFiles, receiver);
}

/**
 * Convert file paths to Texture objects
 */
function convertFiles(files: string[], receiver: Texture[]): void {
  for (const filepath of files) {
    const index = filepath.indexOf('textures');

    if (index >= 0) {
      const ext = path.extname(filepath);
      const id = filepath.substring(index, filepath.length - ext.length).replace(/\\/g, '/');

      if (id) {
        const item = createTexture();
        item.id = id;
        receiver.push(item);
      }
    }
  }
}

/**
 * Get all files with extension recursively
 */
function getFilesRecursively(folder: string, extension: string): string[] {
  const results: string[] = [];

  function walk(dir: string) {
    if (!fs.existsSync(dir)) return;

    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(fullPath);
      } else if (entry.isFile() && entry.name.endsWith(extension)) {
        results.push(fullPath);
      }
    }
  }

  walk(folder);
  return results;
}
