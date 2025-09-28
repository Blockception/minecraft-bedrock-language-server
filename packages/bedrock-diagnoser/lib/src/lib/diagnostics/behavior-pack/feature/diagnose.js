"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.behaviorpack_feature_diagnose = behaviorpack_feature_diagnose;
const __1 = require("../..");
function behaviorpack_feature_diagnose(id, diagnoser) {
    const feat = diagnoser.context.getProjectData().behaviors.features.get(id, diagnoser.project);
    if (feat === undefined) {
        __1.Errors.missing("behaviors", "features", id, diagnoser);
        return false;
    }
    return true;
}
//# sourceMappingURL=diagnose.js.map