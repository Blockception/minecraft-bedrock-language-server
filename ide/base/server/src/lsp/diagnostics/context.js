"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InternalContext = void 0;
const bc_minecraft_bedrock_project_1 = require("bc-minecraft-bedrock-project");
const vscode_languageserver_1 = require("vscode-languageserver");
const glob_1 = require("../../files/glob");
const util_1 = require("../../util");
const caches_1 = require("../caches");
const diagnoser_1 = require("./diagnoser");
class InternalContext {
    getCacheFn;
    logger;
    documents;
    _onDiagnosingDone;
    _getFilesCache;
    constructor(logger, documents, getCacheFn) {
        this.logger = logger;
        this.getCacheFn = getCacheFn;
        this.documents = documents;
        this._onDiagnosingDone = new vscode_languageserver_1.Emitter();
        this._getFilesCache = new caches_1.DataCache(caches_1.DataCache.defaultTimespan);
        this.documents.onDidSave(() => this._getFilesCache.clear());
    }
    get onDiagnosingFinished() {
        return this._onDiagnosingDone.event;
    }
    /**@inheritdoc*/
    getDiagnoser(doc, project) {
        if (glob_1.Glob.isMatch(doc.uri, project.ignores.patterns)) {
            this.logger.info('Skipping diagnostics on document, because its ignored: ' + doc.uri);
            return undefined;
        }
        //Check if project disabled diagnostics
        if (project.attributes['diagnostic.enable'] === 'false')
            return undefined;
        if (project.attributes[`diagnostic${(0, util_1.getExtension)(doc.uri)}`] === 'false')
            return undefined;
        return new diagnoser_1.InternalDiagnoser(doc, project, this, (e) => this._onDiagnosingDone.fire(e));
    }
    /**@inheritdoc*/
    getDocument(uri) {
        uri = util_1.Vscode.fromFs(uri);
        return this.documents.get(uri);
    }
    /**@inheritdoc*/
    getFiles(folder, patterns, ignores) {
        const key = folder + patterns.join(',') + ignores.patterns.join(',');
        return this._getFilesCache.getOrAdd(key, () => glob_1.Glob.getFiles(patterns, ignores.patterns, folder));
    }
    /**@inheritdoc*/
    getProjectData() {
        return new bc_minecraft_bedrock_project_1.MinecraftData(this.getCacheFn());
    }
}
exports.InternalContext = InternalContext;
//# sourceMappingURL=context.js.map