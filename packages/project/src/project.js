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
exports.MCProject = void 0;
const path = __importStar(require("path"));
const mcattributes_1 = require("./mcattributes");
const mcdefinitions_1 = require("./mcdefinitions");
const mcignore_1 = require("./mcignore");
/**The namespace that provides functionality to MCProjects*/
var MCProject;
(function (MCProject) {
    /**Creates an empty version of the MCProject
     * @returns*/
    function createEmpty() {
        return {
            attributes: mcattributes_1.MCAttributes.createEmpty(),
            definitions: mcdefinitions_1.MCDefinition.createEmpty(),
            ignores: mcignore_1.MCIgnore.createEmpty(),
        };
    }
    MCProject.createEmpty = createEmpty;
    /**Checks wheter or not the given object implements MCProject
     * @param value The object to inspect
     * @returns Whether or not the given object implements MCProject*/
    function is(value) {
        if (value) {
            if (!(value.ignores && mcignore_1.MCIgnore.is(value.ignores)))
                return false;
            if (!(value.attributes && typeof value.attributes === 'object'))
                return false;
            if (!(value.definitions && typeof value.definitions === 'object'))
                return false;
            return true;
        }
        return false;
    }
    MCProject.is = is;
    /**Loads from the given root folder the necessary project files
     * @param Source The root folder to retrieve files from
     * @returns*/
    function loadSync(Source) {
        const attributes = mcattributes_1.MCAttributes.loadSync(path.join(Source, mcattributes_1.MCAttributes.filename));
        const definitions = mcdefinitions_1.MCDefinition.loadSync(path.join(Source, mcdefinitions_1.MCDefinition.filename));
        const ignores = mcignore_1.MCIgnore.loadSync(path.join(Source, mcignore_1.MCIgnore.filename));
        return { attributes, definitions, ignores };
    }
    MCProject.loadSync = loadSync;
    /**Loads from the given root folder the necessary project files
     * @param Source The root folder to retrieve files from*/
    function load(Source) {
        return new Promise((resolve) => resolve(loadSync(Source)));
    }
    MCProject.load = load;
    /**Saves the gives project into the specified folder
     * @param FolderThe folder to the save the data into
     * @param project The data to save*/
    function saveSync(Folder, project) {
        mcattributes_1.MCAttributes.saveSync(project.attributes, path.join(Folder, mcattributes_1.MCAttributes.filename));
        mcignore_1.MCIgnore.saveSync(project.ignores, path.join(Folder, mcignore_1.MCIgnore.filename));
        mcdefinitions_1.MCDefinition.saveSync(project.definitions, path.join(Folder, mcdefinitions_1.MCDefinition.filename));
    }
    MCProject.saveSync = saveSync;
    /**Saves the gives project into the specified folder
     * @param FolderThe folder to the save the data into
     * @param project The data to save
     * @returns A promise that is done wheter the data has been written*/
    async function save(Folder, project) {
        const P = [
            mcattributes_1.MCAttributes.save(project.attributes, path.join(Folder, mcattributes_1.MCAttributes.filename)),
            mcignore_1.MCIgnore.save(project.ignores, path.join(Folder, mcignore_1.MCIgnore.filename)),
            mcdefinitions_1.MCDefinition.save(project.definitions, path.join(Folder, mcdefinitions_1.MCDefinition.filename)),
        ];
        return Promise.all(P);
    }
    MCProject.save = save;
})(MCProject || (exports.MCProject = MCProject = {}));
//# sourceMappingURL=project.js.map