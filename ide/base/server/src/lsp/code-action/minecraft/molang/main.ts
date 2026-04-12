import { Diagnostic } from 'vscode-languageserver';
import { CodeActionBuilder } from '../../builder';

import * as Deprecated from './deprecated';
import * as Optimization from './optimization';

export function onCodeAction(builder: CodeActionBuilder, diag: Diagnostic): void {
  switch (diag.code) {
    case 'molang.function.deprecated':
      return Deprecated.onCodeAction(builder, diag);
  }

  if (typeof diag.code === 'string' && diag.code.startsWith('molang.optimization.')) {
    return Optimization.onCodeAction(builder, diag);
  }
}
