import { CodeActionKind, Diagnostic, TextEdit } from 'vscode-languageserver';
import { CodeActionBuilder } from '../../builder';

/** The shape of data attached to molang optimization diagnostics */
interface OptimizationData {
  replacement: string;
  startOffset?: number;
  endOffset?: number;
}

function isOptimizationData(data: unknown): data is OptimizationData {
  return typeof data === 'object' && data !== null && typeof (data as OptimizationData).replacement === 'string';
}

export function onCodeAction(builder: CodeActionBuilder, diag: Diagnostic): void {
  if (!isOptimizationData(diag.data)) return;

  const { replacement, startOffset, endOffset } = diag.data;
  const hasOffsetRange = typeof startOffset === 'number' && typeof endOffset === 'number' && endOffset >= startOffset;
  const editRange = hasOffsetRange
    ? {
        start: builder.context.document.positionAt(startOffset),
        end: builder.context.document.positionAt(endOffset),
      }
    : diag.range;

  builder.push({
    title: `Rewrite to: ${replacement}`,
    kind: CodeActionKind.QuickFix,
    diagnostics: [diag],
    isPreferred: true,
    edit: {
      changes: {
        [builder.context.document.uri]: [TextEdit.replace(editRange, replacement)],
      },
    },
  });
}
