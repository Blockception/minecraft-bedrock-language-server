"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.behaviorpack_entity_components_check = behaviorpack_entity_components_check;
const diagnose_1 = require("./components/diagnose");
function behaviorpack_entity_components_check(entity, context, diagnoser) {
    const desc = entity["minecraft:entity"];
    behaviorpack_entity_componentscontainer_check(desc.components, context, diagnoser);
    if (desc.component_groups === undefined)
        return;
    Object.entries(desc.component_groups).forEach(([, group]) => behaviorpack_entity_componentscontainer_check(group, context, diagnoser));
}
function behaviorpack_entity_componentscontainer_check(container, context, diagnoser) {
    if (container === null || typeof container !== "object")
        return;
    (0, diagnose_1.behaviorpack_diagnose_entity_components)(container, context, diagnoser);
}
//# sourceMappingURL=components.js.map