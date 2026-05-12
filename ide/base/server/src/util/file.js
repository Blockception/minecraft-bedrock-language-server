"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFilename = getFilename;
exports.getBasename = getBasename;
exports.getDirectory = getDirectory;
exports.getExtension = getExtension;
exports.getParent = getParent;
const path_1 = __importDefault(require("path"));
/**
 *
 * @param filepath
 * @returns
 */
function getFilename(filepath) {
    const filename = path_1.default.basename(filepath);
    const extension = path_1.default.extname(filename);
    const result = filename.slice(0, filename.length - extension.length);
    return result.trim();
}
/**
 *
 * @param filepath
 * @returns
 */
function getBasename(filepath) {
    return path_1.default.basename(filepath).trim();
}
/**
 *
 * @param filepath
 * @returns
 */
function getDirectory(filepath) {
    filepath = filepath.replace(/\\/g, '/');
    const index = filepath.lastIndexOf('/');
    if (index > -1) {
        filepath = filepath.substring(index + 1, filepath.length);
    }
    return filepath.trim();
}
/**
 *
 * @param filepath
 * @returns
 */
function getExtension(filepath) {
    const index = filepath.lastIndexOf('.');
    if (index < 0)
        return '';
    return filepath.substring(index, filepath.length).trim();
}
/**
 *
 * @param uri
 * @returns
 */
function getParent(uri) {
    let Index = uri.lastIndexOf('/');
    if (Index > -1) {
        return uri.slice(0, Index + 1);
    }
    Index = uri.lastIndexOf('\\');
    if (Index > -1) {
        return uri.slice(0, Index + 1);
    }
    return uri;
}
//# sourceMappingURL=file.js.map