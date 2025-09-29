import { DocumentDiagnosticsBuilder } from '../../../types';
import { diagnose_molang_syntax_current_document } from '../../molang';

/**
 * Diagnoses the given document as an rp item
 * @param doc The text document to diagnose
 * @param diagnoser The diagnoser builder to receive the errors*/
export function Diagnose(diagnoser: DocumentDiagnosticsBuilder): void {
  diagnose_molang_syntax_current_document(diagnoser);
}
