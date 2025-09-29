import { tokenize, TokenType } from '../../src/molang/syntax/tokens';
import { valid_syntaxes } from '../data/dataset-valid';

describe('molang - syntax', () => {
  describe('should be able to parse and match the syntax tree generated', () => {
    test.each(valid_syntaxes)('%#. %s', (s) => {
      const n = tokenize(s);
      expect(n.map((item) => `${item.value} ${TokenType[item.type]}`)).toMatchSnapshot();
    });
  });
});
