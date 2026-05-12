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
    data?.Temps.forEach((item) => Generate(item, context.builder));
    switch (packType) {
        case bc_minecraft_bedrock_project_1.PackType.behavior_pack:
            return;
        case bc_minecraft_bedrock_project_1.PackType.resource_pack:
            context.database.ProjectData.resourcePacks.entities.forEach((entity) => generateDU((0, molang_1.getScopeDefined)(entity.molang, 'temp', 't'), context.builder, entity.id));
    }
}
function Generate(data, builder, kinds = vscode_languageserver_1.CompletionItemKind.Variable) {
    builder.add({
        label: data.id,
        documentation: data.documentation ?? `The molang temp variable: ${data.id}`,
        kind: kinds,
    });
}
function generateDU(data, builder, ownerid, kinds = vscode_languageserver_1.CompletionItemKind.Variable) {
    data.forEach((item) => {
        const identifier = (0, molang_1.getIdentifier)(item);
        builder.add({
            label: identifier,
            documentation: `The molang temp variable: ${identifier}\nDeclared by '${ownerid}'`,
            kind: kinds,
        });
    });
}
//# sourceMappingURL=temps.js.map