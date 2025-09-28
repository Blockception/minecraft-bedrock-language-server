"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.minecraft_fakentity_diagnose = minecraft_fakentity_diagnose;
const types_1 = require("../../types");
const bc_minecraft_bedrock_project_1 = require("bc-minecraft-bedrock-project");
function minecraft_fakentity_diagnose(value, diagnoser) {
    const data = diagnoser.context.getProjectData().projectData;
    const id = bc_minecraft_bedrock_project_1.Text.UnQuote(value.text);
    //Project has defined
    if (data.general.fakeEntities.has(id))
        return;
    //Nothing then report error
    diagnoser.add(value, `Cannot find fake entity definition: ${id}`, types_1.DiagnosticSeverity.error, "minecraft.fakeentity.missing");
}
//# sourceMappingURL=fake-entity.js.map