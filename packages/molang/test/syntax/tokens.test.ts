import { MolangSyntaxError } from '../../src/molang/syntax/errors';
import { tokenize, TokenType } from '../../src/molang/syntax/tokens';
import { valid_syntaxes } from '../data/dataset-valid';

describe('molang - syntax', () => {
  describe('should be able to parse and match the syntax tree generated', () => {
    test.each(valid_syntaxes)('%#. %s', (s) => {
      const n = tokenize(s);
      expect(n.map((item) => `${item.value} ${TokenType[item.type]}`)).toMatchSnapshot();
    });
  });

  describe('should throw a MolangSyntaxError for malformed input', () => {
    test('unterminated string literal (missing closing quote)', () => {
      const input = "q.all_tags('minecraft:is_tool', 'minecraft:is_pickaxe)";
      expect(() => tokenize(input)).toThrow(MolangSyntaxError);
      try {
        tokenize(input);
      } catch (err) {
        expect(err).toBeInstanceOf(MolangSyntaxError);
        const syntaxError = err as MolangSyntaxError;
        expect(syntaxError.code).toBe('error.string.unterminated');
        expect(syntaxError.message).toContain('missing its closing single quote');
        expect(syntaxError.message).toContain("Add a ' where the text should end");
        // Points at the start of the unterminated string, not the end of input.
        expect(syntaxError.position).toBe(input.indexOf("'minecraft:is_pickaxe"));
      }
    });

    test('unterminated double-quoted string literal', () => {
      const input = 'q.all_tags("minecraft:is_tool)';
      expect(() => tokenize(input)).toThrow(MolangSyntaxError);
      try {
        tokenize(input);
      } catch (err) {
        const syntaxError = err as MolangSyntaxError;
        expect(syntaxError.code).toBe('error.string.unterminated');
        expect(syntaxError.message).toContain('missing its closing double quote');
      }
    });

    test('unexpected character', () => {
      const input = 'q.foo @ q.bar';
      expect(() => tokenize(input)).toThrow(MolangSyntaxError);
      try {
        tokenize(input);
      } catch (err) {
        const syntaxError = err as MolangSyntaxError;
        expect(syntaxError).toBeInstanceOf(MolangSyntaxError);
        expect(syntaxError.code).toBe('error.character.unexpected');
        expect(syntaxError.message).toContain("doesn't recognize the character '@'");
      }
    });
  });
});
