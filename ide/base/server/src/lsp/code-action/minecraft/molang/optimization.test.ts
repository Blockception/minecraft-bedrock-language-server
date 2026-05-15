import { CodeActionParams, Diagnostic, DiagnosticSeverity, Range } from 'vscode-languageserver';
import { CodeActionBuilder } from '../../builder';
import { onCodeAction } from './optimization';

function positionAt(text: string, offset: number) {
  const lines = text.slice(0, offset).split('\n');
  return { line: lines.length - 1, character: lines[lines.length - 1].length };
}

function rangeFromOffsets(text: string, startOffset: number, endOffset: number): Range {
  return {
    start: positionAt(text, startOffset),
    end: positionAt(text, endOffset),
  };
}

describe('Molang optimization code action', () => {
  it('uses explicit offsets from diagnostic data for replacement range', () => {
    const text = 'v.test=5*3*math.pi;';
    const uri = 'file:///test.json';

    const correctStart = text.indexOf('5*3*math.pi');
    const correctEnd = correctStart + '5*3*math.pi'.length;
    const badStart = text.indexOf('*math');
    const badEnd = badStart + '*math'.length;

    const diag: Diagnostic = {
      range: rangeFromOffsets(text, badStart, badEnd),
      message: 'Can rewrite the operation to...',
      severity: DiagnosticSeverity.Information,
      code: 'molang.optimization.constant-folding',
      data: {
        replacement: '15*math.pi',
        startOffset: correctStart,
        endOffset: correctEnd,
      },
      source: 'mc',
    };

    const params: CodeActionParams = {
      textDocument: { uri },
      range: diag.range,
      context: { diagnostics: [diag] },
    };

    const context = {
      document: {
        uri,
        positionAt: (offset: number) => positionAt(text, offset),
      },
    } as any;
    const builder = new CodeActionBuilder(params, context);

    onCodeAction(builder, diag);

    expect(builder.out).toHaveLength(1);
    const action = builder.out[0] as any;
    expect(action.edit.changes[uri][0].range).toEqual(rangeFromOffsets(text, correctStart, correctEnd));
    expect(action.edit.changes[uri][0].newText).toBe('15*math.pi');
  });
});
