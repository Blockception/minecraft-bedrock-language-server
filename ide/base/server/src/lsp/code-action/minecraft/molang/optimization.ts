import { CodeActionKind, Diagnostic, TextEdit } from 'vscode-languageserver';
import { CodeActionBuilder } from '../../builder';

/** The shape of data attached to molang optimization diagnostics */
interface OptimizationData {
  replacement: string;
}

function isOptimizationData(data: unknown): data is OptimizationData {
  return typeof data === 'object' && data !== null && typeof (data as OptimizationData).replacement === 'string';
}

export function onCodeAction(builder: CodeActionBuilder, diag: Diagnostic): void {
  if (!isOptimizationData(diag.data)) return;

  const replacement = diag.data.replacement;

  builder.push({
    title: `Rewrite to: ${replacement}`,
    kind: CodeActionKind.QuickFix,
    diagnostics: [diag],
    isPreferred: true,
    edit: {
      changes: {
        [builder.context.document.uri]: [TextEdit.replace(diag.range, replacement)],
      },
    },
  });
}
