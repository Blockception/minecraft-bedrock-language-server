"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createEntity = createEntity;
exports.convertEntity = convertEntity;
/**
 * Create a new Entity
 */
function createEntity() {
    return {
        id: '',
        animations: [],
    };
}
/**
 * Convert JSON document to Entity objects
 */
function convertEntity(doc, receiver) {
    const root = doc;
    const entity = root['minecraft:client_entity'];
    if (!entity)
        return;
    const desc = entity['description'];
    if (!desc)
        return;
    const id = desc['identifier'];
    if (!id)
        return;
    const out = createEntity();
    out.id = id;
    receiver.push(out);
    const animations = desc['animations'];
    if (animations) {
        for (const animName of Object.keys(animations)) {
            if (!out.animations.includes(animName)) {
                out.animations.push(animName);
            }
        }
    }
}
//# sourceMappingURL=entity.js.map