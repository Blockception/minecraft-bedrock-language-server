import { PackType } from 'bc-minecraft-bedrock-project';
import { OffsetWord } from 'bc-minecraft-bedrock-shared';
import { DiagnosticsBuilder, DocumentDiagnosticsBuilder } from '../../types';
export declare function diagnose_language_document(diagnoser: DocumentDiagnosticsBuilder, packType: PackType): void;
/**
 *
 * @param line
 * @param index The line index
 * @param keys
 * @param diagnoser
 * @returns
 */
export declare function minecraft_language_line_diagnose(line: OffsetWord, keys: Map<string, number>, diagnoser: DiagnosticsBuilder, packType: PackType): void;
//# sourceMappingURL=language.d.ts.map