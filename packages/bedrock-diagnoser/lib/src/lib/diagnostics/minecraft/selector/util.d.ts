import { CompactJson } from "bc-minecraft-bedrock-types/lib/minecraft/json";
import { Selector } from "bc-minecraft-bedrock-types/lib/minecraft/selector";
import { OffsetWord } from "bc-minecraft-bedrock-types/lib/types";
import { DiagnosticsBuilder } from "../../../types";
export type diagnoseAttribute = (attribute: CompactJson.IKeyNode, sel: Selector, diagnoser: DiagnosticsBuilder) => boolean;
export type diagnoseAttributes = (attributes: CompactJson.IKeyNode[], sel: Selector, diagnoser: DiagnosticsBuilder) => boolean;
/**
 *
 * @param fn
 * @returns
 */
export declare function all(...fn: diagnoseAttributes[]): diagnoseAttributes;
export declare function forEach(fn: diagnoseAttribute): diagnoseAttributes;
export declare function must_offset_word(fn: (value: OffsetWord, diagnoser: DiagnosticsBuilder) => boolean): diagnoseAttributes;
