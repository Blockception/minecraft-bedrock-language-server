import { forEach } from '../../../src/utility/references';

describe('references', () => {
  describe('forEach', () => {
    it('does nothing when data is undefined', () => {
      const collected: string[] = [];
      forEach(undefined, (key) => collected.push(key));
      expect(collected).toEqual([]);
    });

    it('iterates over a string array', () => {
      const collected: string[] = [];
      forEach(['a', 'b', 'c'], (key) => collected.push(key));
      expect(collected).toEqual(['a', 'b', 'c']);
    });

    it('iterates over the using array of a partial References object', () => {
      const collected: string[] = [];
      // Cast to allow using an array-based partial References for testing
      const data = { using: ['x', 'y'] } as any;
      forEach(data, (key) => collected.push(key));
      expect(collected).toEqual(['x', 'y']);
    });

    it('iterates over the defined array of a partial References object', () => {
      const collected: string[] = [];
      const data = { defined: ['p', 'q'] } as any;
      forEach(data, (key) => collected.push(key));
      expect(collected).toEqual(['p', 'q']);
    });

    it('iterates over both using and defined when both are present', () => {
      const collected: string[] = [];
      const data = { using: ['u1', 'u2'], defined: ['d1'] } as any;
      forEach(data, (key) => collected.push(key));
      expect(collected).toEqual(['u1', 'u2', 'd1']);
    });

    it('does nothing when using and defined are not arrays', () => {
      const collected: string[] = [];
      const data = {} as any;
      forEach(data, (key) => collected.push(key));
      expect(collected).toEqual([]);
    });
  });
});
