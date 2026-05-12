"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const checks_1 = require("../../../src/utility/checks");
describe('checks', () => {
    describe('hasPattern', () => {
        it('returns true when an item contains the pattern', () => {
            expect((0, checks_1.hasPattern)('foo', ['foobar', 'baz'])).toBe(true);
        });
        it('returns true when the pattern matches exactly', () => {
            expect((0, checks_1.hasPattern)('foo', ['foo'])).toBe(true);
        });
        it('returns false when no item contains the pattern', () => {
            expect((0, checks_1.hasPattern)('xyz', ['foobar', 'baz'])).toBe(false);
        });
        it('returns false for an empty array', () => {
            expect((0, checks_1.hasPattern)('foo', [])).toBe(false);
        });
        it('returns true when the pattern is found as a substring', () => {
            expect((0, checks_1.hasPattern)('ello', ['hello', 'world'])).toBe(true);
        });
        it('is case-sensitive', () => {
            expect((0, checks_1.hasPattern)('FOO', ['foobar'])).toBe(false);
            expect((0, checks_1.hasPattern)('foo', ['FOOBAR'])).toBe(false);
        });
    });
});
//# sourceMappingURL=checks.test.js.map