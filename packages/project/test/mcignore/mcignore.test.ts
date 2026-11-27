import { MCIgnore } from '../../src';

describe('MCIgnore', () => {
  describe('createEmpty', () => {
    it('returns an object with an empty patterns array', () => {
      const result = MCIgnore.createEmpty();
      expect(result).toEqual({ patterns: [] });
    });

    it('each call returns a new independent object', () => {
      const a = MCIgnore.createEmpty();
      const b = MCIgnore.createEmpty();
      a.patterns.push('something');
      expect(b.patterns).toHaveLength(0);
    });
  });

  describe('createDefault', () => {
    it('returns the default patterns', () => {
      const result = MCIgnore.createDefault();
      expect(result.patterns).toEqual(['**/node_modules/**', '**/.git/**']);
    });
  });

  describe('withoutDefaults', () => {
    it('removes a leading default-patterns prefix', () => {
      const data: MCIgnore = { patterns: ['**/node_modules/**', '**/.git/**', 'Temp', 'Build'] };
      const result = MCIgnore.withoutDefaults(data);
      expect(result.patterns).toEqual(['Temp', 'Build']);
    });

    it('does not mutate the source object', () => {
      const data: MCIgnore = { patterns: ['**/node_modules/**', '**/.git/**', 'Temp'] };
      MCIgnore.withoutDefaults(data);
      expect(data.patterns).toEqual(['**/node_modules/**', '**/.git/**', 'Temp']);
    });

    it('is a no-op when there is no default-patterns prefix', () => {
      const data: MCIgnore = { patterns: ['Temp', 'Build'] };
      const result = MCIgnore.withoutDefaults(data);
      expect(result.patterns).toEqual(['Temp', 'Build']);
    });

    it('keeps a pattern that merely looks like a default when it is not a leading prefix', () => {
      const data: MCIgnore = { patterns: ['Temp', '**/node_modules/**', '**/.git/**'] };
      const result = MCIgnore.withoutDefaults(data);
      expect(result.patterns).toEqual(['Temp', '**/node_modules/**', '**/.git/**']);
    });
  });

  describe('merge', () => {
    it('merges patterns from two MCIgnore objects', () => {
      const a: MCIgnore = { patterns: ['OutputFolder', 'Temp'] };
      const b: MCIgnore = { patterns: ['Build', '!BP/**'] };
      const merged = MCIgnore.merge(a, b);
      expect(merged.patterns).toEqual(['OutputFolder', 'Temp', 'Build', '!BP/**']);
    });

    it('returns only B patterns when A is undefined', () => {
      const b: MCIgnore = { patterns: ['Build'] };
      const merged = MCIgnore.merge(undefined, b);
      expect(merged.patterns).toEqual(['Build']);
    });

    it('returns only A patterns when B is undefined', () => {
      const a: MCIgnore = { patterns: ['Temp'] };
      const merged = MCIgnore.merge(a, undefined);
      expect(merged.patterns).toEqual(['Temp']);
    });

    it('returns empty patterns when both are undefined', () => {
      const merged = MCIgnore.merge(undefined, undefined);
      expect(merged.patterns).toEqual([]);
    });

    it('does not mutate the source objects', () => {
      const a: MCIgnore = { patterns: ['Temp'] };
      const b: MCIgnore = { patterns: ['Build'] };
      MCIgnore.merge(a, b);
      expect(a.patterns).toEqual(['Temp']);
      expect(b.patterns).toEqual(['Build']);
    });
  });

  describe('is', () => {
    it('returns true for a valid MCIgnore object', () => {
      expect(MCIgnore.is({ patterns: ['Temp'] })).toBe(true);
    });

    it('returns true for an object with an empty patterns array', () => {
      expect(MCIgnore.is({ patterns: [] })).toBe(true);
    });

    it('returns false when patterns is not an array', () => {
      expect(MCIgnore.is({ patterns: 'not-an-array' })).toBe(false);
    });

    it('returns false when patterns is missing', () => {
      expect(MCIgnore.is({})).toBe(false);
    });

    it('returns false for null', () => {
      expect(MCIgnore.is(null)).toBe(false);
    });

    it('returns false for undefined', () => {
      expect(MCIgnore.is(undefined)).toBe(false);
    });
  });
});
