import { TextDocument as VscodeTextDocument } from 'vscode-languageserver-textdocument';
import { TextDocument } from '../documents/text-document';
import { getOccurrences } from './service';

function createTestDoc(content: string): TextDocument {
  const vscDoc = VscodeTextDocument.create('file:///test.mcfunction', 'bc-mcfunction', 0, content);
  return {
    uri: vscDoc.uri,
    getText: (range?: any) => vscDoc.getText(range),
    positionAt: (offset: number) => vscDoc.positionAt(offset),
    offsetAt: (position: any) => vscDoc.offsetAt(position),
  } as unknown as TextDocument;
}

describe('getOccurrences', () => {
  it('finds every whole-word occurrence', () => {
    const doc = createTestDoc('scoreboard players set @s money 1\nscoreboard players add @s money 5');
    const result = getOccurrences(doc, 'money');

    expect(result).toHaveLength(2);
    expect(result[0]?.range.start).toEqual({ line: 0, character: 26 });
    expect(result[1]?.range.start).toEqual({ line: 1, character: 26 });
  });

  it('does not match substrings inside larger words', () => {
    const doc = createTestDoc('tag @s add foo\ntag @s add foobar');
    const result = getOccurrences(doc, 'foo');

    expect(result).toHaveLength(1);
    expect(result[0]?.range.start).toEqual({ line: 0, character: 11 });
  });

  it('returns nothing for an empty word', () => {
    const doc = createTestDoc('say hi');
    expect(getOccurrences(doc, '')).toEqual([]);
  });
});
