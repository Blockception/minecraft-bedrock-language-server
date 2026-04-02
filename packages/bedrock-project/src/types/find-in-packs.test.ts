
import { findInPacks } from '../../src/types/find-in-packs';

describe('findInPacks', () => {
  it('returns undefined for an empty array', () => {
    const result = findInPacks<string, string>([], (pack) => pack);
    expect(result).toBeUndefined();
  });

  it('returns the first non-undefined result', () => {
    const packs = ['a', 'b', 'c'];
    const result = findInPacks(packs, (pack) => (pack === 'b' ? 'found-b' : undefined));
    expect(result).toBe('found-b');
  });

  it('returns undefined when fn never returns a value', () => {
    const packs = ['a', 'b', 'c'];
    const result = findInPacks<string, string>(packs, () => undefined);
    expect(result).toBeUndefined();
  });

  it('returns the first match when multiple packs match', () => {
    const packs = ['a', 'b', 'c'];
    const result = findInPacks(packs, (pack) => pack.toUpperCase());
    expect(result).toBe('A');
  });

  it('stops iterating after the first match', () => {
    const visited: string[] = [];
    const packs = ['a', 'b', 'c'];

    findInPacks(packs, (pack) => {
      visited.push(pack);
      return pack === 'b' ? 'found' : undefined;
    });

    expect(visited).toEqual(['a', 'b']);
  });

  it('works with object packs', () => {
    const packs = [{ id: 1, value: undefined }, { id: 2, value: 'hello' }, { id: 3, value: 'world' }];
    const result = findInPacks(packs, (pack) => pack.value);
    expect(result).toBe('hello');
  });
});
