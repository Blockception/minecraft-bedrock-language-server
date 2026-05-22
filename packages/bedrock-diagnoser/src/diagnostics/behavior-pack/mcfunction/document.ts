import { DiagnosticSeverity, DocumentDiagnosticsBuilder } from '../../../types';
import { diagnose_mcfunction_commands_document } from './commands';
import { lint_check_mcfunction_naming } from '../../lint';
import { extractFunctionId } from 'bc-minecraft-bedrock-project/src/project/behavior-pack/mcfunction/process';

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
  const functionId = extractFunctionId(diagnoser.document.uri);
  if (functionId !== undefined) {
    lint_check_mcfunction_naming(functionId, diagnoser);
  }

  diagnose_mcfunction_commands_document(diagnoser);
}
