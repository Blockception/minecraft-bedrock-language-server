"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.diagnose_spawn_rule_document = diagnose_spawn_rule_document;
const molang_1 = require("../../molang");
/**
 * Diagnoses the given document as an spawn rule
 * @param doc The text document to diagnose
 * @param diagnoser The diagnoser builder to receive the errors
 */
function diagnose_spawn_rule_document(diagnoser) {
    (0, molang_1.diagnose_molang_syntax_current_document)(diagnoser);
    //TODO add diagnostics
}
//# sourceMappingURL=document.js.map