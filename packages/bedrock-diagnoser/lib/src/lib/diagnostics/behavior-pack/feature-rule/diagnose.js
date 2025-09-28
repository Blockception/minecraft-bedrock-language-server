"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.behaviorpack_featurerule_diagnose = behaviorpack_featurerule_diagnose;
const __1 = require("../..");
function behaviorpack_featurerule_diagnose(id, diagnoser) {
    const rules = diagnoser.context.getProjectData().behaviors.features_rules.get(id, diagnoser.project);
    if (rules === undefined) {
        __1.Errors.missing("behaviors", "features_rules", id, diagnoser);
        return false;
    }
    return false;
}
//# sourceMappingURL=diagnose.js.map