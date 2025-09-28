"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.particle_is_defined = particle_is_defined;
const __1 = require("../..");
function particle_is_defined(id, diagnoser) {
    const strId = typeof id === "string" ? id : id.text;
    //Project has particle
    const particle = diagnoser.context.getProjectData().resources.particles.get(strId, diagnoser.project);
    if (particle === undefined) {
        return __1.Errors.missing("behaviors", "animations", strId, diagnoser, id);
    }
}
//# sourceMappingURL=diagnose.js.map