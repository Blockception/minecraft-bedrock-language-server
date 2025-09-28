import { DocumentDiagnosticsBuilder } from "../../../types";
/**
 *
 * @param doc
 * @param diagnoser
 */
export declare function diagnose_mcfunction_commands_document(diagnoser: DocumentDiagnosticsBuilder): void;
/**
 *
 * @param prop
 * @param diagnoser
 */
export declare function json_commandsCheck(prop: string | string[], diagnoser: DocumentDiagnosticsBuilder): void;
/**
 *
 * @param commandText
 * @param doc
 * @param diagnoser
 * @returns
 */
export declare function commandsCheck(commandText: string, diagnoser: DocumentDiagnosticsBuilder): void;
