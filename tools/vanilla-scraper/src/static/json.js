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
exports.load = load;
exports.loadEnsure = loadEnsure;
exports.loadStringArray = loadStringArray;
exports.save = save;
exports.getDoc = getDoc;
const fs = __importStar(require("fs"));
const defaultReadOptions = {
    allowTrailingCommas: true,
    skipComments: true,
};
/**
 * Load and parse a JSON file
 */
function load(filepath) {
    if (!fs.existsSync(filepath)) {
        return null;
    }
    try {
        const data = fs.readFileSync(filepath, 'utf-8');
        // Remove comments and trailing commas for lenient JSON parsing
        const cleaned = removeCommentsAndTrailingCommas(data);
        const result = JSON.parse(cleaned);
        if (Array.isArray(result) && result.length > 0) {
            const item = result[0];
            if (typeof item === 'string') {
                return result.map((i) => {
                    return { id: i };
                });
            }
        }
        return result;
    }
    catch (ex) {
        console.error(ex);
        return null;
    }
}
/**
 * Load and parse a JSON file, returning a new instance if file doesn't exist
 */
function loadEnsure(filepath) {
    return load(filepath) ?? [];
}
/**
 * Load a JSON file containing a string array, returning an empty array if file doesn't exist.
 * Handles both plain string arrays and arrays of objects with an 'id' or 'name' property.
 */
function loadStringArray(filepath) {
    if (!fs.existsSync(filepath)) {
        return [];
    }
    try {
        const data = fs.readFileSync(filepath, 'utf-8');
        const cleaned = removeCommentsAndTrailingCommas(data);
        const result = JSON.parse(cleaned);
        if (!Array.isArray(result))
            return [];
        return result.map((item) => {
            if (typeof item === 'string')
                return item;
            if (typeof item === 'object' && item !== null) {
                const obj = item;
                return (typeof obj.id === 'string' ? obj.id : null) ?? (typeof obj.name === 'string' ? obj.name : null) ?? '';
            }
            return '';
        }).filter((s) => s.length > 0);
    }
    catch (ex) {
        console.error(ex);
        return [];
    }
}
/**
 * Save data to a JSON file
 */
function save(data, filepath) {
    try {
        const content = JSON.stringify(data, null, 2);
        fs.writeFileSync(filepath, content, 'utf-8');
    }
    catch (ex) {
        console.error(ex);
    }
}
/**
 * Parse a JSON document from a file
 */
function getDoc(filepath) {
    if (!fs.existsSync(filepath)) {
        return null;
    }
    try {
        const data = fs.readFileSync(filepath, 'utf-8');
        const cleaned = removeCommentsAndTrailingCommas(data);
        return JSON.parse(cleaned);
    }
    catch (ex) {
        console.error(ex);
        return null;
    }
}
/**
 * Remove C-style comments and trailing commas from JSON string
 */
function removeCommentsAndTrailingCommas(json) {
    // Remove single-line comments
    let result = json.replace(/\/\/.*$/gm, '');
    // Remove multi-line comments
    result = result.replace(/\/\*[\s\S]*?\*\//g, '');
    // Remove trailing commas before ] or }
    result = result.replace(/,(\s*[}\]])/g, '$1');
    return result;
}
//# sourceMappingURL=json.js.map