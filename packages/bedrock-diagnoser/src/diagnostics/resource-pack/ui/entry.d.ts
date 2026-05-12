import { DocumentDiagnosticsBuilder } from '../../../types';
/**
 * Diagnoses the given document as a UI definition.
 * Validates JSON structure, reports broken @ inheritance references, and checks
 * that referenced parent elements exist in the indexed UI element collection.
 * @param diagnoser The diagnoser builder to receive the errors
 */
export declare function diagnose_ui_document(diagnoser: DocumentDiagnosticsBuilder): void;
//# sourceMappingURL=entry.d.ts.map