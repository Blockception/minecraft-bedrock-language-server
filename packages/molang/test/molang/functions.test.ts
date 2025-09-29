import { getEvent, isMolang, isMolangType, isValidMolang, MolangType } from '../../src/molang';
import { looks_like_molang } from '../data/dataset-lookslike';
import { valid_syntaxes } from '../data/dataset-valid';

describe('Functions', () => {
  describe('IsMolangType', () => {
    const shouldbe = [
      'variable.is_holding_right = 0.0;',
      'variable.is_blinking = 0.0;',
      'variable.last_blink_time = 0.0;',
      'variable.hand_bob = 0.0;',
      'variable.first_person_rotation_factor = math.sin((1 - variable.attack_time) * 180.0);',
      'variable.tcos1 = -variable.tcos0;',
      '@s to:anger',
      '@s to:Angrey_wolf',
      'query.variant == 1',
    ];

    test.each(shouldbe)('should be valid: %#. %s', (item) => {
      expect(isMolangType(item)).not.toEqual(MolangType.unknown);
    });

    const invalid = ['minecraft:player'];

    test.each(invalid)('should not valid: %#. %s', (item) => {
      expect(isMolangType(item)).toEqual(MolangType.unknown);
    });
  });

  describe('isMolang', () => {
    test.each(valid_syntaxes)('should be valid: %#. %s', (item) => {
      expect(isMolang(item)).toBeTruthy();
    });
    test.each(looks_like_molang)('should not be valid: %#. %s', (item) => {
      expect(isMolang(item)).toBeFalsy();
    });
  });

  it('getEvent', () => {
    const data = getEvent('@s to:anger');

    expect(data).toEqual('to:anger');
  });

  describe('isValidMolang', () => {
    test.each(valid_syntaxes)('isValidMolang should be valid: %#. %s', (item) => {
      expect(isValidMolang(item)).toBeTruthy();
    });
  });
});
