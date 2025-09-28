"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.diagnose_block_culling_document = diagnose_block_culling_document;
/* eslint-disable @typescript-eslint/no-unused-vars */
const bc_minecraft_bedrock_project_1 = require("bc-minecraft-bedrock-project");
const json_1 = require("../../json");
const molang_1 = require("../../molang");
function diagnose_block_culling_document(diagnoser) {
    const rules = json_1.Json.LoadReport(diagnoser);
    if (!bc_minecraft_bedrock_project_1.Internal.ResourcePack.BlockCulling.is(rules))
        return;
    (0, molang_1.diagnose_molang_syntax_current_document)(diagnoser, rules);
    // TODO check block_culling document
}
//# sourceMappingURL=document.js.map