"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.diagnose_model_document = diagnose_model_document;
const bc_minecraft_bedrock_project_1 = require("bc-minecraft-bedrock-project");
const json_1 = require("../../json");
/**Diagnoses the given document as a model
 * @param doc The text document to diagnose
 * @param diagnoser The diagnoser builder to receive the errors*/
function diagnose_model_document(diagnoser) {
    //Load model
    const model = json_1.Json.LoadReport(diagnoser);
    if (!bc_minecraft_bedrock_project_1.Internal.ResourcePack.Model.is(model))
        return;
    // TODO model check, parents
}
//# sourceMappingURL=entry.js.map