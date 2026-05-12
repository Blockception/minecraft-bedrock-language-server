"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appendToFile = appendToFile;
const vscode_languageserver_1 = require("vscode-languageserver");
const vscode_languageserver_textdocument_1 = require("vscode-languageserver-textdocument");
async function appendToFile(context) {
    const { arguments: args } = context;
    function handleResponse(result) {
        context.logger.info('changes: ', result);
        if (result.applied === false) {
            context.logger.warn("Changes haven't been applied");
        }
    }
    if (!args || args.length < 2) {
        throw new Error('wrong parameters: expected: [uri, line]');
    }
    const uri = args[0];
    const line = args[1].trim();
    if (!(uri && line)) {
        throw new Error('wrong parameters: expected: [uri, line]');
    }
    let document = context.documents.get(uri);
    if (document === undefined) {
        document = vscode_languageserver_textdocument_1.TextDocument.create(uri, 'other', 0, '');
        await context.connection.workspace
            .applyEdit({
            label: 'creating file',
            edit: {
                documentChanges: [vscode_languageserver_1.CreateFile.create(document.uri, { ignoreIfExists: true, overwrite: false })],
            },
        })
            .then(handleResponse);
    }
    return context.connection.workspace
        .applyEdit({
        label: 'Adding line',
        edit: {
            changes: {
                [document.uri]: [vscode_languageserver_1.TextEdit.insert(document.positionAt(document.getText().length), '\n' + line)],
            },
        },
    })
        .then(handleResponse);
}
//# sourceMappingURL=files.js.map