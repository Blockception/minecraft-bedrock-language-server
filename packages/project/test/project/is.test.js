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
describe('MCProject', () => {
    it('is it1', () => {
        const project = src_1.MCProject.createEmpty();
        expect(project).toMatchSnapshot();
    });
    it('is p1', () => {
        const folder = path.join(utillity_1.TestFilesFolder, 'mcproject', 'p1');
        const project = src_1.MCProject.loadSync(folder);
        expect(project).toMatchSnapshot();
    });
    it('is async p1', async () => {
        const folder = path.join(utillity_1.TestFilesFolder, 'mcproject', 'p1');
        const project = await src_1.MCProject.load(folder);
        expect(project).toMatchSnapshot();
    });
});
//# sourceMappingURL=is.test.js.map