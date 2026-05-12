"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiagnoserService = void 0;
const bc_minecraft_bedrock_diagnoser_1 = require("bc-minecraft-bedrock-diagnoser");
const util_1 = require("../../util");
const base_1 = require("../services/base");
const context_1 = require("./context");
class DiagnoserService extends base_1.BaseService {
    name = 'diagnoser';
    _context;
    _diagnoser;
    constructor(logger, extension, documents) {
        logger = logger.withPrefix('[diagnoser]');
        super(logger, extension);
        this._context = new context_1.InternalContext(logger, documents, () => extension.database.ProjectData);
        this._diagnoser = new bc_minecraft_bedrock_diagnoser_1.Diagnoser(this._context);
        this._context.onDiagnosingFinished((e) => this.set(e.doc, e.items));
    }
    setupHandlers(connection) {
        this.addDisposable(connection.workspace.onDidDeleteFiles(this.onDidDeleteFiles.bind(this)));
    }
    diagnose(doc) {
        if (this.extension.state.workspaces.traversed === false) {
            this.logger.debug(`skipping diagnostics: ${(0, util_1.getFilename)(doc.uri)}`);
            return;
        }
        const start = Date.now();
        this._diagnoser.process(doc);
        const dur = Date.now() - start;
        if (dur > 10) {
            this.logger.info('diagnosing done', {
                uri: doc.uri,
                ms: dur,
            });
        }
    }
    set(doc, diagnostics) {
        return this.extension.connection.sendDiagnostics({
            diagnostics,
            uri: doc.uri,
            version: doc.version,
        });
    }
    clear(doc) {
        return this.set(doc, []);
    }
    onDidDeleteFiles(params) {
        params.files.forEach((file) => this.clear(file));
    }
}
exports.DiagnoserService = DiagnoserService;
//# sourceMappingURL=service.js.map