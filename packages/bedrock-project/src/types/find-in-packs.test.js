"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const find_in_packs_1 = require("../../src/types/find-in-packs");
describe('findInPacks', () => {
    it('returns undefined for an empty array', () => {
        const result = (0, find_in_packs_1.findInPacks)([], (pack) => pack);
        expect(result).toBeUndefined();
    });
    it('returns the first non-undefined result', () => {
        const packs = ['a', 'b', 'c'];
        const result = (0, find_in_packs_1.findInPacks)(packs, (pack) => (pack === 'b' ? 'found-b' : undefined));
        expect(result).toBe('found-b');
    });
    it('returns undefined when fn never returns a value', () => {
        const packs = ['a', 'b', 'c'];
        const result = (0, find_in_packs_1.findInPacks)(packs, () => undefined);
        expect(result).toBeUndefined();
    });
    it('returns the first match when multiple packs match', () => {
        const packs = ['a', 'b', 'c'];
        const result = (0, find_in_packs_1.findInPacks)(packs, (pack) => pack.toUpperCase());
        expect(result).toBe('A');
    });
    it('stops iterating after the first match', () => {
        const visited = [];
        const packs = ['a', 'b', 'c'];
        (0, find_in_packs_1.findInPacks)(packs, (pack) => {
            visited.push(pack);
            return pack === 'b' ? 'found' : undefined;
        });
        expect(visited).toEqual(['a', 'b']);
    });
    it('works with object packs', () => {
        const packs = [{ id: 1, value: undefined }, { id: 2, value: 'hello' }, { id: 3, value: 'world' }];
        const result = (0, find_in_packs_1.findInPacks)(packs, (pack) => pack.value);
        expect(result).toBe('hello');
    });
});
//# sourceMappingURL=find-in-packs.test.js.map