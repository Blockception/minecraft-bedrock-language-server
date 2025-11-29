import * as path from 'path';
import { IIdentifier } from '../interfaces';
import { getDoc } from '../static/json';

/**
 * Sound data from resource packs
 */
export interface Sound extends IIdentifier {
  id: string;
}

/**
 * Create a new Sound
 */
export function createSound(): Sound {
  return {
    id: '',
  };
}

/**
 * Convert pack folder to Sound objects
 */
export function convertSound(pack: string, receiver: Sound[], soundFiles: string[]): void {
  const filepath = path.join(pack, 'sounds', 'sound_definitions.json');

  const doc = getDoc(filepath);
  if (doc === null) return;

  const root = doc as Record<string, unknown>;
  const definitions = root['sound_definitions'] as Record<string, unknown> | undefined;

  if (definitions) {
    for (const [defName, defValue] of Object.entries(definitions)) {
      const item = createSound();
      item.id = defName;
      receiver.push(item);

      const def = defValue as Record<string, unknown>;
      const sounds = def['sounds'] as unknown[] | undefined;
      if (sounds) {
        convertSounds(sounds, soundFiles);
      }
    }
  }
}

/**
 * Convert sounds array to file paths
 */
function convertSounds(sounds: unknown[], soundFiles: string[]): void {
  for (const item of sounds) {
    if (typeof item === 'object' && item !== null) {
      const obj = item as Record<string, unknown>;
      const name = obj['name'] as string | undefined;
      if (name) {
        soundFiles.push(name);
      }
    } else if (typeof item === 'string') {
      soundFiles.push(item);
    }
  }
}
