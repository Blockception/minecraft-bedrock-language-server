"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.provideCompletion = provideCompletion;
const vscode_languageserver_1 = require("vscode-languageserver");
const getdataset_1 = require("../../../../minecraft/molang/getdataset");
function provideCompletion(context) {
    const data = (0, getdataset_1.GetDataSet)(context.document.uri);
    data?.Contexts.forEach((item) => generate(item, context.builder));
}
function generate(data, builder, kinds = vscode_languageserver_1.CompletionItemKind.Struct) {
    builder.add({
        label: data.id,
        documentation: data.documentation ?? `The molang context variable: ${data.id}`,
        kind: kinds,
    });
}
//# sourceMappingURL=contexts.js.map