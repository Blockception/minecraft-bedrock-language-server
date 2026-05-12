"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.diagnose_structure_implementation = diagnose_structure_implementation;
const bc_minecraft_bedrock_project_1 = require("bc-minecraft-bedrock-project");
const __1 = require("../..");
const definitions_1 = require("../../definitions");
function diagnose_structure_implementation(id, diagnoser) {
    const strId = bc_minecraft_bedrock_project_1.Text.UnQuote(typeof id === 'string' ? id : id.text);
    const data = diagnoser.context.getProjectData().projectData;
    // Check general structures (vanilla etc.)
    if (data.general.structures.has(strId))
        return true;
    // Check project-defined structures
    const struc = diagnoser.context.getProjectData().behaviors.structures.get(strId, diagnoser.project);
    if (struc !== undefined)
        return true;
    // Check definitions (from project configuration)
    if ((0, definitions_1.check_definition_value)(diagnoser.project.definitions.structure, strId, diagnoser))
        return true;
    // Check behavior pack structures collection
    if (data.behaviorPacks.structures.has(strId))
        return true;
    //Nothing then report error
    __1.Errors.missing('behaviors', 'structures', strId, diagnoser, id);
    return false;
}
//# sourceMappingURL=diagnose.js.map