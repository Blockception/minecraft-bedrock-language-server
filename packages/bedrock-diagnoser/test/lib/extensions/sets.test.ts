import { contains } from '../../../src/extensions/sets';

describe('sets', () => {
  describe('contains', () => {
    it('returns true when the predicate matches an entry', () => {
      const set = new Set(['apple', 'banana', 'cherry']);
      expect(contains(set, (item) => item === 'banana')).toBe(true);
    });

    it('returns false when no entry matches the predicate', () => {
      const set = new Set(['apple', 'banana', 'cherry']);
      expect(contains(set, (item) => item === 'grape')).toBe(false);
    });

    it('returns false for an empty set', () => {
      const set = new Set<string>();
      expect(contains(set, () => true)).toBe(false);
    });

    it('works with number sets', () => {
      const set = new Set([1, 2, 3, 4, 5]);
      expect(contains(set, (item) => item > 4)).toBe(true);
      expect(contains(set, (item) => item > 10)).toBe(false);
    });

    it('stops iterating after the first match', () => {
      const set = new Set(['a', 'b', 'c']);
      let callCount = 0;
      contains(set, (item) => {
        callCount++;
        return item === 'a';
      });
      expect(callCount).toBe(1);
    });
  });
});
