"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const file_1 = require("./file");
const filename = 'I am a filepath.json';
const Extention = '.json';
const parent = 'C:\\temp';
const Fullpath = path_1.default.join(parent, filename);
describe('File', () => {
    test('GetFilename', () => {
        const fname = (0, file_1.getFilename)(Fullpath);
        expect(fname).toEqual('I am a filepath');
    });
    test('getExtension', () => {
        const Ext = (0, file_1.getExtension)(Fullpath);
        expect(Ext).toEqual(Extention);
    });
    test('GetParent', () => {
        const P = (0, file_1.getParent)(Fullpath);
        expect(P).toEqual(parent + path_1.default.sep);
    });
});
//# sourceMappingURL=file.test.js.map