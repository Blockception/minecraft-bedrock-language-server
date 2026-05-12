"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onCodeAction = onCodeAction;
const vscode_languageserver_1 = require("vscode-languageserver");
function isOptimizationData(data) {
    return typeof data === 'object' && data !== null && typeof data.replacement === 'string';
}
function onCodeAction(builder, diag) {
    if (!isOptimizationData(diag.data))
        return;
    const replacement = diag.data.replacement;
    builder.push({
        title: `Rewrite to: ${replacement}`,
        kind: vscode_languageserver_1.CodeActionKind.QuickFix,
        diagnostics: [diag],
        isPreferred: true,
        edit: {
            changes: {
                [builder.context.document.uri]: [vscode_languageserver_1.TextEdit.replace(diag.range, replacement)],
            },
        },
    });
}
//# sourceMappingURL=optimization.js.map