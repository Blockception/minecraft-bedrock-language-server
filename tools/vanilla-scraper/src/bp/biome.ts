import { IIdentifier } from '../interfaces';

/**
 * Biome data from behavior packs
 */
export interface Biome extends IIdentifier {
  id: string;
  tags: string[];
}

/**
 * Create a new Biome
 */
export function createBiome(): Biome {
  return {
    id: '',
    tags: [],
  };
}

/**
 * Convert JSON document to Biome objects
 */
export function convertBiome(doc: object, receiver: Biome[]): void {
  const root = doc as Record<string, unknown>;
  const def = root['minecraft:biome'] as Record<string, unknown>;
  if (!def) return;

  const desc = def['description'] as Record<string, unknown>;
  if (!desc) return;

  const id = desc['identifier'] as string;
  if (!id || id.trim() === '') return;

  const out = createBiome();
  out.id = id;
  receiver.push(out);

  const components = def['components'] as Record<string, unknown> | undefined;
  if (components) {
    out.tags = getTags(components);
  }
}

/**
 * Extract tags from biome components
 */
function getTags(components: Record<string, unknown>): string[] {
  const result: string[] = [];

  const tagsComponent = components['minecraft:tags'] as Record<string, unknown> | undefined;
  if (!tagsComponent) return result;

  const tags = tagsComponent['tags'] as unknown[] | undefined;
  if (!tags) return result;

  for (const item of tags) {
    const v = item as string;
    if (v && v.trim() !== '') {
      result.push(v);
    }
  }

  return result;
}
