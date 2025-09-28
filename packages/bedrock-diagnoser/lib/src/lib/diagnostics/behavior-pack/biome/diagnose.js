"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.is_biome_defined = is_biome_defined;
const types_1 = require("../../../types");
const __1 = require("../..");
/**Checks if the biome exists in the project or in vanilla, if not then a bug is reported
 * @param id
 * @param diagnoser
 * @returns
 */
function is_biome_defined(id, diagnoser, namespace_required = false) {
    if (namespace_required && id.split(':').length == 1)
        diagnoser.add(id, "A namespace is required to reference the biome", types_1.DiagnosticSeverity.error, "behaviorpack.biome.namespace_required");
    //Project has biome
    const anim = diagnoser.context.getProjectData().behaviors.biomes.get(id, diagnoser.project);
    if (anim === undefined) {
        __1.Errors.missing("behaviors", "biomes", id, diagnoser);
        return false;
    }
    return true;
}
//# sourceMappingURL=diagnose.js.map