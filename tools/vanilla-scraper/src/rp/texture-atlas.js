"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTextureAtlas = createTextureAtlas;
exports.convertTextureAtlas = convertTextureAtlas;
const json_1 = require("../static/json");
/**
 * Create a new TextureAtlas
 */
function createTextureAtlas() {
    return {
        id: '',
    };
}
/**
 * Convert texture atlas file to TextureAtlas objects
 */
function convertTextureAtlas(filepath) {
    const receiver = [];
    const doc = (0, json_1.getDoc)(filepath);
    if (doc === null)
        return receiver;
    const root = doc;
    const definitions = root['texture_data'];
    if (definitions) {
        for (const defName of Object.keys(definitions)) {
            const item = createTextureAtlas();
            item.id = defName;
            receiver.push(item);
        }
    }
    return receiver;
}
//# sourceMappingURL=texture-atlas.js.map