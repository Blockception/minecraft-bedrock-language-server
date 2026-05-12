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
export declare function createLootTable(id?: string): LootTable;
/**
 * Convert file path to LootTable object
 */
export declare function convertLootTable(filepath: string, receiver: LootTable[]): void;
//# sourceMappingURL=loot-table.d.ts.map