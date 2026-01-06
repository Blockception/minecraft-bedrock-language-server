import { safeObjectKeys, safeObjectEntries, safeObjectValues } from './index';

describe('safeObjectKeys', () => {
  it('should return keys for a valid object', () => {
    const obj = { a: 1, b: 2, c: 3 };
    const keys = safeObjectKeys(obj);
    expect(keys).toEqual(['a', 'b', 'c']);
  });

  it('should return empty array for null', () => {
    const keys = safeObjectKeys(null);
    expect(keys).toEqual([]);
  });

  it('should return empty array for undefined', () => {
    const keys = safeObjectKeys(undefined);
    expect(keys).toEqual([]);
  });

  it('should return empty array for an empty object', () => {
    const obj = {};
    const keys = safeObjectKeys(obj);
    expect(keys).toEqual([]);
  });
});

describe('safeObjectEntries', () => {
  it('should return entries for a valid object', () => {
    const obj = { a: 1, b: 2 };
    const entries = safeObjectEntries(obj);
    expect(entries).toEqual([
      ['a', 1],
      ['b', 2],
    ]);
  });

  it('should return empty array for null', () => {
    const entries = safeObjectEntries(null);
    expect(entries).toEqual([]);
  });

  it('should return empty array for undefined', () => {
    const entries = safeObjectEntries(undefined);
    expect(entries).toEqual([]);
  });

  it('should return empty array for an empty object', () => {
    const obj = {};
    const entries = safeObjectEntries(obj);
    expect(entries).toEqual([]);
  });
});

describe('safeObjectValues', () => {
  it('should return values for a valid object', () => {
    const obj = { a: 1, b: 2, c: 3 };
    const values = safeObjectValues(obj);
    expect(values).toEqual([1, 2, 3]);
  });

  it('should return empty array for null', () => {
    const values = safeObjectValues(null);
    expect(values).toEqual([]);
  });

  it('should return empty array for undefined', () => {
    const values = safeObjectValues(undefined);
    expect(values).toEqual([]);
  });

  it('should return empty array for an empty object', () => {
    const obj = {};
    const values = safeObjectValues(obj);
    expect(values).toEqual([]);
  });
});
