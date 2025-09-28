import { PackType } from "bc-minecraft-bedrock-project";
import { Types } from "bc-minecraft-bedrock-types";
import { DiagnosticsBuilder, DocumentDiagnosticsBuilder } from "../../types";
export declare function diagnose_language_document(diagnoser: DocumentDiagnosticsBuilder, packType: PackType): void;
/**
 *
 * @param line
 * @param index The line index
 * @param keys
 * @param diagnoser
 * @returns
 */
export declare function minecraft_language_line_diagnose(line: Types.OffsetWord, keys: Map<string, number>, diagnoser: DiagnosticsBuilder, packType: PackType): void;
