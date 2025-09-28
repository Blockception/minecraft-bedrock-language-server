"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsedComponents = getUsedComponents;
exports.getUsedGroups = getUsedGroups;
exports.hasGroup = hasGroup;
/**
 * Returns all the used components in the given data
 * @param data The data to get the used components from
 * @returns All the used components
 */
function getUsedComponents(data) {
    const out = [];
    if (data === null || data === void 0 ? void 0 : data.components) {
        Object.getOwnPropertyNames(data.components).forEach((c) => {
            if (!out.includes(c))
                out.push(c);
        });
    }
    const groups = data === null || data === void 0 ? void 0 : data.component_groups;
    if (groups) {
        Object.entries(groups).forEach(([, group]) => {
            Object.getOwnPropertyNames(group).forEach((c) => {
                if (!out.includes(c))
                    out.push(c);
            });
        });
    }
    return out;
}
/**
 * Returns all the used events in the given data
 * @param data The data to get the used events from
 * @returns All the used events
 */
function getUsedGroups(data) {
    const groups = data === null || data === void 0 ? void 0 : data.component_groups;
    if (groups) {
        return Object.getOwnPropertyNames(groups);
    }
    return [];
}
/**
 * Returns true or false if the given entity has the given component group
 * @param data The entity to check
 * @param group The group to check for
 * @returns true or false if the given entity has the given component group
 */
function hasGroup(data, group) {
    if (data === null || data === void 0 ? void 0 : data.component_groups) {
        if (data === null || data === void 0 ? void 0 : data.component_groups[group]) {
            return true;
        }
    }
    return false;
}
//# sourceMappingURL=used.js.map