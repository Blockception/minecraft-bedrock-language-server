"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentManager = void 0;
const vscode_languageserver_1 = require("vscode-languageserver");
const vscode_uri_1 = require("vscode-uri");
const util_1 = require("../../util");
const base_1 = require("../services/base");
const factory_1 = require("./factory");
const io_1 = require("./io");
const languageId_1 = require("./languageId");
class DocumentManager extends base_1.BaseService {
    name = 'documents';
    _documents;
    _factory;
    constructor(logger, extension) {
        super(logger.withPrefix('[documents]'), extension);
        this._factory = new factory_1.TextDocumentFactory(logger, extension);
        this._documents = new vscode_languageserver_1.TextDocuments(this._factory);
    }
    /** @inheritdoc */
    get onDidOpen() {
        return this._documents.onDidOpen;
    }
    /** @inheritdoc */
    get onDidChangeContent() {
        return this._documents.onDidChangeContent;
    }
    /** @inheritdoc */
    get onDidClose() {
        return this._documents.onDidClose;
    }
    /** @inheritdoc */
    get onDidSave() {
        return this._documents.onDidSave;
    }
    onInitialize(capabilities) {
        const filters = [
            { pattern: { glob: '**/*.{mcfunction}', options: { ignoreCase: true } } },
            { pattern: { glob: '**/*.{json,jsonc}', options: { ignoreCase: true } } },
            { pattern: { glob: '**/*.{.mcignore,.mcattributes,.mcdefinitions}', options: { ignoreCase: true } } },
        ];
        capabilities.set('textDocumentSync', vscode_languageserver_1.TextDocumentSyncKind.Incremental);
        capabilities.set('workspace', {
            workspaceFolders: {
                changeNotifications: true,
                supported: true,
            },
            fileOperations: {
                didCreate: { filters: filters },
                didDelete: { filters: filters },
                didRename: { filters: filters },
            },
        });
    }
    setupHandlers(connection) {
        this._documents.listen(connection);
    }
    /**
     * Retrieve the given document from the
     */
    get(uri, content, languageID) {
        const u = vscode_uri_1.URI.parse(uri);
        if (languageID === undefined || languageID === '') {
            languageID = (0, languageId_1.identifyDocument)(u);
        }
        if (typeof content === 'string') {
            return this._factory.create(u.toString(), languageID, 1, content);
        }
        if (typeof content !== 'undefined') {
            return this._factory.extend(content);
        }
        const doc = this._documents.get(u.toString());
        if (doc)
            return this._factory.extend(doc);
        const text = (0, io_1.readDocument)(u, this.logger);
        if (text !== undefined) {
            return this._factory.create(u.toString(), languageID, 1, text);
        }
        //We have tried all methods of retrieving data so far
        return undefined;
    }
    /**
     *
     * @param uris
     * @param callback
     * @param reporter
     * @returns
     */
    forEach(uris, callback, reporter, token) {
        reporter.addMaximum(uris.length);
        return util_1.Processor.forEach(uris, (uri) => {
            //Get document
            const doc = this.get(uri);
            try {
                //If we have a document invoke the requests action
                if (doc)
                    callback(doc);
            }
            catch (error) {
                this.logger.recordError(error, uri);
            }
            reporter.addValue();
            reporter.sendProgress();
        }, token);
    }
}
exports.DocumentManager = DocumentManager;
//# sourceMappingURL=manager.js.map