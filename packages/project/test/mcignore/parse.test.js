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
const utillity_1 = require("../utillity");
const src_1 = require("../../src");
const path = __importStar(require("path"));
const Text1 = `OutputFolder
Temp
Template/something
!BP/**/*.json`;
describe('MCIgnore', () => {
    it('parse1', () => {
        const ignores = src_1.MCIgnore.parse(Text1);
        expect(ignores).toMatchSnapshot();
    });
    it('loadSync file1', () => {
        const filepath = path.join(utillity_1.TestFilesFolder, 'mcignore', 'file1.mcignore');
        const ignores = src_1.MCIgnore.loadSync(filepath);
        expect(ignores).toMatchSnapshot();
    });
    it('load file2', async () => {
        const filepath = path.join(utillity_1.TestFilesFolder, 'mcignore', 'file2.mcignore');
        const ignores = await src_1.MCIgnore.load(filepath);
        expect(ignores).toMatchSnapshot();
    });
});
//# sourceMappingURL=parse.test.js.map