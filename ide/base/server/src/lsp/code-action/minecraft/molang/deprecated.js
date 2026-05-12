"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onCodeAction = onCodeAction;
const vscode_languageserver_1 = require("vscode-languageserver");
const bc_minecraft_molang_1 = require("bc-minecraft-molang");
function onCodeAction(builder, diag) {
    const id = builder.getText(diag.range);
    if (id === '')
        return;
    const [scope, fnName] = id.split('.');
    const data = scope.startsWith('q') ? bc_minecraft_molang_1.MolangData.General.getQuery(fnName) : bc_minecraft_molang_1.MolangData.General.getMath(fnName);
    if (!data || !data.deprecated)
        return;
    if (!data.deprecated.startsWith('q') && !data.deprecated.startsWith('m'))
        return;
    const newId = data.deprecated;
    builder.push({
        title: 'Replace with: ' + newId,
        kind: vscode_languageserver_1.CodeActionKind.QuickFix,
        diagnostics: [diag],
        isPreferred: true,
        edit: {
            changes: {
                [builder.context.document.uri]: [vscode_languageserver_1.TextEdit.replace(diag.range, newId)],
            },
        },
    });
}
//# sourceMappingURL=deprecated.js.map