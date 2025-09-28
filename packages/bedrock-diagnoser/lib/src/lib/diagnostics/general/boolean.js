"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.general_boolean_diagnose = general_boolean_diagnose;
const bc_minecraft_bedrock_types_1 = require("bc-minecraft-bedrock-types");
const types_1 = require("../../types");
function general_boolean_diagnose(value, diagnoser) {
    if (bc_minecraft_bedrock_types_1.General.Boolean.is(value.text))
        return;
    diagnoser.add(value, "Invalid boolean value: " + value.text, types_1.DiagnosticSeverity.error, "general.boolean.invalid");
}
//# sourceMappingURL=boolean.js.map