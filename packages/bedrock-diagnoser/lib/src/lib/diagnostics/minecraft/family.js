"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.minecraft_family_diagnose = minecraft_family_diagnose;
const types_1 = require("../../types");
const bc_minecraft_bedrock_project_1 = require("bc-minecraft-bedrock-project");
const definitions_1 = require("../definitions");
const bc_minecraft_bedrock_vanilla_data_1 = require("bc-minecraft-bedrock-vanilla-data");
/**
 *
 * @param value
 * @param diagnoser
 * @returns True if the family was found in an entity
 */
function minecraft_family_diagnose(value, diagnoser) {
    const id = bc_minecraft_bedrock_project_1.Text.UnQuote(typeof value === "string" ? value : value.text);
    //Defined in McProject
    if ((0, definitions_1.check_definition_value)(diagnoser.project.definitions.family, id, diagnoser))
        return true;
    let out = false;
    const data = diagnoser.context.getProjectData().projectData;
    //Project has defined
    data.behaviorPacks.entities.forEach((entity) => {
        if (entity.families.defined.has(id))
            out = true;
    });
    if (out)
        return true;
    //Vanilla has defined
    if (bc_minecraft_bedrock_vanilla_data_1.MinecraftData.General.Entities.families.includes(id))
        return true;
    //Nothing then report error
    diagnoser.add(value, `Cannot find family definition: ${id}`, types_1.DiagnosticSeverity.error, "minecraft.family.missing");
    return false;
}
//# sourceMappingURL=family.js.map