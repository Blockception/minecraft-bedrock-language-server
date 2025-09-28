import { DiagnosticsBuilder, DocumentDiagnosticsBuilder } from "../../../types";
/**
 * Diagnoses the given document as a `sound_definitions` file
 * @param doc The text document to diagnose
 * @param diagnoser The diagnoser builder to receive the errors*/
export declare function diagnose_sound_definitions_document(diagnoser: DocumentDiagnosticsBuilder): void;
export declare function sound_files_diagnose(owner: string, file: string, files: string[], diagnoser: DiagnosticsBuilder): void;
