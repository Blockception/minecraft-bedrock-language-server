"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createItem = createItem;
exports.convertItem = convertItem;
/**
 * Create a new Item
 */
function createItem() {
    return {
        id: '',
        maxDamage: 0,
    };
}
/**
 * Convert JSON document to Item objects
 */
function convertItem(doc, receiver) {
    const root = doc;
    const def = root['minecraft:item'];
    if (!def)
        return;
    const desc = def['description'];
    if (!desc)
        return;
    const id = desc['identifier'];
    if (!id)
        return;
    const out = createItem();
    out.id = id;
    const components = def['components'];
    if (components) {
        const maxDamage = components['minecraft:max_damage'];
        if (maxDamage !== undefined) {
            out.maxDamage = maxDamage;
        }
    }
    receiver.push(out);
}
//# sourceMappingURL=item.js.map