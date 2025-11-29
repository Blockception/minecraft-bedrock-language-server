import * as path from 'path';
import * as fs from 'fs';
import { IIdentifier } from '../interfaces';
import { getDoc } from '../static/json';

/**
 * Material data from resource packs
 */
export interface Material extends IIdentifier {
  id: string;
}

/**
 * Create a new Material
 */
export function createMaterial(): Material {
  return {
    id: '',
  };
}

/**
 * Convert pack folder to Material objects
 */
export function convertMaterial(pack: string, receiver: Material[]): void {
  const folder = path.join(pack, 'materials');

  if (!fs.existsSync(folder)) {
    return;
  }

  const files = getFilesRecursively(folder, '.material');

  for (const filepath of files) {
    const doc = getDoc(filepath);
    if (doc === null) continue;

    const root = doc as Record<string, unknown>;
    const materials = root['materials'] as Record<string, unknown> | undefined;

    if (materials) {
      for (const matName of Object.keys(materials)) {
        if (matName === 'version') continue;

        let id = matName;
        const colonIndex = id.indexOf(':');
        if (colonIndex >= 0) {
          id = id.substring(0, colonIndex);
        }

        const item = createMaterial();
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
