import { hasPattern } from '../../../src/utility/checks';

describe('checks', () => {
  describe('hasPattern', () => {
    it('returns true when an item contains the pattern', () => {
      expect(hasPattern('foo', ['foobar', 'baz'])).toBe(true);
    });

    it('returns true when the pattern matches exactly', () => {
      expect(hasPattern('foo', ['foo'])).toBe(true);
    });

    it('returns false when no item contains the pattern', () => {
      expect(hasPattern('xyz', ['foobar', 'baz'])).toBe(false);
    });

    it('returns false for an empty array', () => {
      expect(hasPattern('foo', [])).toBe(false);
    });

    it('returns true when the pattern is found as a substring', () => {
      expect(hasPattern('ello', ['hello', 'world'])).toBe(true);
    });

    it('is case-sensitive', () => {
      expect(hasPattern('FOO', ['foobar'])).toBe(false);
      expect(hasPattern('foo', ['FOOBAR'])).toBe(false);
    });
  });
});
