"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TemplateBuilder = void 0;
const vscode_languageserver_1 = require("vscode-languageserver");
const io_1 = require("../../io/io");
const util_1 = require("../../util");
class TemplateBuilder {
    receiver;
    context;
    options;
    constructor(context) {
        this.context = context;
        this.receiver = [];
        this.options = { ignoreIfExists: true, overwrite: false };
    }
    /**Sends the edits to the client*/
    send() {
        if (this.receiver.length <= 0)
            return Promise.resolve();
        const Edit = { documentChanges: this.receiver };
        return this.context.connection.workspace.applyEdit(Edit).then(this.handleResponse.bind(this));
    }
    createFile(uri, body) {
        if (uri.startsWith('file:\\'))
            uri = uri.replace(/\\/gi, '/');
        const path = util_1.Fs.FromVscode(uri);
        uri = util_1.Vscode.fromFs(path);
        if ((0, io_1.exists)(path, this.context.logger)) {
            this.context.logger.info('creation of file skipped because it already exists: ' + path);
            return;
        }
        const content = {
            newText: body,
            range: vscode_languageserver_1.Range.create(0, 0, 0, 0),
        };
        this.context.logger.info('creating: ' + path);
        const document = vscode_languageserver_1.OptionalVersionedTextDocumentIdentifier.create(uri, null);
        this.receiver.push(vscode_languageserver_1.CreateFile.create(uri, this.options), vscode_languageserver_1.TextDocumentEdit.create(document, [content]));
    }
    handleResponse(response) {
        if (response.applied)
            return;
        const keys = Object.getOwnPropertyNames(response);
        if (keys.length === 1) {
            this.context.logger.info('Workspace edit was not applied, possibly of already existing data');
            return;
        }
        this.context.logger.error('Workspace edit failed', response);
    }
}
exports.TemplateBuilder = TemplateBuilder;
//# sourceMappingURL=builder.js.map