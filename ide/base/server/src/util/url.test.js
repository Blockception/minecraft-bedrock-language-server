"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const url_1 = require("./url");
describe('Url', () => {
    describe('Vscode', () => {
        describe('FromFs', () => {
            const folderFs = path_1.default.resolve(__dirname, 'test');
            const folder = url_1.Vscode.fromFs(folderFs);
            test('Is not vscode folder', () => {
                expect(url_1.Vscode.isVscode(folderFs)).toBeFalsy();
            });
            test('Is vscode folder', () => {
                expect(url_1.Vscode.isVscode(folder)).toBeTruthy();
            });
        });
        describe('isVscode', () => {
            test('Is not vscode folder', () => {
                expect(url_1.Vscode.isVscode('f:/folder/behavior_packs/temp-bp/blocks/example.block.json')).toBeFalsy();
            });
            test('Is vscode folder', () => {
                expect(url_1.Vscode.isVscode('file:///f%3A/Projects/Minecraft/minecraft-bedrock-samples/resource_pack/manifest.json')).toBeTruthy();
                expect(url_1.Vscode.isVscode('file:///f%3A/folder/behavior_packs/temp-bp/blocks/example.block.json')).toBeTruthy();
            });
        });
        test('Combine', () => {
            const folder = 'file:///f%3A/folder/behavior_packs/';
            const combined = url_1.Vscode.join(folder, 'test', 'test2', 'test3');
            expect(combined).toEqual('file:///f%3A/folder/behavior_packs/test/test2/test3');
        });
        test('Combine with slashes', () => {
            const folder = 'file:///f%3A/folder/behavior_packs';
            const combined = url_1.Vscode.join(folder, 'test', '/test2', '/test3');
            expect(combined).toEqual('file:///f%3A/folder/behavior_packs/test/test2/test3');
        });
    });
});
//# sourceMappingURL=url.test.js.map