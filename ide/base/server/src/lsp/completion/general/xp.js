"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.provideCompletion = provideCompletion;
const vscode_languageserver_1 = require("vscode-languageserver");
function provideCompletion(context) {
    const builder = context.builder;
    builder.add({ label: '1L', documentation: 'Add 1 level of xp', kind: vscode_languageserver_1.CompletionItemKind.Value });
    builder.add({ label: '-1L', documentation: 'Remove 1 level of xp', kind: vscode_languageserver_1.CompletionItemKind.Value });
    builder.add({ label: '-1000L', documentation: 'Removes 1000 xp levels', kind: vscode_languageserver_1.CompletionItemKind.Value });
}
//# sourceMappingURL=xp.js.map