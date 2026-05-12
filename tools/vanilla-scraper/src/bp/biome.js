"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBiome = createBiome;
exports.convertBiome = convertBiome;
/**
 * Create a new Biome
 */
function createBiome() {
    return {
        id: '',
        tags: [],
    };
}
/**
 * Convert JSON document to Biome objects
 */
function convertBiome(doc, receiver) {
    const root = doc;
    const def = root['minecraft:biome'];
    if (!def)
        return;
    const desc = def['description'];
    if (!desc)
        return;
    const id = desc['identifier'];
    if (!id || id.trim() === '')
        return;
    const out = createBiome();
    out.id = id;
    receiver.push(out);
    const components = def['components'];
    if (components) {
        out.tags = getTags(components);
    }
}
/**
 * Extract tags from biome components
 */
function getTags(components) {
    const result = [];
    const tagsComponent = components['minecraft:tags'];
    if (!tagsComponent)
        return result;
    const tags = tagsComponent['tags'];
    if (!tags)
        return result;
    for (const item of tags) {
        const v = item;
        if (v && v.trim() !== '') {
            result.push(v);
        }
    }
    return result;
}
//# sourceMappingURL=biome.js.map