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
exports.MCIgnore = void 0;
const fs = __importStar(require("fs"));
/**The namespace that provides functions for MCIgnore interfaces*/
var MCIgnore;
(function (MCIgnore) {
    /**The default filename of a MCIgnore filename*/
    MCIgnore.filename = '.mcignore';
    /**Creates an empty version of MCIgnore
     * @returns An empty MCIgnore object*/
    function createEmpty() {
        return { patterns: [] };
    }
    MCIgnore.createEmpty = createEmpty;
    /** Merges the two given objects into a new MCIgnore.
     * @param A The first data set
     * @param B The second data set
     * @returns A new object with the combined patterns*/
    function merge(A, B) {
        const result = MCIgnore.createEmpty();
        if (A)
            result.patterns.push(...A.patterns);
        if (B)
            result.patterns.push(...B.patterns);
        return result;
    }
    MCIgnore.merge = merge;
    /** Checks wheter or not the given object implements MCIgnore
     * @param value The object to test*/
    function is(value) {
        if (value) {
            if (value.patterns && Array.isArray(value.patterns))
                return true;
        }
        return false;
    }
    MCIgnore.is = is;
    /**Parses the given content as if its file content, whereby each line is an pattern
     * @param content The content that one would get as in a file
     * @returns A parsed version based on the contents, or an empty object*/
    function parse(content) {
        return {
            patterns: content
                .split(/(\r\n|\n)/)
                .map((item) => item.trim())
                .filter((item) => item !== ''),
        };
    }
    MCIgnore.parse = parse;
    /**Converts the given MCIgnore to file content
     * @param data The MCIgnore data to convert
     * @returns A string represerntation of the contents of a MCIgnore*/
    function toString(data) {
        return data.patterns.join('\n');
    }
    MCIgnore.toString = toString;
    /** Loads the content of the given file into a MCIgnore
     * @param filepath The path to the file to load
     * @returns A filled MCIgnore*/
    function loadSync(filepath) {
        if (fs.existsSync(filepath)) {
            const buffer = fs.readFileSync(filepath);
            return parse(buffer.toString());
        }
        return createEmpty();
    }
    MCIgnore.loadSync = loadSync;
    /** Loads the content of the given file into a MCIgnore
     * @param filepath The path to the file to load
     * @returns A filled promise that returns a MCIgnore*/
    async function load(filepath) {
        return fs.promises.readFile(filepath).then((buffer) => parse(buffer.toString()));
    }
    MCIgnore.load = load;
    /** Saves the given MCIgnore into the specified file
     * @param data The data to save
     * @param filepath The filepath to save to*/
    function saveSync(data, filepath) {
        const content = toString(data);
        fs.writeFileSync(filepath, content);
    }
    MCIgnore.saveSync = saveSync;
    /** Saves the given MCIgnore into the specified file
     * @param data The data to save
     * @param filepath The filepath to save to
     * @returns A promise for when the file will be saved*/
    async function save(data, filepath) {
        const content = toString(data);
        return fs.promises.writeFile(filepath, content);
    }
    MCIgnore.save = save;
})(MCIgnore || (exports.MCIgnore = MCIgnore = {}));
//# sourceMappingURL=mcignore.js.map