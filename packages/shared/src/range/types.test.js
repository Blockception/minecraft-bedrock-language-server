"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("./types");
const types_2 = require("../position/types");
describe('Range', () => {
    it('is - valid range', () => {
        const range = {
            start: { line: 0, character: 0 },
            end: { line: 5, character: 10 },
        };
        expect(types_1.Range.is(range)).toBeTruthy();
    });
    it('is - invalid range with invalid start', () => {
        const range = {
            start: { line: 0 },
            end: { line: 5, character: 10 },
        };
        expect(types_1.Range.is(range)).toBeFalsy();
    });
    it('is - invalid range with invalid end', () => {
        const range = {
            start: { line: 0, character: 0 },
            end: { line: 5 },
        };
        expect(types_1.Range.is(range)).toBeFalsy();
    });
    it('is - null value', () => {
        expect(types_1.Range.is(null)).toBeFalsy();
    });
    it('is - undefined value', () => {
        expect(types_1.Range.is(undefined)).toBeFalsy();
    });
    it('create', () => {
        const start = types_2.Position.create(0, 5);
        const end = types_2.Position.create(10, 15);
        const range = types_1.Range.create(start, end);
        expect(range.start).toEqual(start);
        expect(range.end).toEqual(end);
    });
    it('createR', () => {
        const range = types_1.Range.createR(1, 5, 10, 20);
        expect(range.start.line).toEqual(1);
        expect(range.start.character).toEqual(5);
        expect(range.end.line).toEqual(10);
        expect(range.end.character).toEqual(20);
    });
});
//# sourceMappingURL=types.test.js.map