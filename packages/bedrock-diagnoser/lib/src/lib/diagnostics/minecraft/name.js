"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.minecraft_name_diagnose = minecraft_name_diagnose;
const bc_minecraft_bedrock_project_1 = require("bc-minecraft-bedrock-project");
const types_1 = require("../../types");
const definitions_1 = require("../definitions");
/**
 * Checks if the given name exists or is valid.
 * @param value The name to check
 * @param diagnoser The diagnoser
 * @returns True if the name exists
 */
function minecraft_name_diagnose(value, diagnoser) {
    const text = value.text;
    const id = bc_minecraft_bedrock_project_1.Text.UnQuote(text);
    //Defined in McProject
    if ((0, definitions_1.check_definition_value)(diagnoser.project.definitions.name, id, diagnoser)) {
        return true;
    }
    if (text.includes(" ") || text.includes("\t")) {
        if (text.startsWith('"') && text.endsWith('"')) {
            return true;
        }
        diagnoser.add(value, "Name includes whitespace, but hasn't been properly escaped with quotes", types_1.DiagnosticSeverity.error, "minecraft.name.unquoted");
        return false;
    }
    return true;
}
//# sourceMappingURL=name.js.map