"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.general_keyword_diagnose = general_keyword_diagnose;
const types_1 = require("../../types");
function general_keyword_diagnose(keyword, value, diagnoser) {
    //Keyword matches the given value, then stop
    if (value.text === keyword)
        return;
    diagnoser.add(value, `Invalid keyword: ${value}, expected keyword: ${value}`, types_1.DiagnosticSeverity.error, "general.keyword.invalid");
}
//# sourceMappingURL=keyword.js.map