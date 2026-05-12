"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createLang = createLang;
exports.convertLang = convertLang;
const fs_1 = __importDefault(require("fs"));
/**
 * Create a new Lang
 */
function createLang() {
    return {
        id: '',
        value: ''
    };
}
/**
 * Parse a lang document from a file
 */
function getDoc(filepath) {
    if (!fs_1.default.existsSync(filepath)) {
        return null;
    }
    try {
        const data = fs_1.default.readFileSync(filepath, 'utf-8');
        return data;
    }
    catch (ex) {
        console.error(ex);
        return null;
    }
}
/**
 * Convert *.lang file to Lang objects
 */
function convertLang(filepath) {
    const receiver = [];
    const doc = getDoc(filepath);
    if (doc === null)
        return receiver;
    doc.split(/\r?\n/).forEach(line => {
        line = line.trim();
        // Accounting for blank lines, comments, multi-line comments
        if (!line.length || line.startsWith('#') || !line.includes('='))
            return;
        // Incase '=' appears more than once in a key but I don't think that will happen
        const equals = line.indexOf('=');
        const id = line.slice(0, equals).trim();
        if (!id.length)
            return;
        const value = line.slice(equals + 1).trimEnd();
        const lang = createLang();
        lang.id = id;
        lang.value = value;
        receiver.push(lang);
    });
    return receiver;
}
//# sourceMappingURL=lang.js.map