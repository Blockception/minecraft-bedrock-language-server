"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileBuilder = void 0;
const vscode_languageserver_1 = require("vscode-languageserver");
const util_1 = require("../util");
const io_1 = require("../io/io");
/**
 *
 */
class FileBuilder {
    _connection;
    _logger;
    _receiver;
    options;
    constructor(connection, logger) {
        this._connection = connection;
        this._logger = logger;
        this._receiver = [];
        this.options = { ignoreIfExists: true, overwrite: false };
    }
    /**
     * Sends the edits to the client
     * @returns
     */
    async send() {
        if (this._receiver.length <= 0)
            return;
        const edit = { documentChanges: this._receiver };
        const result = await this._connection.workspace.applyEdit(edit);
        this.response(result);
        return;
    }
    /**
     *
     * @param uri
     * @param content
     * @returns
     */
    create(uri, content) {
        if (uri.startsWith('file:\\'))
            uri = uri.replace(/\\/gi, '/');
        const path = util_1.Fs.FromVscode(uri);
        uri = util_1.Vscode.fromFs(path);
        if ((0, io_1.exists)(path, this._logger)) {
            this._logger.info('Creation of file skipped because it already exists: ' + path);
            return;
        }
        const Content = {
            newText: content,
            range: vscode_languageserver_1.Range.create(0, 0, 0, 0),
        };
        this._logger.info('Creating file: ' + path);
        const Version = vscode_languageserver_1.OptionalVersionedTextDocumentIdentifier.create(uri, null);
        this._receiver.push(vscode_languageserver_1.CreateFile.create(uri, this.options), vscode_languageserver_1.TextDocumentEdit.create(Version, [Content]));
    }
    /**
     * Delete a file or folder via workspace edit
     * @param uri vscode uri
     */
    delete(uri, recursive = false) {
        if (uri.startsWith('file:\\'))
            uri = uri.replace(/\\/gi, '/');
        const path = util_1.Fs.FromVscode(uri);
        uri = util_1.Vscode.fromFs(path);
        this._receiver.push(vscode_languageserver_1.DeleteFile.create(uri, { recursive: recursive, ignoreIfNotExists: true }));
    }
    /**
     *
     * @param response
     * @returns
     */
    response(response) {
        if (response.applied)
            return;
        const keys = Object.getOwnPropertyNames(response);
        if (keys.length === 1) {
            this._logger.error('Workspace edit was not applied, possibly of already existing data');
            return;
        }
        this._logger.error('Workspace edit failed', response);
    }
}
exports.FileBuilder = FileBuilder;
//# sourceMappingURL=file-builder.js.map