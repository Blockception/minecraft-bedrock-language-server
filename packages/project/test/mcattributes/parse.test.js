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
const src_1 = require("../../src");
const utillity_1 = require("../utillity");
const path = __importStar(require("path"));
const Text1 = `diagnostics.objectives=true
diagnostics.tags=false
diagnostics.json=true`;
describe('MCAttributes', () => {
    describe('parse1', () => {
        const parse = src_1.MCAttributes.parse(Text1);
        expect(parse).toMatchSnapshot();
    });
    it('loadSync file1', () => {
        const filepath = path.join(utillity_1.TestFilesFolder, 'mcattributes', 'file1.mcattributes');
        const attributes = src_1.MCAttributes.loadSync(filepath);
        expect(attributes).toMatchSnapshot();
    });
    it('load file2', async () => {
        const filepath = path.join(utillity_1.TestFilesFolder, 'mcattributes', 'file2.mcattributes');
        const attributes = await src_1.MCAttributes.load(filepath);
        expect(attributes).toMatchSnapshot();
    });
});
//# sourceMappingURL=parse.test.js.map