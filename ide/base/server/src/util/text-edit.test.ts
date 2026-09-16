import { TextEdit } from 'vscode-languageserver';
import { Replace, ReplaceRegex } from './text-edit';

describe('Replace', () => {
  test('replaces every occurrence of a literal substring', () => {
    const result: TextEdit[] = [];
    Replace('~+1 ~+2 ~+3', '~+', '~', 0, result);

    expect(result).toHaveLength(3);
    expect(result[0].newText).toBe('~');
  });

  test('does nothing when the substring is not found', () => {
    const result: TextEdit[] = [];
    Replace('~1 ~2 ~3', '~+', '~', 0, result);

    expect(result).toHaveLength(0);
  });
});

describe('ReplaceRegex', () => {
  // Regression test for https://github.com/Blockception/minecraft-bedrock-language-server/issues/673
  // Formatting on save must not strip the "0" from a decimal coordinate like "~0.5".
  const regex = () => /~0(?![.0-9])/g;

  test('strips a redundant "~0" offset', () => {
    const result: TextEdit[] = [];
    ReplaceRegex('execute positioned ~0 ~0 ~0 run say hi', regex(), '~', 0, result);

    expect(result).toHaveLength(3);
    for (const edit of result) {
      expect(edit.newText).toBe('~');
    }
  });

  test('does not touch a decimal coordinate such as ~0.5', () => {
    const result: TextEdit[] = [];
    ReplaceRegex('execute positioned ~0.5 ~1 ~ run say hi', regex(), '~', 0, result);

    expect(result).toHaveLength(0);
  });

  test('does not touch a multi-digit offset such as ~05', () => {
    const result: TextEdit[] = [];
    ReplaceRegex('execute positioned ~05 ~1 ~ run say hi', regex(), '~', 0, result);

    expect(result).toHaveLength(0);
  });

  test('mixes redundant and decimal offsets correctly on the same line', () => {
    const result: TextEdit[] = [];
    const line = 'execute positioned ~0 ~0.5 ~0 run say hi';
    ReplaceRegex(line, regex(), '~', 0, result);

    expect(result).toHaveLength(2);
    expect(line.substring(result[0].range.start.character, result[0].range.end.character)).toBe('~0');
    expect(line.substring(result[1].range.start.character, result[1].range.end.character)).toBe('~0');
  });
});
