"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.model_is_defined = model_is_defined;
const __1 = require("../..");
function model_is_defined(modelId, diagnoser) {
    //Project has model
    const model = diagnoser.context.getProjectData().resources.models.get(modelId, diagnoser.project);
    if (model === undefined) {
        __1.Errors.missing("resources", "models", modelId, diagnoser);
        return false;
    }
    return true;
}
//# sourceMappingURL=diagnose.js.map