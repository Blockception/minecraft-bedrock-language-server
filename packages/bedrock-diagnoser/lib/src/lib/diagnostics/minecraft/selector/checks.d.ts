import { CompactJson } from "bc-minecraft-bedrock-types/lib/minecraft/json";
import { Selector } from "bc-minecraft-bedrock-types/lib/minecraft/selector";
import { DiagnosticsBuilder } from "../../../types";
/**
 * Checking if the given attribute is the only one.
 * @param attrs The attributes to check
 * @param sel The selector
 * @param diagnoser The diagnoser
 * @returns True if the attribute is the only one, false otherwise
 */
export declare function selectorattributes_no_duplicate(attrs: CompactJson.IKeyNode[], sel: Selector, diagnoser: DiagnosticsBuilder): boolean;
