import { MolangSet } from '../../src/molang';
import { valid_syntaxes } from '../data/dataset-valid';
import { VanillaPlayer } from '../vanilla-player';

describe('MolangSet - harvest', () => {
  test.each(valid_syntaxes)(
    '%#. %s',
    (synt) => {
      const data = toMolangSet(synt);
      expect(data).toMatchSnapshot();
    },
    1000,
  );

  test('vanilla-player', () => {
    const data = toMolangSetFrom(VanillaPlayer.DataObject, VanillaPlayer.Data);
    expect(data).toMatchSnapshot();
  }, 1000);

  describe('nullish coalescing', () => {
    test('left side of ?? should not be marked as using', () => {
      const set = toMolangSet('v.width ?? 1');
      // v.width should NOT be in the using set because it's on the left side of ??
      expect(set.using.size).toBe(0);
    });

    test('nested nullish coalescing should not mark left variables as using', () => {
      const set = toMolangSet('(v.width ?? 0) + (v.height ?? 1)');
      // Neither v.width nor v.height should be in the using set
      expect(set.using.size).toBe(0);
    });

    test('right side of ?? should still be processed normally', () => {
      const set = toMolangSet('v.foo ?? v.bar');
      // v.foo should NOT be in using (left side of ??)
      // v.bar SHOULD be in using (right side of ??)
      expect(set.using.size).toBe(1);
      const usingArray = Array.from(set.using);
      expect(usingArray[0].scope).toBe('v');
      expect(usingArray[0].names).toEqual(['bar']);
    });

    test('variable in regular expression should still be marked as using', () => {
      const set = toMolangSet('v.width + 1');
      // v.width SHOULD be in using because it's not in a nullish coalescing
      expect(set.using.size).toBe(1);
      const usingArray = Array.from(set.using);
      expect(usingArray[0].scope).toBe('v');
      expect(usingArray[0].names).toEqual(['width']);
    });

    test('assigned variables should not be affected by nullish coalescing logic', () => {
      const set = toMolangSet('v.result = v.width ?? 1');
      // v.result should be in assigned
      expect(set.assigned.size).toBe(1);
      // v.width should NOT be in using (left side of ??)
      expect(set.using.size).toBe(0);
    });

    test('complex expression from issue example', () => {
      const set = toMolangSet('variable.rolled_up_time = variable.is_rolled_up ? ((variable.rolled_up_time ?? 0.0) + query.delta_time) : 0.0');
      // variable.is_rolled_up should be in using
      // variable.rolled_up_time should be in assigned (left side of =)
      // variable.rolled_up_time inside ?? should NOT be in using
      // query.delta_time should be a function, not using
      
      expect(set.assigned.size).toBe(1);
      const assignedArray = Array.from(set.assigned);
      expect(assignedArray[0].names).toEqual(['rolled_up_time']);
      
      // Only variable.is_rolled_up should be in using
      expect(set.using.size).toBe(1);
      const usingArray = Array.from(set.using);
      expect(usingArray[0].names).toEqual(['is_rolled_up']);
    });
  });
});

function toMolangSet(molangs: string) {
  const data = {
    scripts: {
      pre_animation: [molangs],
    },
  };

  const text = JSON.stringify(data, null, 2);
  const set = new MolangSet();
  set.harvest(data, text);
  return set;
}

function toMolangSetFrom(object: object, text: string) {
  const set = new MolangSet();
  set.harvest(object, text);
  return set;
}
