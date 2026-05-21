import { DiagnosticSeverity, DocumentDiagnosticsBuilder } from '../../../types';
import { diagnose_mcfunction_commands_document } from './commands';
import { lint_check_mcfunction_naming } from '../../lint';

/**Diagnoses the given document as an mcfunction
 * @param doc The text document to diagnose
 * @param diagnoser The diagnoser builder to receive the errors*/
export function diagnose_mcfunction_document(diagnoser: DocumentDiagnosticsBuilder): void {
  if (diagnoser.document.getText().trim() === '') {
    diagnoser.add(
      0,
      'Empty mcfunction found, minecraft will not load this function',
      DiagnosticSeverity.error,
      'behaviorpack.mcfunction.empty',
    );
  }

  // Lint-check the mcfunction's name (ID derived from its URI)
  const functionId = extractMcfunctionId(diagnoser.document.uri);
  if (functionId !== undefined) {
    lint_check_mcfunction_naming(functionId, diagnoser);
  }

  diagnose_mcfunction_commands_document(diagnoser);
}

/**
 * Extracts the mcfunction ID from the document URI.
 * The ID is the path relative to the `functions/` directory, without the `.mcfunction` extension.
 *
 * @param uri The document URI (e.g. `file:///bp/functions/my_folder/my_function.mcfunction`)
 * @returns The function ID (e.g. `my_folder/my_function`), or `undefined` when it cannot be determined
 */
function extractMcfunctionId(uri: string): string | undefined {
  if (uri.endsWith('.json')) return undefined;

  const index = uri.indexOf('functions');
  if (index < 0) return undefined;

  let id = uri.substring(index + 10).replace(/\\/g, '/');
  id = id.replace(/\.mcfunction$/, '');

  return id || undefined;
}
