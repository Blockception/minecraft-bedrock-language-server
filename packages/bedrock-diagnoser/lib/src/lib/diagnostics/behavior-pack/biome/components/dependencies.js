"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.behaviorpack_biome_components_dependencies = behaviorpack_biome_components_dependencies;
const components_1 = require("../../../../utility/components");
//Map of components that are depended on all other specified components
const component_dependents_all = {};
//Map of components that are depended on one of the other specified components
const component_dependents_any = {};
/**
 * Checks if components dependencies are present, a component might need others to be present
 * @param biome The entity to check
 * @param diagnoser The diagnoser to report to*/
function behaviorpack_biome_components_dependencies(biome, context, diagnoser) {
    (0, components_1.components_dependencies)("biome", context, diagnoser, component_dependents_all, component_dependents_any);
}
//# sourceMappingURL=dependencies.js.map