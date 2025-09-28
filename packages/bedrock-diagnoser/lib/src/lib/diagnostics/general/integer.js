"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.general_integer_diagnose = general_integer_diagnose;
exports.general_positive_integer_diagnose = general_positive_integer_diagnose;
const bc_minecraft_bedrock_types_1 = require("bc-minecraft-bedrock-types");
const types_1 = require("../../types");
function general_integer_diagnose(value, diagnoser, range) {
    if (bc_minecraft_bedrock_types_1.General.Integer.is(value.text)) {
        if (range) {
            const v = Number.parseInt(value.text);
            if (v < range.min)
                diagnoser.add(value, `The value of ${v} is lower than the allowed minimum: ${range.min}`, types_1.DiagnosticSeverity.error, "general.integer.minimum");
            if (v > range.max)
                diagnoser.add(value, `The value of ${v} is higher than the allowed minimum: ${range.max}`, types_1.DiagnosticSeverity.error, "general.integer.maximum");
        }
        return true;
    }
    diagnoser.add(value, "Invalid integer value: " + value.text, types_1.DiagnosticSeverity.error, "general.integer.invalid");
    return false;
}
function general_positive_integer_diagnose(value, diagnoser) {
    //If its not a integer then skip positive check
    if (!general_integer_diagnose(value, diagnoser))
        return false;
    const n = Number.parseInt(value.text);
    if (n >= 0)
        return true;
    diagnoser.add(value, `expected a positive integer but got: ${n}`, types_1.DiagnosticSeverity.error, "general.integer.positive.only");
    return false;
}
//# sourceMappingURL=integer.js.map