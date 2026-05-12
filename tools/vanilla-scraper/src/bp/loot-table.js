"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createLootTable = createLootTable;
exports.convertLootTable = convertLootTable;
/**
 * Create a new LootTable
 */
function createLootTable(id = '') {
    return {
        id,
    };
}
/**
 * Convert file path to LootTable object
 */
function convertLootTable(filepath, receiver) {
    const index = filepath.indexOf('loot_tables');
    if (index >= 0) {
        const id = filepath.substring(index).replace(/\\/g, '/');
        receiver.push(createLootTable(id));
    }
}
//# sourceMappingURL=loot-table.js.map