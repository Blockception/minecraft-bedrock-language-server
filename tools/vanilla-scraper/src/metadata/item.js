"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertMetadataItem = convertMetadataItem;
/**
 * Convert metadata item to BP items (multiple for different names)
 */
function convertMetadataItem(item) {
    const items = [];
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
//# sourceMappingURL=item.js.map