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
        events: [],
        families: [],
    };
}
/**
 * Convert JSON document to Entity objects
 */
function convertEntity(doc, receiver) {
    const root = doc;
    const def = root['minecraft:entity'];
    if (!def)
        return;
    const desc = def['description'];
    if (!desc)
        return;
    const id = desc['identifier'];
    if (!id)
        return;
    const out = createEntity();
    out.id = id;
    receiver.push(out);
    const events = def['events'];
    if (events) {
        for (const eventName of Object.keys(events)) {
            out.events.push(eventName);
        }
    }
    // Check components
    const comps = def['components'];
    if (comps) {
        checkComponents(comps, out);
    }
    const groups = def['component_groups'];
    if (groups) {
        for (const group of Object.values(groups)) {
            checkComponents(group, out);
        }
    }
}
/**
 * Check components for family types
 */
function checkComponents(comps, receiver) {
    const families = comps['minecraft:type_family'];
    if (!families)
        return;
    const familyArray = families['family'];
    if (!familyArray)
        return;
    for (const f of familyArray) {
        const fStr = f;
        if (fStr && fStr.trim() !== '' && !receiver.families.includes(fStr)) {
            receiver.families.push(fStr);
        }
    }
}
//# sourceMappingURL=entity.js.map