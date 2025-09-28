import { DocumentDiagnosticsBuilder } from "../../../types";
/**
 * Diagnoses the given document as a render controller
 * @param doc The text document to diagnose
 * @param diagnoser The diagnoser builder to receive the errors*/
export declare function Diagnose(diagnoser: DocumentDiagnosticsBuilder): void;
