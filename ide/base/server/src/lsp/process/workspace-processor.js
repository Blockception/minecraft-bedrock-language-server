"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkspaceProcessor = void 0;
const ide_shared_1 = require("@blockception/ide-shared");
const util_1 = require("../../util");
const base_1 = require("../services/base");
class WorkspaceProcessor extends base_1.BaseService {
    name = 'workspace processor';
    _packProcessor;
    constructor(logger, extension, packProcessor) {
        super(logger.withPrefix('[ws pros]'), extension);
        this._packProcessor = packProcessor;
    }
    onInitialize() {
        //provides diagnostics and such
        const documents = this.extension.documents;
        documents.onDidSave(this.onDocumentChanged.bind(this));
    }
    setupHandlers(connection) {
        this.addDisposable(connection.workspace.onDidChangeWorkspaceFolders(this.onWorkspaceFolderChanged.bind(this)));
    }
    /**
     * Watch for project files being update that might changes settings for the workspace
     * @param e
     * @returns
     */
    async onDocumentChanged(e) {
        if (this.extension.state.workspaces.traversed === false)
            return;
        const { document } = e;
        if (document.languageId === ide_shared_1.Languages.McProjectIdentifier) {
            return this.traverse();
        }
    }
    /**
     * The event that is called when any workspaces are added / removed
     * @param params
     */
    async onWorkspaceFolderChanged(params) {
        for (const ws of params.removed) {
            await this.remove(ws);
        }
        for (const ws of params.added) {
            await this.process(ws);
        }
    }
    start(token) {
        this.traverse(token);
    }
    async traverse(token) {
        const start = Date.now();
        this.extension.state.workspaces.traversed = false;
        const reporter = await this.extension.connection.window.createWorkDoneProgress();
        token = util_1.Tokens.combine(token, reporter.token);
        reporter.begin('Traversing all', 0, '', true);
        this.logger.info('traversing all workspaces');
        const workspaces = (await this.get()) ?? [];
        for (const ws of workspaces) {
            reporter.report(ws.name);
            await this.process(ws, token);
        }
        this.extension.state.workspaces.traversed = true;
        for (const ws of workspaces) {
            reporter.report(ws.name);
            await this.diagnose(ws, token);
        }
        this.logger.info('Traversing done', {
            ms: Date.now() - start,
        });
        reporter.done();
    }
    async process(workspace, token) {
        const reporter = await this.extension.connection.window.createWorkDoneProgress();
        reporter.begin(`Processing workspace: ${workspace.name}`, 0, '', true);
        this.logger.info(`processing workspace ${workspace.name}`, workspace);
        const packs = await this._packProcessor.discover(workspace.uri);
        token = util_1.Tokens.combine(token, reporter.token);
        return util_1.Processor.forEach(packs, (pack) => this._packProcessor.process(pack, token), token, reporter).finally(() => reporter.done());
    }
    async remove(workspace, token) {
        this.logger.info(`removing workspace ${workspace.name}`, workspace);
        const packs = await this.packs(workspace);
        const result = await util_1.Processor.map(packs, (pack) => this._packProcessor.remove(pack), token);
        return this.extension.database.WorkspaceData.remove(workspace.uri) || result;
    }
    async diagnose(workspace, token) {
        const reporter = await this.extension.connection.window.createWorkDoneProgress();
        reporter.begin(`Diagnosing workspace: ${workspace.name}`, 0, '', true);
        this.logger.info(`diagnosing workspace ${workspace.name}`, workspace);
        const packs = await this.packs(workspace);
        token = util_1.Tokens.combine(token, reporter.token);
        return util_1.Processor.forEach(packs, async (pack) => this._packProcessor.diagnose(pack, token), token, reporter).finally(() => reporter.done());
    }
    async packs(workspace) {
        return this._packProcessor.get().filter((pack) => pack.folder.startsWith(workspace.uri));
    }
    /**
     * Retrieves all the workspaces the IDE has open, if an error occurs, an empty [] is returned.
     * @returns
     */
    async get() {
        return this.extension.connection.workspace.getWorkspaceFolders().catch((err) => {
            this.logger.recordError(err);
            return null;
        });
    }
}
exports.WorkspaceProcessor = WorkspaceProcessor;
//# sourceMappingURL=workspace-processor.js.map