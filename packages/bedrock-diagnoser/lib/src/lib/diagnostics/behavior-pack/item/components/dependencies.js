"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.behaviorpack_item_components_dependencies = behaviorpack_item_components_dependencies;
const components_1 = require("../../../../utility/components");
//Map of components that are depended on all other specified components
const component_dependents_all = {
    "minecraft:food": ["minecraft:use_modifiers"],
    "minecraft:shooter": ["minecraft:projectile"],
    "minecraft:throwable": ["minecraft:projectile"],
    "minecraft:bundle_interaction": ["minecraft:storage_item"],
    "minecraft:storage_item": ["minecraft:bundle_interaction"],
};
//Map of components that are depended on one of the other specified components
const component_dependents_any = {};
/**
 * Checks if components dependencies are present, a component might need others to be present
 * @param item The item to check
 * @param diagnoser The diagnoser to report to*/
function behaviorpack_item_components_dependencies(item, context, diagnoser) {
    (0, components_1.components_dependencies)("item", context, diagnoser, component_dependents_all, component_dependents_any);
}
//# sourceMappingURL=dependencies.js.map