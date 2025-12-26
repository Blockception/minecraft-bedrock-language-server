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

    // Additional comprehensive tests for edge cases
    test('chained nullish coalescing operators', () => {
      const set = toMolangSet('v.a ?? (v.b ?? (v.c ?? 0))');
      // v.a is left of first ??, should NOT be in using
      // v.b is left of second ?? (right of first ??), should NOT be in using
      // v.c is left of third ?? (right of second ??), should NOT be in using
      // 0 is right of third ??, but it's a literal
      expect(set.using.size).toBe(0);
    });

    test('chained ?? with variable on rightmost side', () => {
      const set = toMolangSet('v.a ?? (v.b ?? v.c)');
      // v.a is left of first ??, should NOT be in using
      // v.b is left of second ?? (right of first ??), should NOT be in using
      // v.c is right of second ??, SHOULD be in using
      expect(set.using.size).toBe(1);
      const usingArray = Array.from(set.using);
      expect(usingArray[0].names).toEqual(['c']);
    });

    test('nullish coalescing with different variable scopes', () => {
      const set = toMolangSet('(v.a ?? 0) + (variable.b ?? 0) + (t.c ?? 0) + (temp.d ?? 0)');
      // All left-side variables should NOT be in using
      expect(set.using.size).toBe(0);
    });

    test('nullish coalescing combined with logical AND', () => {
      const set = toMolangSet('(v.enabled ?? false) && v.active');
      // v.enabled should NOT be in using (left of ??)
      // v.active SHOULD be in using (used in &&)
      expect(set.using.size).toBe(1);
      const usingArray = Array.from(set.using);
      expect(usingArray[0].names).toEqual(['active']);
    });

    test('nullish coalescing combined with logical OR', () => {
      const set = toMolangSet('v.disabled || (v.fallback ?? true)');
      // v.disabled SHOULD be in using (used in ||)
      // v.fallback should NOT be in using (left of ??)
      expect(set.using.size).toBe(1);
      const usingArray = Array.from(set.using);
      expect(usingArray[0].names).toEqual(['disabled']);
    });

    test('nullish coalescing in ternary condition', () => {
      const set = toMolangSet('(v.mode ?? 0) > 0 ? v.on : v.off');
      // v.mode should NOT be in using (left of ??)
      // v.on SHOULD be in using (in ternary true branch)
      // v.off SHOULD be in using (in ternary false branch)
      expect(set.using.size).toBe(2);
      const usingArray = Array.from(set.using);
      const names = usingArray.map(v => v.names[0]).sort();
      expect(names).toEqual(['off', 'on']);
    });

    test('nullish coalescing with function calls', () => {
      const set = toMolangSet('(v.value ?? 0) + math.sin(v.angle ?? 0)');
      // v.value should NOT be in using (left of ??)
      // v.angle should NOT be in using (left of ??)
      expect(set.using.size).toBe(0);
      expect(set.functions.size).toBe(1);
    });

    test('assignment followed by nullish coalescing', () => {
      const set = toMolangSet('v.temp = (v.input ?? 0)');
      // v.temp should be in assigned
      // v.input should NOT be in using (it's in left of ??)
      expect(set.assigned.size).toBe(1);
      expect(set.using.size).toBe(0);
      const assignedArray = Array.from(set.assigned);
      expect(assignedArray[0].names).toEqual(['temp']);
    });

    test('nested nullish coalescing with arithmetic', () => {
      const set = toMolangSet('(v.x ?? 0) + (v.y ?? 0) * (v.scale ?? 1)');
      // v.x, v.y, v.scale should all NOT be in using (all left of ??)
      expect(set.using.size).toBe(0);
    });

    test('nullish coalescing with comparison operators', () => {
      const set = toMolangSet('(v.health ?? 100) < 50');
      // v.health should NOT be in using (left of ??)
      expect(set.using.size).toBe(0);
    });

    test('nullish coalescing does not affect variables outside the expression', () => {
      const set = toMolangSet('v.result = v.defined + (v.maybe ?? 0)');
      // v.result should be in assigned
      // v.defined SHOULD be in using (not protected by ??)
      // v.maybe should NOT be in using (left of ??)
      expect(set.assigned.size).toBe(1);
      expect(set.using.size).toBe(1);
      const usingArray = Array.from(set.using);
      expect(usingArray[0].names).toEqual(['defined']);
    });

    test('multiple separate nullish coalescing expressions', () => {
      const set = toMolangSet('v.a = v.x ?? 0; v.b = v.y ?? 1; v.c = v.z ?? 2;');
      // v.a, v.b, v.c should be in assigned
      // v.x, v.y, v.z should NOT be in using (all left of ??)
      expect(set.assigned.size).toBe(3);
      expect(set.using.size).toBe(0);
    });

    test('nullish coalescing with dotted property access', () => {
      const set = toMolangSet('v.player.health ?? 100');
      // v.player.health should NOT be in using
      expect(set.using.size).toBe(0);
    });

    test('nullish coalescing preserves function detection', () => {
      const set = toMolangSet('(v.override ?? query.health) + (query.max_health ?? 100)');
      // v.override should NOT be in using
      // query.health and query.max_health should be in functions
      expect(set.using.size).toBe(0);
      expect(set.functions.size).toBe(2);
    });

    test('deeply nested nullish coalescing', () => {
      const set = toMolangSet('v.a ?? (v.b ?? (v.c ?? (v.d ?? 0)))');
      // All variables are on left sides of ?? operators, none should be in using
      expect(set.using.size).toBe(0);
    });

    test('nullish coalescing with unary operators', () => {
      const set = toMolangSet('!(v.disabled ?? false)');
      // v.disabled should NOT be in using (left of ??)
      expect(set.using.size).toBe(0);
    });

    test('nullish coalescing with negative values', () => {
      const set = toMolangSet('v.offset ?? -1');
      // v.offset should NOT be in using
      expect(set.using.size).toBe(0);
    });

    test('nullish coalescing in array-like context', () => {
      const set = toMolangSet('array.values[v.index ?? 0]');
      // v.index should NOT be in using (left of ??)
      // array.values should be in using (array access)
      expect(set.using.size).toBe(1);
      const usingArray = Array.from(set.using);
      expect(usingArray[0].scope).toBe('array');
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
