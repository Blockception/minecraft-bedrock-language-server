import { DiagnosticSeverity, DocumentDiagnosticsBuilder } from '../../../types';
import { diagnose_mcfunction_commands_document } from './commands';

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

  diagnose_mcfunction_commands_document(diagnoser);
}
