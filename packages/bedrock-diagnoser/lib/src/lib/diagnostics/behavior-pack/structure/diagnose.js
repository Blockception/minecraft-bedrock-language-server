"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.diagnose_structure_implementation = diagnose_structure_implementation;
const types_1 = require("../../../types");
const definitions_1 = require("../../definitions");
const __1 = require("../..");
function diagnose_structure_implementation(id, diagnoser) {
    const strId = typeof id === "string" ? id : id.text;
    //If it has a slash it needs ""
    if (strId.includes("/")) {
        if (strId.startsWith('"') && strId.endsWith('"')) {
            // Do nothing
        }
        else {
            diagnoser.add(id, `A structure id with '/' needs quotes surrounding it: ${strId} => "${strId}"`, types_1.DiagnosticSeverity.error, "behaviorpack.mcstructure.invalid");
        }
        //Project has structures
        const struc = diagnoser.context.getProjectData().behaviors.structures.get(strId, diagnoser.project);
        if (struc !== undefined) {
            return true;
        }
    }
    const data = diagnoser.context.getProjectData().projectData;
    if (data.general.structures.has(strId))
        return true;
    //structures can be identified with : or /
    if (strId.includes(":")) {
        let cid = strId.replace("mystructure:", "").replace(":", "/");
        if (!cid.includes("/"))
            cid = cid.replace(/"/g, "");
        if ((0, definitions_1.check_definition_value)(diagnoser.project.definitions.structure, cid, diagnoser))
            return true;
        if (data.behaviorPacks.structures.has(cid))
            return true;
        if (data.general.structures.has(cid))
            return true;
    }
    //Nothing then report error
    __1.Errors.missing("behaviors", "structures", strId, diagnoser, id);
    return false;
}
//# sourceMappingURL=diagnose.js.map