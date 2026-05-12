"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isDirectory = isDirectory;
exports.isFile = isFile;
exports.exists = exists;
const fs_1 = require("fs");
function isDirectory(path, logger) {
    try {
        return (0, fs_1.lstatSync)(path).isDirectory();
    }
    catch (err) {
        logger.error(`error during the checking isDirectory: ${path}`, err);
    }
    return false;
}
function isFile(path, logger) {
    try {
        return (0, fs_1.lstatSync)(path).isFile();
    }
    catch (err) {
        logger.error(`error during the checking isFile: ${path}`, err);
    }
    return false;
}
function exists(path, logger) {
    try {
        return (0, fs_1.existsSync)(path);
    }
    catch (err) {
        logger.error(`error during the checking exists: ${path}`, err);
    }
    return false;
}
//# sourceMappingURL=io.js.map