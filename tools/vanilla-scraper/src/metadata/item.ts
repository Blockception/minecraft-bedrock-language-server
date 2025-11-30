import { Item } from '../bp/item';

/**
 * Item data from metadata
 */
export interface MetadataItem {
  command_name: string;
  name: string;
  raw_id: number;
  serialization_id: string;
  serialization_name: string;
}

/**
 * Convert metadata item to BP items (multiple for different names)
 */
export function convertMetadataItem(item: MetadataItem): Item[] {
  const items: Item[] = [];

  // Add all name variants
  const names = new Set([item.name, item.command_name, item.serialization_name]);

  for (const name of names) {
    if (name && name.trim() !== '') {
      items.push({
        id: name,
        maxDamage: 0,
      });
    }
  }

  return items;
}
