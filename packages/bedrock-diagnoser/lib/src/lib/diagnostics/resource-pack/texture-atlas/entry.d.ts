import { DiagnosticsBuilder, DocumentDiagnosticsBuilder } from "../../../types";
/**Diagnoses the given document as a texture atlas
 * @param doc The text document to diagnose
 * @param diagnoser The diagnoser builder to receive the errors*/
export declare function diagnose_atlas_document(diagnoser: DocumentDiagnosticsBuilder): void;
export declare function texture_files_diagnose(owner: string, file: string, files: string[], diagnoser: DiagnosticsBuilder): void;
