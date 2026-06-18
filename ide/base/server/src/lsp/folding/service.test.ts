import { FoldingRangeKind } from 'vscode-languageserver';
import { TextDocument as VscodeTextDocument } from 'vscode-languageserver-textdocument';
import { TextDocument } from '../documents/text-document';
import { provideMcfunctionFolding } from './service';

function createTestDoc(content: string): TextDocument {
  const vscDoc = VscodeTextDocument.create('file:///test.mcfunction', 'bc-mcfunction', 0, content);
  return {
    uri: vscDoc.uri,
    lineCount: vscDoc.lineCount,
    getLine: (line: number) =>
      vscDoc.getText({ start: { line, character: 0 }, end: { line, character: Number.MAX_VALUE } }),
  } as unknown as TextDocument;
}

describe('provideMcfunctionFolding', () => {
  it('folds blocks of consecutive comments', () => {
    const doc = createTestDoc('# header\n# more info\nsay hi');
    const result = provideMcfunctionFolding(doc);

    expect(result).toEqual([
      { startLine: 0, endLine: 1, kind: FoldingRangeKind.Comment },
    ]);
  });

  it('does not fold a single comment line', () => {
    const doc = createTestDoc('# lonely\nsay hi');
    expect(provideMcfunctionFolding(doc)).toEqual([]);
  });

  it('folds explicit region markers', () => {
    const doc = createTestDoc('#region setup\nsay a\nsay b\n#endregion');
    const result = provideMcfunctionFolding(doc);

    expect(result).toEqual([
      { startLine: 0, endLine: 3, kind: FoldingRangeKind.Region },
    ]);
  });

  it('handles nested region markers', () => {
    const doc = createTestDoc('#region outer\n#region inner\nsay hi\n#endregion\n#endregion');
    const result = provideMcfunctionFolding(doc);

    expect(result).toContainEqual({ startLine: 1, endLine: 3, kind: FoldingRangeKind.Region });
    expect(result).toContainEqual({ startLine: 0, endLine: 4, kind: FoldingRangeKind.Region });
  });
});
