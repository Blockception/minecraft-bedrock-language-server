"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
describe('safeObjectKeys', () => {
    it('should return keys for a valid object', () => {
        const obj = { a: 1, b: 2, c: 3 };
        const keys = (0, index_1.safeObjectKeys)(obj);
        expect(keys).toEqual(['a', 'b', 'c']);
    });
    it('should return empty array for null', () => {
        const keys = (0, index_1.safeObjectKeys)(null);
        expect(keys).toEqual([]);
    });
    it('should return empty array for undefined', () => {
        const keys = (0, index_1.safeObjectKeys)(undefined);
        expect(keys).toEqual([]);
    });
    it('should return empty array for an empty object', () => {
        const obj = {};
        const keys = (0, index_1.safeObjectKeys)(obj);
        expect(keys).toEqual([]);
    });
});
describe('safeObjectEntries', () => {
    it('should return entries for a valid object', () => {
        const obj = { a: 1, b: 2 };
        const entries = (0, index_1.safeObjectEntries)(obj);
        expect(entries).toEqual([
            ['a', 1],
            ['b', 2],
        ]);
    });
    it('should return empty array for null', () => {
        const entries = (0, index_1.safeObjectEntries)(null);
        expect(entries).toEqual([]);
    });
    it('should return empty array for undefined', () => {
        const entries = (0, index_1.safeObjectEntries)(undefined);
        expect(entries).toEqual([]);
    });
    it('should return empty array for an empty object', () => {
        const obj = {};
        const entries = (0, index_1.safeObjectEntries)(obj);
        expect(entries).toEqual([]);
    });
});
describe('safeObjectValues', () => {
    it('should return values for a valid object', () => {
        const obj = { a: 1, b: 2, c: 3 };
        const values = (0, index_1.safeObjectValues)(obj);
        expect(values).toEqual([1, 2, 3]);
    });
    it('should return empty array for null', () => {
        const values = (0, index_1.safeObjectValues)(null);
        expect(values).toEqual([]);
    });
    it('should return empty array for undefined', () => {
        const values = (0, index_1.safeObjectValues)(undefined);
        expect(values).toEqual([]);
    });
    it('should return empty array for an empty object', () => {
        const obj = {};
        const values = (0, index_1.safeObjectValues)(obj);
        expect(values).toEqual([]);
    });
});
//# sourceMappingURL=index.test.js.map