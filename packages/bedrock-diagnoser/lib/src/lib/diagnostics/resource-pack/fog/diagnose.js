"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fog_is_defined = fog_is_defined;
const __1 = require("../..");
function fog_is_defined(id, diagnoser) {
    //Project has fog
    const fog = diagnoser.context.getProjectData().resources.fogs.get(id, diagnoser.project);
    if (fog === undefined) {
        __1.Errors.missing("resources", "fogs", id, diagnoser);
        return false;
    }
    return true;
}
//# sourceMappingURL=diagnose.js.map