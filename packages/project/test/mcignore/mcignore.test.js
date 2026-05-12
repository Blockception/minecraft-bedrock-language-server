"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const src_1 = require("../../src");
describe('MCIgnore', () => {
    describe('createEmpty', () => {
        it('returns an object with an empty patterns array', () => {
            const result = src_1.MCIgnore.createEmpty();
            expect(result).toEqual({ patterns: [] });
        });
        it('each call returns a new independent object', () => {
            const a = src_1.MCIgnore.createEmpty();
            const b = src_1.MCIgnore.createEmpty();
            a.patterns.push('something');
            expect(b.patterns).toHaveLength(0);
        });
    });
    describe('merge', () => {
        it('merges patterns from two MCIgnore objects', () => {
            const a = { patterns: ['OutputFolder', 'Temp'] };
            const b = { patterns: ['Build', '!BP/**'] };
            const merged = src_1.MCIgnore.merge(a, b);
            expect(merged.patterns).toEqual(['OutputFolder', 'Temp', 'Build', '!BP/**']);
        });
        it('returns only B patterns when A is undefined', () => {
            const b = { patterns: ['Build'] };
            const merged = src_1.MCIgnore.merge(undefined, b);
            expect(merged.patterns).toEqual(['Build']);
        });
        it('returns only A patterns when B is undefined', () => {
            const a = { patterns: ['Temp'] };
            const merged = src_1.MCIgnore.merge(a, undefined);
            expect(merged.patterns).toEqual(['Temp']);
        });
        it('returns empty patterns when both are undefined', () => {
            const merged = src_1.MCIgnore.merge(undefined, undefined);
            expect(merged.patterns).toEqual([]);
        });
        it('does not mutate the source objects', () => {
            const a = { patterns: ['Temp'] };
            const b = { patterns: ['Build'] };
            src_1.MCIgnore.merge(a, b);
            expect(a.patterns).toEqual(['Temp']);
            expect(b.patterns).toEqual(['Build']);
        });
    });
    describe('is', () => {
        it('returns true for a valid MCIgnore object', () => {
            expect(src_1.MCIgnore.is({ patterns: ['Temp'] })).toBe(true);
        });
        it('returns true for an object with an empty patterns array', () => {
            expect(src_1.MCIgnore.is({ patterns: [] })).toBe(true);
        });
        it('returns false when patterns is not an array', () => {
            expect(src_1.MCIgnore.is({ patterns: 'not-an-array' })).toBe(false);
        });
        it('returns false when patterns is missing', () => {
            expect(src_1.MCIgnore.is({})).toBe(false);
        });
        it('returns false for null', () => {
            expect(src_1.MCIgnore.is(null)).toBe(false);
        });
        it('returns false for undefined', () => {
            expect(src_1.MCIgnore.is(undefined)).toBe(false);
        });
    });
});
//# sourceMappingURL=mcignore.test.js.map