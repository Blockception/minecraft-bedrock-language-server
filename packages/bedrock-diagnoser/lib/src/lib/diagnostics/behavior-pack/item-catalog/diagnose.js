"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.behaviorpack_item_catalog_diagnose = behaviorpack_item_catalog_diagnose;
const __1 = require("../..");
function behaviorpack_item_catalog_diagnose(id, diagnoser) {
    const feat = diagnoser.context.getProjectData().behaviors.items_groups.get(id, diagnoser.project);
    if (feat === undefined) {
        __1.Errors.missing("behaviors", "items_groups", id, diagnoser);
        return false;
    }
    return true;
}
//# sourceMappingURL=diagnose.js.map