import { ParameterInfo } from "bc-minecraft-bedrock-command";
import { Types } from "bc-minecraft-bedrock-types";
import { CompactJson } from "bc-minecraft-bedrock-types/lib/minecraft/json";
import { Selector } from "bc-minecraft-bedrock-types/lib/minecraft/selector";
import { DiagnosticsBuilder } from "../../types";
/**
 *
 * @param pattern
 * @param value
 * @param diagnoser
 * @returns
 */
export declare function minecraft_selector_diagnose(pattern: ParameterInfo, value: Types.OffsetWord, diagnoser: DiagnosticsBuilder): void;
/**
 * Diagnoses a selector attribute
 * @param attribute The attribute to diagnose
 * @param attributes The attributes to diagnose
 * @param selector The selector to diagnose
 * @param diagnoser The diagnoser to use
 * @returns Returns true when the attribute is valid
 */
export declare function minecraft_selector_attribute_diagnose_hard(attribute: string, attributes: CompactJson.IKeyNode[], selector: Selector, diagnoser: DiagnosticsBuilder): boolean;
