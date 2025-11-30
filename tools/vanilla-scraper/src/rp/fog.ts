import { IIdentifier } from '../interfaces';

/**
 * Fog data from resource packs
 */
export interface Fog extends IIdentifier {
  id: string;
}

/**
 * Create a new Fog
 */
export function createFog(): Fog {
  return {
    id: '',
  };
}

/**
 * Convert JSON document to Fog objects
 */
export function convertFog(doc: object, receiver: Fog[]): void {
  const root = doc as Record<string, unknown>;
  const fogSettings = root['minecraft:fog_settings'] as Record<string, unknown>;
  if (!fogSettings) return;

  const desc = fogSettings['description'] as Record<string, unknown>;
  if (!desc) return;

  const id = desc['identifier'] as string;
  if (!id) return;

  const out = createFog();
  out.id = id;
  receiver.push(out);
}
