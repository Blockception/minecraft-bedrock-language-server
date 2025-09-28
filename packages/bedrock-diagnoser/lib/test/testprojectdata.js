"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InternalTest = exports.TestProjectData = void 0;
const bc_minecraft_bedrock_project_1 = require("bc-minecraft-bedrock-project");
const bc_minecraft_project_1 = require("bc-minecraft-project");
const bc_minecraft_bedrock_project_2 = require("bc-minecraft-bedrock-project");
var TestProjectData;
(function (TestProjectData) {
    function createTestData(files = undefined) {
        return createContext(files).getProjectData();
    }
    TestProjectData.createTestData = createTestData;
    function createContext(files = undefined) {
        const context = new InternalTest(undefined, files);
        const data = context.getProjectData().projectData;
        data.behaviorPacks.add("behavior_pack", bc_minecraft_project_1.MCProject.createEmpty(), {});
        data.resourcePacks.add("resource_pack", bc_minecraft_project_1.MCProject.createEmpty(), {});
        return context;
    }
    TestProjectData.createContext = createContext;
})(TestProjectData || (exports.TestProjectData = TestProjectData = {}));
class InternalTest {
    constructor(projectData, files) {
        this.__projectData = new bc_minecraft_bedrock_project_2.MinecraftData(projectData !== null && projectData !== void 0 ? projectData : new bc_minecraft_bedrock_project_1.ProjectData(this));
        this.__files = files !== null && files !== void 0 ? files : new Map();
    }
    getDocument(uri) {
        const out = this.__files.get(uri);
        if (out)
            return { uri: uri, getText: () => out };
        return undefined;
    }
    getFiles() {
        return [];
    }
    getProjectData() {
        if (!this.__projectData) {
            return (this.__projectData = new bc_minecraft_bedrock_project_2.MinecraftData(new bc_minecraft_bedrock_project_1.ProjectData(this)));
        }
        return this.__projectData;
    }
}
exports.InternalTest = InternalTest;
//# sourceMappingURL=testprojectdata.js.map