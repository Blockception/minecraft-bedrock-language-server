"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.minecraft_tickingarea_diagnose = minecraft_tickingarea_diagnose;
const bc_minecraft_bedrock_project_1 = require("bc-minecraft-bedrock-project");
const types_1 = require("../../types");
const definitions_1 = require("../definitions");
function minecraft_tickingarea_diagnose(value, diagnoser) {
    const data = diagnoser.context.getProjectData().projectData;
    const id = bc_minecraft_bedrock_project_1.Text.UnQuote(value.text);
    //Defined in McProject
    if ((0, definitions_1.check_definition_value)(diagnoser.project.definitions.tickingarea, id, diagnoser))
        return;
    //Project has defined
    if (data.general.tickingAreas.has(id))
        return;
    //Nothing then report error
    diagnoser.add(value, `Cannot find tickingarea definition: ${id}`, types_1.DiagnosticSeverity.error, "minecraft.tickingarea.missing");
}
//# sourceMappingURL=tickingarea.js.map