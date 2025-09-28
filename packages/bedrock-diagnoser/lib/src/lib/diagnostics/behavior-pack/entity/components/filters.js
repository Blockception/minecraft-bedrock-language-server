"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.behaviorpack_entity_components_filters = behaviorpack_entity_components_filters;
const diagnose_1 = require("../../../minecraft/filter/diagnose");
/**
 *
 * @param container
 * @param diagnoser
 * @returns
 */
function behaviorpack_entity_components_filters(container, diagnoser) {
    if (container === undefined)
        return;
    // Components
    if (container.components) {
        traverse_object(container.components, diagnoser);
    }
    // Component groups
    if (container.component_groups) {
        Object.values(container.component_groups).forEach((group) => traverse_object(group, diagnoser));
    }
    // Events
    if (container.events) {
        Object.values(container.events).forEach((event) => traverse_object(event, diagnoser));
    }
    if (container.filters) {
        (0, diagnose_1.minecraft_diagnose_filters)(container.filters, diagnoser);
    }
}
function traverse_object(data, diagnoser) {
    Object.keys(data).forEach((property_key) => {
        const property = data[property_key];
        if (typeof property === "object") {
            if (property_key.includes("filter")) {
                (0, diagnose_1.minecraft_diagnose_filters)(property, diagnoser);
            }
            else {
                traverse_object(property, diagnoser);
            }
        }
    });
}
//# sourceMappingURL=filters.js.map