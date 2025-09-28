"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.no_other_duplicates = no_other_duplicates;
const types_1 = require("../../types");
function no_other_duplicates(diagPrefix, set, id, diagnoser) {
    return; //TODO: Renable someday if/when refactoring happens 
    const uri = diagnoser.document.uri;
    set.forEach((current) => {
        if (current.id === id && current.location.uri !== uri)
            diagnoser.add(`identifier/${id}`, `"${id}" has been defined multiple times:\n${uri}\n${current.location.uri}`, types_1.DiagnosticSeverity.warning, `${diagPrefix}.duplicate_id`);
    });
}
//# sourceMappingURL=duplicate-check.js.map