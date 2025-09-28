"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.general_string_diagnose = general_string_diagnose;
const bc_minecraft_bedrock_types_1 = require("bc-minecraft-bedrock-types");
const types_1 = require("../../types");
function general_string_diagnose(value, diagnoser) {
    if (bc_minecraft_bedrock_types_1.General.String.is(value.text))
        return;
    diagnoser.add(value, `Invalid minecraft string: '${value.text}'`, types_1.DiagnosticSeverity.error, "general.string.invalid");
}
//# sourceMappingURL=string.js.map