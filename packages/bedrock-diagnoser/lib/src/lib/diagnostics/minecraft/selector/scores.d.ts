import { Selector } from "bc-minecraft-bedrock-types/lib/minecraft/selector";
import { CompactJson } from "bc-minecraft-bedrock-types/lib/minecraft/json";
import { DiagnosticsBuilder } from "../../../types";
/**
 * Diagnoses the scores attribute from a selector
 * @param attr The attribute to diagnose
 * @param diagnoser The diagnoser to use
 */
export declare function selector_scores_diagnose(attr: CompactJson.IKeyNode, sel: Selector, diagnoser: DiagnosticsBuilder): boolean;
