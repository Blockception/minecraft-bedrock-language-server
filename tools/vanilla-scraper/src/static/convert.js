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
exports.fromFolderJson = fromFolderJson;
exports.fromFolderFile = fromFolderFile;
exports.fromFileFile = fromFileFile;
exports.fromFileJson = fromFileJson;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const json = __importStar(require("./json"));
/**
 * Process all JSON files in a folder with a JSON converter
 */
function fromFolderJson(func, receiver, folder) {
    if (func === null || !fs.existsSync(folder)) {
        console.log("folder doesn't exist: ", folder);
        return;
    }
    console.log('::group::' + folder);
    const files = getJsonFilesRecursively(folder);
    for (const filepath of files) {
        fromFileJson(func, receiver, filepath);
    }
    console.log('::endgroup::' + folder);
}
/**
 * Process all JSON files in a folder with a file converter
 */
function fromFolderFile(func, receiver, folder) {
    if (func === null || !fs.existsSync(folder)) {
        console.log("folder doesn't exist: ", folder);
        return;
    }
    console.log('::group::' + folder);
    const files = getJsonFilesRecursively(folder);
    for (const filepath of files) {
        try {
            func(filepath, receiver);
        }
        catch (ex) {
            console.error(`::error file=${filepath},line=0,col=0,endColumn=0::${ex}`);
        }
    }
    console.log('::endgroup::' + folder);
}
/**
 * Process a single file with a file converter
 */
function fromFileFile(func, receiver, filepath) {
    try {
        if (func !== null && fs.existsSync(filepath)) {
            func(filepath, receiver);
        }
    }
    catch (ex) {
        console.error(`::error file=${filepath},line=0,col=0,endColumn=0::${ex}`);
    }
}
/**
 * Process a single file with a JSON converter
 */
function fromFileJson(func, receiver, filepath) {
    try {
        const doc = json.getDoc(filepath);
        if (doc !== null) {
            func(doc, receiver);
        }
    }
    catch (ex) {
        console.error(`::error file=${filepath},line=0,col=0,endColumn=0::${ex}`);
    }
}
/**
 * Get all JSON files recursively from a folder
 */
function getJsonFilesRecursively(folder) {
    const results = [];
    function walk(dir) {
        if (!fs.existsSync(dir))
            return;
        const entries = fs.readdirSync(dir, { withFileTypes: true });
        for (const entry of entries) {
            const fullPath = path.join(dir, entry.name);
            if (entry.isDirectory()) {
                walk(fullPath);
            }
            else if (entry.isFile() && entry.name.endsWith('.json')) {
                results.push(fullPath);
            }
        }
    }
    walk(folder);
    console.log("got files:", results.length);
    return results;
}
//# sourceMappingURL=convert.js.map