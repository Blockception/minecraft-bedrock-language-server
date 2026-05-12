"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.provideCompletion = provideCompletion;
const vscode_languageserver_1 = require("vscode-languageserver");
function provideCompletion(context) {
    context.builder.add({
        label: '"',
        documentation: 'The start of the string',
        kind: vscode_languageserver_1.CompletionItemKind.Constant,
    }).insertText = '""';
}
//# sourceMappingURL=strings.js.map