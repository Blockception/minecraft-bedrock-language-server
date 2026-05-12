"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.provideCompletion = provideCompletion;
const bc_minecraft_bedrock_project_1 = require("bc-minecraft-bedrock-project");
const vscode_languageserver_1 = require("vscode-languageserver");
const molang_1 = require("../../../../minecraft/molang");
const getdataset_1 = require("../../../../minecraft/molang/getdataset");
function provideCompletion(context) {
    const packType = bc_minecraft_bedrock_project_1.PackType.detect(context.document.uri);
    const data = (0, getdataset_1.GetDataSet)(context.document.uri);
    const builder = context.builder.withDefaults({
        kind: vscode_languageserver_1.CompletionItemKind.Variable,
    });
    data?.Variables.forEach((item) => {
        builder.add({ label: item.id, documentation: item.documentation ?? `The molang variable: ${item.id}` });
    });
    switch (packType) {
        case bc_minecraft_bedrock_project_1.PackType.behavior_pack:
            return;
        case bc_minecraft_bedrock_project_1.PackType.resource_pack:
            context.database.ProjectData.resourcePacks.entities.forEach((entity) => (0, molang_1.getScopeDefined)(entity.molang, 'v', 'variable').forEach((item) => {
                const identifier = (0, molang_1.getIdentifier)(item);
                builder.add({
                    label: identifier,
                    documentation: `The molang variable: ${identifier}\nDeclared by '${entity.id}'`,
                });
            }));
    }
}
//# sourceMappingURL=variables.js.map