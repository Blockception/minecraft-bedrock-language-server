"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateMolangFunction = generateMolangFunction;
const vscode_languageserver_1 = require("vscode-languageserver");
function generateMolangFunction(scope, data, builder, kinds = vscode_languageserver_1.CompletionItemKind.Function) {
    let syntax = data.id;
    let doc = data.documentation ?? `The molang query: ${data.id}`;
    if (data.deprecated) {
        if (data.deprecated.startsWith('query') || data.deprecated.startsWith('math')) {
            doc = 'deprecated: replace with: ' + data.deprecated;
        }
        else {
            doc = 'deprecated: ' + data.deprecated;
        }
    }
    if (data.parameters && data.parameters.length > 0) {
        syntax += '(' + data.parameters.map((p) => p.id).join(', ') + ')';
        doc += '\n\n';
        doc += data.parameters.map((i) => `- **${i.id}** ${i.documentation}`).join('\n');
    }
    builder.add({
        label: data.id,
        documentation: {
            kind: 'markdown',
            value: `${scope}.${syntax}\n\n${doc}`,
        },
        deprecated: data.deprecated !== undefined,
        kind: kinds,
        insertText: syntax,
    });
}
//# sourceMappingURL=general.js.map