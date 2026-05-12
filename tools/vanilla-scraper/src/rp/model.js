"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createModel = createModel;
exports.convertModel = convertModel;
/**
 * Create a new Model
 */
function createModel() {
    return {
        id: '',
        bones: [],
    };
}
/**
 * Convert JSON document to Model objects
 */
function convertModel(doc, receiver) {
    const root = doc;
    // Check for old format (geometry.*)
    for (const [key, value] of Object.entries(root)) {
        if (key.startsWith('geometry.')) {
            convert180(key, value, receiver);
        }
    }
    // Check for new format (minecraft:geometry)
    if ('minecraft:geometry' in root) {
        convertNew(root, receiver);
    }
}
/**
 * Convert old format (1.8.0) geometry
 */
function convert180(name, geo, receiver) {
    let id = name;
    const colonIndex = id.indexOf(':');
    if (colonIndex >= 0) {
        id = id.substring(0, colonIndex);
    }
    const item = createModel();
    item.id = id;
    receiver.push(item);
    const bones = geo['bones'];
    if (bones) {
        harvestBones(bones, item.bones);
    }
}
/**
 * Convert new format geometry
 */
function convertNew(root, receiver) {
    const geos = root['minecraft:geometry'];
    for (const geo of geos) {
        const geoObj = geo;
        const desc = geoObj['description'];
        if (!desc)
            continue;
        const identifier = desc['identifier'];
        if (!identifier)
            continue;
        const item = createModel();
        item.id = identifier;
        receiver.push(item);
        const bones = geoObj['bones'];
        if (bones) {
            harvestBones(bones, item.bones);
        }
    }
}
/**
 * Harvest bone names from array
 */
function harvestBones(root, bones) {
    for (const bone of root) {
        const boneObj = bone;
        const name = boneObj['name'];
        if (name && !bones.includes(name)) {
            bones.push(name);
        }
    }
}
//# sourceMappingURL=model.js.map