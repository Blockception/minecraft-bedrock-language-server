"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const path = __importStar(require("path"));
const bc_minecraft_bedrock_project_1 = require("bc-minecraft-bedrock-project");
const bc_minecraft_project_1 = require("bc-minecraft-project");
const types_1 = require("../../../src/types");
/** Build a minimal DiagnoserContext for pack-cache tests */
function makeContext(options) {
    const minecraftData = new bc_minecraft_bedrock_project_1.MinecraftData(options.projectData);
    return {
        getDocument: (uri) => ({ uri, getText: () => '' }),
        getFiles: (_folder, _patterns, _ignores) => options.files,
        getProjectData: () => minecraftData,
        getDiagnoser: (_doc, _project) => undefined,
    };
}
describe('Diagnoser', () => {
    it('extname', () => {
        const filepath = 'file:///c:/temp/test.mcfunction';
        const ext = path.extname(filepath);
        expect(ext).toEqual('.mcfunction');
    });
    describe('processFolder pack-cache', () => {
        let projectData;
        beforeEach(() => {
            // projectData that cannot resolve documents itself (documents not needed for these tests)
            projectData = new bc_minecraft_bedrock_project_1.ProjectData({ getDocument: () => undefined, getFiles: () => [] });
            projectData.behaviorPacks.add('behavior_pack', bc_minecraft_project_1.MCProject.createEmpty(), {});
        });
        it('calls projectData.get() only once per unique URI during a single processFolder pass', () => {
            const fileUri = 'behavior_pack/texts/en_US.lang';
            // Return the same URI twice so the cache must deduplicate
            const context = makeContext({ files: [fileUri, fileUri], projectData });
            const getSpy = jest.spyOn(context.getProjectData().projectData, 'get');
            const diagnoser = new types_1.Diagnoser(context);
            diagnoser.processFolder('behavior_pack', bc_minecraft_project_1.MCProject.createEmpty().ignores);
            expect(getSpy).toHaveBeenCalledTimes(1);
        });
        it('clears the cache after processFolder completes (second pass re-queries)', () => {
            const fileUri = 'behavior_pack/texts/en_US.lang';
            const context = makeContext({ files: [fileUri], projectData });
            const getSpy = jest.spyOn(context.getProjectData().projectData, 'get');
            const diagnoser = new types_1.Diagnoser(context);
            diagnoser.processFolder('behavior_pack', bc_minecraft_project_1.MCProject.createEmpty().ignores);
            diagnoser.processFolder('behavior_pack', bc_minecraft_project_1.MCProject.createEmpty().ignores);
            // One call per pass, two passes → two calls total
            expect(getSpy).toHaveBeenCalledTimes(2);
        });
        it('does not cache results between standalone process() calls', () => {
            const fileUri = 'behavior_pack/texts/en_US.lang';
            const context = makeContext({ files: [fileUri], projectData });
            const getSpy = jest.spyOn(context.getProjectData().projectData, 'get');
            const diagnoser = new types_1.Diagnoser(context);
            diagnoser.process(fileUri);
            diagnoser.process(fileUri);
            // No processFolder → no cache → two separate calls
            expect(getSpy).toHaveBeenCalledTimes(2);
        });
    });
});
//# sourceMappingURL=diagnoser.test.js.map