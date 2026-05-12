"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBlock = createBlock;
exports.createBlockState = createBlockState;
exports.convertBlock = convertBlock;
/**
 * Create a new Block
 */
function createBlock() {
    return {
        id: '',
        properties: [],
    };
}
/**
 * Create a new BlockState
 */
function createBlockState() {
    return {
        values: [],
        name: '',
        type: '',
    };
}
/**
 * Convert JSON document to Block objects
 */
function convertBlock(doc, receiver) {
    const root = doc;
    const def = root['minecraft:block'];
    if (!def)
        return;
    const desc = def['description'];
    if (!desc)
        return;
    const id = desc['identifier'];
    if (!id || id.trim() === '')
        return;
    const out = createBlock();
    out.id = id;
    receiver.push(out);
    const properties = desc['properties'];
    if (properties) {
        for (const [name] of Object.entries(properties)) {
            out.properties.push(name);
        }
    }
}
//# sourceMappingURL=block.js.map