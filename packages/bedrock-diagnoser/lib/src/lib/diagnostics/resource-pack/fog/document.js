"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.diagnose_fog_document = diagnose_fog_document;
/* eslint-disable @typescript-eslint/no-unused-vars */
const bc_minecraft_bedrock_project_1 = require("bc-minecraft-bedrock-project");
const json_1 = require("../../json");
const molang_1 = require("../../molang");
/**Diagnoses the given document as a fog
 * @param doc The text document to diagnose
 * @param diagnoser The diagnoser builder to receive the errors*/
function diagnose_fog_document(diagnoser) {
    //TODO add rp diagnostics
    const entity = json_1.Json.LoadReport(diagnoser);
    if (!bc_minecraft_bedrock_project_1.Internal.ResourcePack.Fog.is(entity))
        return;
    (0, molang_1.diagnose_molang_syntax_current_document)(diagnoser, entity);
}
//# sourceMappingURL=document.js.map