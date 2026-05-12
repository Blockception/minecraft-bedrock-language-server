"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sets_1 = require("../../../src/extensions/sets");
describe('sets', () => {
    describe('contains', () => {
        it('returns true when the predicate matches an entry', () => {
            const set = new Set(['apple', 'banana', 'cherry']);
            expect((0, sets_1.contains)(set, (item) => item === 'banana')).toBe(true);
        });
        it('returns false when no entry matches the predicate', () => {
            const set = new Set(['apple', 'banana', 'cherry']);
            expect((0, sets_1.contains)(set, (item) => item === 'grape')).toBe(false);
        });
        it('returns false for an empty set', () => {
            const set = new Set();
            expect((0, sets_1.contains)(set, () => true)).toBe(false);
        });
        it('works with number sets', () => {
            const set = new Set([1, 2, 3, 4, 5]);
            expect((0, sets_1.contains)(set, (item) => item > 4)).toBe(true);
            expect((0, sets_1.contains)(set, (item) => item > 10)).toBe(false);
        });
        it('stops iterating after the first match', () => {
            const set = new Set(['a', 'b', 'c']);
            let callCount = 0;
            (0, sets_1.contains)(set, (item) => {
                callCount++;
                return item === 'a';
            });
            expect(callCount).toBe(1);
        });
    });
});
//# sourceMappingURL=sets.test.js.map