"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.general_float_diagnose = general_float_diagnose;
exports.general_positive_float_diagnose = general_positive_float_diagnose;
const bc_minecraft_bedrock_types_1 = require("bc-minecraft-bedrock-types");
const types_1 = require("../../types");
function general_float_diagnose(value, diagnoser, range) {
    if (bc_minecraft_bedrock_types_1.General.Float.is(value.text)) {
        if (range) {
            const v = Number.parseFloat(value.text);
            if (v < range.min)
                diagnoser.add(value, `The value of ${v} is lower than the allowed minimum: ${range.min}`, types_1.DiagnosticSeverity.error, "general.float.minimum");
            if (v > range.max)
                diagnoser.add(value, `The value of ${v} is higher than the allowed minimum: ${range.max}`, types_1.DiagnosticSeverity.error, "general.float.maximum");
        }
        return true;
    }
    diagnoser.add(value, "Invalid float value: " + value.text, types_1.DiagnosticSeverity.error, "general.float.invalid");
    return false;
}
function general_positive_float_diagnose(value, diagnoser) {
    //If its not a float then skip positive check
    if (!general_float_diagnose(value, diagnoser))
        return false;
    const n = Number.parseInt(value.text);
    if (n >= 0)
        return true;
    diagnoser.add(value, `expected a positive float but got: ${n}`, types_1.DiagnosticSeverity.error, "general.float.positive.only");
    return false;
}
//# sourceMappingURL=float.js.map