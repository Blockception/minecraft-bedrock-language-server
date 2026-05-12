"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFog = createFog;
exports.convertFog = convertFog;
/**
 * Create a new Fog
 */
function createFog() {
    return {
        id: '',
    };
}
/**
 * Convert JSON document to Fog objects
 */
function convertFog(doc, receiver) {
    const root = doc;
    const fogSettings = root['minecraft:fog_settings'];
    if (!fogSettings)
        return;
    const desc = fogSettings['description'];
    if (!desc)
        return;
    const id = desc['identifier'];
    if (!id)
        return;
    const out = createFog();
    out.id = id;
    receiver.push(out);
}
//# sourceMappingURL=fog.js.map