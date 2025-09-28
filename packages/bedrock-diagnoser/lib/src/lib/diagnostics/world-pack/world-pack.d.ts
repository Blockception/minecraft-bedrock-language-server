import { DocumentDiagnosticsBuilder } from "../../types/diagnostics-builder";
/** The namespace that deals with worldpack diagnostics */
export declare namespace WorldPack {
    /**Processes and diagnoses the given textdocument
     * @param doc The document to process / diagnose
     * @param diagnoser The diagnoser to report to
     * @returns `true` or `false` whenever or not it was succesfull*/
    function diagnose_document(diagnoser: DocumentDiagnosticsBuilder): boolean;
}
