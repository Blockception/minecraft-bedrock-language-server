"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const references_1 = require("../../../src/utility/references");
describe('references', () => {
    describe('forEach', () => {
        it('does nothing when data is undefined', () => {
            const collected = [];
            (0, references_1.forEach)(undefined, (key) => collected.push(key));
            expect(collected).toEqual([]);
        });
        it('iterates over a string array', () => {
            const collected = [];
            (0, references_1.forEach)(['a', 'b', 'c'], (key) => collected.push(key));
            expect(collected).toEqual(['a', 'b', 'c']);
        });
        it('iterates over the using array of a partial References object', () => {
            const collected = [];
            // Cast to allow using an array-based partial References for testing
            const data = { using: ['x', 'y'] };
            (0, references_1.forEach)(data, (key) => collected.push(key));
            expect(collected).toEqual(['x', 'y']);
        });
        it('iterates over the defined array of a partial References object', () => {
            const collected = [];
            const data = { defined: ['p', 'q'] };
            (0, references_1.forEach)(data, (key) => collected.push(key));
            expect(collected).toEqual(['p', 'q']);
        });
        it('iterates over both using and defined when both are present', () => {
            const collected = [];
            const data = { using: ['u1', 'u2'], defined: ['d1'] };
            (0, references_1.forEach)(data, (key) => collected.push(key));
            expect(collected).toEqual(['u1', 'u2', 'd1']);
        });
        it('does nothing when using and defined are not arrays', () => {
            const collected = [];
            const data = {};
            (0, references_1.forEach)(data, (key) => collected.push(key));
            expect(collected).toEqual([]);
        });
    });
});
//# sourceMappingURL=references.test.js.map