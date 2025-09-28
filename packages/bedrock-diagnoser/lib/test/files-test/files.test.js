"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bc_minecraft_bedrock_project_1 = require("bc-minecraft-bedrock-project");
const bc_minecraft_project_1 = require("bc-minecraft-project");
const fast_glob_1 = __importDefault(require("fast-glob"));
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const picomatch_1 = __importDefault(require("picomatch"));
const vscode_languageserver_textdocument_1 = require("vscode-languageserver-textdocument");
const main_1 = require("../../src/main");
const diagnoser_1 = require("../diagnoser");
class DocumentManager {
    getDocument(uri) {
        const doc = (0, fs_1.readFileSync)(uri, { encoding: "utf-8" });
        return vscode_languageserver_textdocument_1.TextDocument.create(uri, identifyDocument(uri), 1, doc);
    }
    getFiles(folder, patterns, ignores) {
        return Glob.getFiles(patterns, ignores.patterns, folder);
    }
}
class TestContext {
    constructor(documentManager, projectData) {
        this.documentManager = documentManager;
        this.projectData = projectData;
        this.diagnosers = [];
    }
    getDocument(uri) {
        return this.documentManager.getDocument(uri);
    }
    getFiles(folder, patterns, ignores) {
        return this.documentManager.getFiles(folder, patterns, ignores);
    }
    getProjectData() {
        return new bc_minecraft_bedrock_project_1.MinecraftData(this.projectData);
    }
    getDiagnoser(doc, project) {
        const diagnoser = new diagnoser_1.TestDocumentDiagnoser(doc, this, project);
        this.diagnosers.push(diagnoser);
        return diagnoser;
    }
}
var Glob;
(function (Glob) {
    const opt = {
        contains: true,
    };
    /**
     *
     * @param source
     * @param ignores
     * @returns
     */
    function excludes(source, ignores) {
        return source.filter((x) => !picomatch_1.default.isMatch(x, ignores, opt));
    }
    Glob.excludes = excludes;
    /**
     *
     * @param source
     * @param ignores
     * @param cwd The working directory
     * @param baseNameMatch
     * @returns
     */
    function getFiles(source, ignores = undefined, cwd = undefined, baseNameMatch = undefined) {
        const options = { onlyFiles: true, absolute: true, cwd: cwd, baseNameMatch: baseNameMatch };
        let entries = fast_glob_1.default.sync(source, options);
        if (ignores && ignores.length > 0)
            entries = excludes(entries, ignores);
        return entries;
    }
    Glob.getFiles = getFiles;
})(Glob || (Glob = {}));
var MinecraftFormat;
(function (MinecraftFormat) {
    function getManifests(folder, ignores) {
        return Glob.getFiles(["manifest.json", "**/manifest.json"], ignores, folder, true);
    }
    MinecraftFormat.getManifests = getManifests;
    function getBehaviorPackFiles(folder, ignores) {
        return Glob.getFiles(["**/*.{json,jsonc,json5}", "*.{json,jsonc,json5}", "*.mcfunction", "**/*.mcfunction", "**/*.lang", "*.lang"], ignores, folder);
    }
    MinecraftFormat.getBehaviorPackFiles = getBehaviorPackFiles;
    function getResourcePackFiles(folder, ignores) {
        return Glob.getFiles(["**/*.{json,jsonc,json5}", "*.{json,jsonc,json5}", "**/*.lang", "*.lang"], ignores, folder);
    }
    MinecraftFormat.getResourcePackFiles = getResourcePackFiles;
})(MinecraftFormat || (MinecraftFormat = {}));
function identifyDocument(uri) {
    const ext = path_1.default.extname(uri);
    switch (ext) {
        case ".lang":
            return "bc-minecraft-language";
        case ".json":
            return "json";
        case ".mcfunction":
            return "bc-mcfunction";
        case ".molang":
            return "bc-minecraft-molang";
    }
    const filename = path_1.default.basename(uri);
    switch (filename) {
        case bc_minecraft_project_1.MCDefinition.filename:
        case bc_minecraft_project_1.MCIgnore.filename:
        case bc_minecraft_project_1.MCAttributes.filename:
            return "bc-minecraft-project";
    }
    return "bc-minecraft-other";
}
describe.only("Files test", () => {
    const documentManager = new DocumentManager();
    const projectData = new bc_minecraft_bedrock_project_1.ProjectData(documentManager);
    const mcproject = bc_minecraft_project_1.MCProject.createEmpty();
    const testContext = new TestContext(documentManager, projectData);
    const diagnoser = new main_1.Diagnoser(testContext);
    const folder = __dirname;
    const manifests = MinecraftFormat.getManifests(folder, mcproject.ignores.patterns);
    const bpFiles = MinecraftFormat.getBehaviorPackFiles(path_1.default.join(folder, "test-bp"), mcproject.ignores.patterns);
    const rpFiles = MinecraftFormat.getResourcePackFiles(path_1.default.join(folder, "test-rp"), mcproject.ignores.patterns);
    const files = [...bpFiles, ...rpFiles, ...manifests];
    manifests.forEach((m) => projectData.addPack(m, mcproject));
    files.forEach((f) => {
        // console.log("processing", f);
        const t = documentManager.getDocument(f);
        expect(t).toBeDefined();
        if (!t)
            return;
        projectData.process(t);
    });
    files.forEach((f) => diagnoser.process(f));
    it("should contain two manifests", () => {
        expect(manifests).toHaveLength(2);
    });
    const diags = testContext.diagnosers.map((diag) => {
        diag.uri = diag.document.uri.slice(folder.length);
        return diag;
    });
    describe.each(diags)("testing file: {$uri}", (diag) => {
        test("expect specific errors", () => {
            expect(diag.items).toMatchSnapshot();
        });
        test("none of the errors are internal errors", () => {
            const items = diag.items.filter((item) => item.code === "debugger.internal.exception");
            expect(items).toHaveLength(0);
        });
    });
});
//# sourceMappingURL=files.test.js.map