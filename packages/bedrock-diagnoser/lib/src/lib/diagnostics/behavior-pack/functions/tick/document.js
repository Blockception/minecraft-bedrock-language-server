"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.diagnose_tick_document = diagnose_tick_document;
const types_1 = require("../../../../types");
const json_1 = require("../../../json/json");
/**Diagnoses the given document as an tick.json
 * @param doc The text document to diagnose
 * @param diagnoser The diagnoser builder to receive the errors*/
function diagnose_tick_document(diagnoser) {
    var _a;
    const data = json_1.Json.LoadReport(diagnoser);
    if (!data || !data.values)
        return;
    const pack = diagnoser.context.getProjectData().projectData.behaviorPacks.get(diagnoser.document.uri);
    if (!pack)
        return;
    //Specific lookup in the pack
    (_a = data.values) === null || _a === void 0 ? void 0 : _a.forEach((path) => {
        if (!pack.functions.has(path)) {
            diagnoser.add(path, "Cannot find mcfunction: " + path, types_1.DiagnosticSeverity.error, "behaviorpack.mcfunction.missing");
        }
    });
}
//# sourceMappingURL=document.js.map