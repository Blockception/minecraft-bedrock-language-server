"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.diagnose_mcfunction_document = diagnose_mcfunction_document;
const types_1 = require("../../../types");
const commands_1 = require("./commands");
/**Diagnoses the given document as an mcfunction
 * @param doc The text document to diagnose
 * @param diagnoser The diagnoser builder to receive the errors*/
function diagnose_mcfunction_document(diagnoser) {
    if (diagnoser.document.getText().trim() === "") {
        diagnoser.add(0, "Empty mcfunction found, minecraft will not load this function", types_1.DiagnosticSeverity.error, "behaviorpack.mcfunction.empty");
    }
    (0, commands_1.diagnose_mcfunction_commands_document)(diagnoser);
}
//# sourceMappingURL=document.js.map