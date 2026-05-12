"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findInFolder = findInFolder;
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
function findInFolder(base, find) {
    const folders = (0, fs_1.readdirSync)(base);
    for (let I = 0; I < folders.length; I++) {
        const f = folders[I];
        if (f.includes(find)) {
            return path_1.default.join(base, f);
        }
    }
    return undefined;
}
//# sourceMappingURL=general.js.map