"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PackProcessor = void 0;
const bc_minecraft_bedrock_project_1 = require("bc-minecraft-bedrock-project");
const io_1 = require("../../io/io");
const format_1 = require("../../minecraft/format");
const mcprojects_1 = require("../../project/mcprojects");
const util_1 = require("../../util");
const progress_1 = require("../progress");
const base_1 = require("../services/base");
class PackProcessor extends base_1.BaseService {
    name = 'pack processor';
    _documentProcessor;
    constructor(logger, extension, documentProcessor) {
        super(logger.withPrefix('[pack pros]'), extension);
        this._documentProcessor = documentProcessor;
    }
    async process(pack, token) {
        const start = Date.now();
        const name = (0, util_1.getBasename)(util_1.Fs.FromVscode(pack.folder));
        const reporter = await progress_1.ProgressBar.create(this.extension, `processing pack: ${name}`);
        reporter.sendMessage('processing');
        this.logger.info(`processing pack: ${name}`, {
            uri: pack.folder,
            type: pack.type,
        });
        const files = this.files(pack);
        await util_1.Processor.forEach(files, (file) => {
            reporter.sendMessage((0, util_1.getFilename)(file));
            const doc = this._documentProcessor.get(file);
            if (doc === undefined)
                return;
            return this._documentProcessor.process(doc);
        }, token);
        if (bc_minecraft_bedrock_project_1.BehaviorPack.BehaviorPack.is(pack)) {
            this.logger.debug('checking structures');
            const structures = format_1.MinecraftFormat.GetStructureFiles(pack.folder, pack.context.ignores.patterns);
            const emptyText = () => '';
            structures.forEach((item) => pack.process({ getText: emptyText, uri: item }));
        }
        this.logger.debug('processed pack', {
            uri: pack.folder,
            type: pack.type,
            files: files.length,
            ms: Date.now() - start,
        });
        reporter.done();
    }
    remove(pack) {
        const pd = this.extension.database.ProjectData;
        pd.deleteFolder(pack.folder);
        this.removePack(pd.behaviorPacks.packs, pack.folder, pd.behaviorPacks.delete);
        this.removePack(pd.resourcePacks.packs, pack.folder, pd.resourcePacks.delete);
        this.removePack(pd.worlds.packs, pack.folder, pd.worlds.delete);
    }
    removePack(packs, uri, deletefn) {
        for (let I = 0; I < packs.length; I++) {
            const p = packs[I];
            if (p.folder.startsWith(uri))
                deletefn(p.folder);
        }
    }
    diagnose(pack, token) {
        this.logger.info(`diagnosing pack: ${pack.folder}`);
        const files = this.files(pack);
        return util_1.Processor.forEach(files, (file) => {
            const doc = this._documentProcessor.get(file);
            if (doc === undefined)
                return;
            return this._documentProcessor.diagnose(doc);
        }, token).finally(() => {
            this.logger.info('pack diagnosed', {
                files: files.length,
            });
        });
    }
    /**
     *
     * @param folder The vscode uri of the base folder to start explorer from
     * @returns
     */
    async discover(folder) {
        const folderPath = util_1.Fs.FromVscode(folder);
        this.logger.info(`discovery packs from: ${folderPath}`);
        if (!(0, io_1.isDirectory)(folderPath, this.logger)) {
            return [];
        }
        const project = (0, mcprojects_1.getProject)(folderPath, this.extension.settings);
        this.extension.database.WorkspaceData.set(folder, project);
        const manifests = format_1.MinecraftFormat.GetManifests(folder, project.ignores.patterns);
        const packs = [];
        manifests.forEach((m) => {
            const pack = this.extension.database.ProjectData.addPack(m, project);
            if (pack === undefined)
                return;
            packs.push(pack);
        });
        return packs;
    }
    /**
     *
     * @param folder The vscode uri of the base folder to start explorer from
     * @returns
     */
    get() {
        return this.extension.database.getPacks();
    }
    files(pack) {
        return format_1.MinecraftFormat.GetPackFiles(pack);
    }
}
exports.PackProcessor = PackProcessor;
//# sourceMappingURL=pack-processor.js.map