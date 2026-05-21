import { MCLint } from '../../src';
import * as path from 'path';
import { TestFilesFolder } from '../utillity';

const minimalJson = `{ "rules": {} }`;
const fullJson = `{
  "rules": {
    "identity.format": "warn",
    "namespace.allow": ["error", ["myns", "common"]],
    "namespace.deny": ["error", ["minecraft"]],
    "animation.naming": ["warn", "^animation\\\\."],
    "animation-state.naming": "off",
    "bone.naming": "off",
    "molang.variable.naming": ["warn", "^v\\\\."]
  }
}`;
const invalidJson = `not valid json`;

describe('MCLint', () => {
  describe('parse', () => {
    it('empty rules object', () => {
      const result = MCLint.parse(minimalJson);
      expect(result).toMatchSnapshot();
    });

    it('full config', () => {
      const result = MCLint.parse(fullJson);
      expect(result).toMatchSnapshot();
    });

    it('invalid json returns empty config', () => {
      const result = MCLint.parse(invalidJson);
      expect(result).toEqual(MCLint.createEmpty());
    });

    it('non-object returns empty config', () => {
      expect(MCLint.parse('null')).toEqual(MCLint.createEmpty());
      expect(MCLint.parse('"string"')).toEqual(MCLint.createEmpty());
      expect(MCLint.parse('42')).toEqual(MCLint.createEmpty());
    });

    it('missing rules returns empty config', () => {
      expect(MCLint.parse('{"notRules": {}}')).toEqual(MCLint.createEmpty());
    });
  });

  describe('loadSync', () => {
    it('file1.mclint', () => {
      const filepath = path.join(TestFilesFolder, 'mclint', 'file1.mclint');
      const result = MCLint.loadSync(filepath);
      expect(result).toMatchSnapshot();
    });

    it('non-existing file returns empty config', () => {
      const filepath = path.join(TestFilesFolder, 'mclint', 'does-not-exist.mclint');
      const result = MCLint.loadSync(filepath);
      expect(result).toEqual(MCLint.createEmpty());
    });
  });

  describe('load', () => {
    it('file2.mclint', async () => {
      const filepath = path.join(TestFilesFolder, 'mclint', 'file2.mclint');
      const result = await MCLint.load(filepath);
      expect(result).toMatchSnapshot();
    });

    it('non-existing file resolves to empty config', async () => {
      const filepath = path.join(TestFilesFolder, 'mclint', 'does-not-exist.mclint');
      const result = await MCLint.load(filepath);
      expect(result).toEqual(MCLint.createEmpty());
    });
  });

  describe('getSeverity', () => {
    it('undefined returns off', () => {
      expect(MCLint.getSeverity(undefined)).toBe('off');
    });

    it('"off" returns off', () => {
      expect(MCLint.getSeverity('off')).toBe('off');
    });

    it('0 returns off', () => {
      expect(MCLint.getSeverity(0)).toBe('off');
    });

    it('"warn" returns warn', () => {
      expect(MCLint.getSeverity('warn')).toBe('warn');
    });

    it('1 returns warn', () => {
      expect(MCLint.getSeverity(1)).toBe('warn');
    });

    it('"error" returns error', () => {
      expect(MCLint.getSeverity('error')).toBe('error');
    });

    it('2 returns error', () => {
      expect(MCLint.getSeverity(2)).toBe('error');
    });

    it('array with severity returns severity', () => {
      expect(MCLint.getSeverity(['warn', 'extra'])).toBe('warn');
      expect(MCLint.getSeverity(['error', ['a', 'b']])).toBe('error');
      expect(MCLint.getSeverity(['off'])).toBe('off');
    });
  });

  describe('getOptions', () => {
    it('undefined returns empty array', () => {
      expect(MCLint.getOptions(undefined)).toEqual([]);
    });

    it('plain severity returns empty array', () => {
      expect(MCLint.getOptions('warn')).toEqual([]);
      expect(MCLint.getOptions('error')).toEqual([]);
      expect(MCLint.getOptions(0)).toEqual([]);
    });

    it('array with only severity returns empty array', () => {
      expect(MCLint.getOptions(['warn'])).toEqual([]);
    });

    it('array with options returns options', () => {
      expect(MCLint.getOptions(['warn', 'pattern'])).toEqual(['pattern']);
      expect(MCLint.getOptions(['error', ['a', 'b'], 'extra'])).toEqual([['a', 'b'], 'extra']);
    });
  });

  describe('isEnabled', () => {
    it('undefined returns false', () => {
      expect(MCLint.isEnabled(undefined)).toBe(false);
    });

    it('"off" returns false', () => {
      expect(MCLint.isEnabled('off')).toBe(false);
    });

    it('"warn" returns true', () => {
      expect(MCLint.isEnabled('warn')).toBe(true);
    });

    it('"error" returns true', () => {
      expect(MCLint.isEnabled('error')).toBe(true);
    });
  });

  describe('createEmpty', () => {
    it('returns object with empty rules', () => {
      const empty = MCLint.createEmpty();
      expect(empty).toEqual({ rules: {} });
    });
  });

  describe('is', () => {
    it('returns true for valid MCLint object', () => {
      expect(MCLint.is({ rules: {} })).toBe(true);
      expect(MCLint.is({ rules: { 'identity.format': 'warn' } })).toBe(true);
    });

    it('returns false for non-objects', () => {
      expect(MCLint.is(null)).toBe(false);
      expect(MCLint.is(undefined)).toBe(false);
      expect(MCLint.is('string')).toBe(false);
      expect(MCLint.is(42)).toBe(false);
    });

    it('returns false when rules is missing or not an object', () => {
      expect(MCLint.is({})).toBe(false);
      expect(MCLint.is({ rules: 'not-an-object' })).toBe(false);
      expect(MCLint.is({ rules: null })).toBe(false);
    });
  });
});
