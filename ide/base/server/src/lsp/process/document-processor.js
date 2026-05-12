"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentProcessor = void 0;
const glob_1 = require("../../files/glob");
const base_1 = require("../services/base");
class DocumentProcessor extends base_1.BaseService {
    name = 'document processor';
    _diagnoser;
    constructor(logger, extension, diagnoser) {
        super(logger.withPrefix('[doc pros]'), extension);
        this._diagnoser = diagnoser;
    }
    onInitialize() {
        //provides diagnostics and such
        const { documents } = this.extension;
        documents.onDidOpen(this.onDocumentChanged.bind(this));
        documents.onDidSave(this.onDocumentChanged.bind(this));
    }
    setupHandlers(connection) {
        this.addDisposable(connection.workspace.onDidCreateFiles(this.onDidCreateFiles.bind(this)), connection.workspace.onDidDeleteFiles(this.onDidDeleteFiles.bind(this)), connection.workspace.onDidRenameFiles(this.onDidRenameFiles.bind(this)));
    }
    onDocumentChanged(e) {
        const doc = this.extension.documents.get(e.document.uri, e.document, e.document.languageId);
        if (doc === undefined)
            return;
        this.process(doc);
        return this.diagnose(doc);
    }
    get(uri, content, languageID) {
        return this.extension.documents.get(uri, content, languageID);
    }
    delete(uri) {
        this.extension.database.ProjectData.deleteFile(uri);
        this._diagnoser.clear({ uri });
    }
    /**
     *
     * @param document
     */
    process(document) {
        const conf = document.configuration();
        try {
            if (conf.ignores.patterns.length == 0 || !glob_1.Glob.isMatch(document.uri, conf.ignores.patterns)) {
                this.extension.database.ProjectData.process(document);
            }
            else {
                this.logger.info(`ignoring file ${document.uri}`);
            }
        }
        catch (error) {
            this.logger.recordError(error, document);
        }
    }
    diagnose(doc) {
        return this._diagnoser.diagnose(doc);
    }
    onDidDeleteFiles(params) {
        this.logger.debug('received deleted files', params);
        params.files.forEach((file) => this.delete(file.uri));
    }
    onDidCreateFiles(params) {
        this.logger.debug('received created files', params);
        params.files.forEach((file) => {
            const doc = this.extension.documents.get(file.uri);
            if (doc === undefined)
                return;
            return this.process(doc);
        });
    }
    onDidRenameFiles(params) {
        this.logger.debug('received files rename', params);
        params.files.forEach((file) => this.delete(file.oldUri));
        params.files.forEach((file) => {
            const doc = this.extension.documents.get(file.newUri);
            if (doc === undefined)
                return;
            return this.process(doc);
        });
    }
}
exports.DocumentProcessor = DocumentProcessor;
//# sourceMappingURL=document-processor.js.map