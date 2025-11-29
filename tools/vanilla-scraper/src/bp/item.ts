import { IIdentifier } from '../interfaces';

/**
 * Item data from behavior packs
 */
export interface Item extends IIdentifier {
  id: string;
  maxDamage: number;
}

/**
 * Create a new Item
 */
export function createItem(): Item {
  return {
    id: '',
    maxDamage: 0,
  };
}

/**
 * Convert JSON document to Item objects
 */
export function convertItem(doc: object, receiver: Item[]): void {
  const root = doc as Record<string, unknown>;
  const def = root['minecraft:item'] as Record<string, unknown>;
  if (!def) return;

  const desc = def['description'] as Record<string, unknown>;
  if (!desc) return;

  const id = desc['identifier'] as string;
  if (!id) return;

  const out = createItem();
  out.id = id;

  const components = def['components'] as Record<string, unknown> | undefined;
  if (components) {
    const maxDamage = components['minecraft:max_damage'] as number | undefined;
    if (maxDamage !== undefined) {
      out.maxDamage = maxDamage;
    }
  }

  receiver.push(out);
}
