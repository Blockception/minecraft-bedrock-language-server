"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_languageserver_1 = require("vscode-languageserver");
const range_1 = require("./range");
describe('Range', () => {
    test('should be within range', () => {
        const R = { start: { character: 10, line: 1 }, end: { character: 5, line: 2 } };
        expect(range_1.Range.Within(R, { line: 1, character: 11 })).toBeTruthy();
        expect(range_1.Range.Within(R, { line: 2, character: 4 })).toBeTruthy();
        expect(range_1.Range.Within(R, { line: 1, character: 9 })).toBeFalsy();
        expect(range_1.Range.Within(R, { line: 2, character: 6 })).toBeFalsy();
    });
    test('location should be within range', () => {
        const R = { start: { character: 10, line: 1 }, end: { character: 5, line: 2 } };
        const L = vscode_languageserver_1.Location.create('', R);
        expect(range_1.Range.Within(L, { line: 1, character: 11 })).toBeTruthy();
        expect(range_1.Range.Within(L, { line: 2, character: 4 })).toBeTruthy();
        expect(range_1.Range.Within(L, { line: 1, character: 9 })).toBeFalsy();
        expect(range_1.Range.Within(L, { line: 2, character: 6 })).toBeFalsy();
    });
    test('extensive within range', () => {
        const R = { start: { character: 2, line: 1 }, end: { character: 12, line: 1 } };
        for (let I = 3; I < 12; I++) {
            expect(range_1.Range.Within(R, I)).toBeTruthy();
        }
        expect(range_1.Range.Within(R, { line: 1, character: 1 })).toBeFalsy();
        expect(range_1.Range.Within(R, { line: 2, character: 13 })).toBeFalsy();
    });
    test('extensive within range', () => {
        const R = { start: { character: 2, line: 1 }, end: { character: 12, line: 1 } };
        for (let I = 3; I < 12; I++) {
            expect(range_1.Range.Within(R, I)).toBeTruthy();
        }
        expect(range_1.Range.Within(R, { line: 1, character: 1 })).toBeFalsy();
        expect(range_1.Range.Within(R, { line: 2, character: 13 })).toBeFalsy();
    });
});
//# sourceMappingURL=range.test.js.map