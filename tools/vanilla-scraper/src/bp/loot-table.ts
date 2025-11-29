import { IIdentifier } from '../interfaces';

/**
 * Loot table data from behavior packs
 */
export interface LootTable extends IIdentifier {
  id: string;
}

/**
 * Create a new LootTable
 */
export function createLootTable(id = ''): LootTable {
  return {
    id,
  };
}

/**
 * Convert file path to LootTable object
 */
export function convertLootTable(filepath: string, receiver: LootTable[]): void {
  const index = filepath.indexOf('loot_tables');

  if (index >= 0) {
    const id = filepath.substring(index).replace(/\\/g, '/');
    receiver.push(createLootTable(id));
  }
}
