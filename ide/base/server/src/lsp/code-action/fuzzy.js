"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fuzzyMatch = fuzzyMatch;
const fastest_levenshtein_1 = require("fastest-levenshtein");
const vscode_languageserver_1 = require("vscode-languageserver");
async function fuzzyMatch(builder, diag) {
    const code = diag.code;
    if (typeof code !== 'string')
        return;
    if (code.includes('missing') || code.endsWith('invalid')) {
        // Do nothing
    }
    else {
        return;
    }
    const id = builder.getId(diag.range);
    let max = 20;
    const items = [
        { id: '', distance: max },
        { id: '', distance: max },
        { id: '', distance: max },
        { id: '', distance: max },
        { id: '', distance: max },
    ];
    await builder.context.database.forEach((item) => {
        if (items.findIndex((i) => i.id === item.id) > -1)
            return;
        const dist = (0, fastest_levenshtein_1.distance)(id, item.id);
        if (dist > max)
            return;
        for (let i = 0; i < items.length; i++) {
            if (items[i].distance > dist) {
                items[i] = { id: item.id, distance: dist };
                break;
            }
        }
        max = items[4].distance;
    }, builder.context.token);
    items
        .sort((x, y) => x.distance - y.distance)
        .forEach((m) => {
        if (m.id === '')
            return;
        const document = builder.context.document;
        const action = {
            title: 'Did you mean: ' + m.id,
            kind: vscode_languageserver_1.CodeActionKind.QuickFix,
            edit: {
                changes: {
                    [document.uri]: [vscode_languageserver_1.TextEdit.replace(diag.range, m.id)],
                },
            },
        };
        builder.push(action);
    });
}
//# sourceMappingURL=fuzzy.js.map