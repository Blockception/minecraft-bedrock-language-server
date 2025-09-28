import { DocumentDiagnosticsBuilder } from "../../types";
/** The namespace that deals with resourcepack diagnostics */
export declare namespace ResourcePack {
    /**
     * Processes and diagnoses the given textdocument
     * @param doc The document to process / diagnose
     * @param diagnoser The diagnoser to report to
     * @returns `true` or `false` whenever or not it was succesfull */
    function diagnose_document(diagnoser: DocumentDiagnosticsBuilder): boolean;
}
