import { CompactJson } from "bc-minecraft-bedrock-types/lib/minecraft/json";
import { Selector } from "bc-minecraft-bedrock-types/lib/minecraft/selector/selector";
import { DiagnosticsBuilder } from "../../../types";
/**
 * Attribute can only be tested positive once, but can have all the negative tests
 * @param parameters The parameters to check
 * @param selector The selector the parameters are from
 * @param diagnoser The diagnoser to use
 * @returns Returns true if the selector is valid
 */
export declare function selectorattribute_one_positive_all_negatives(parameters: CompactJson.IKeyNode[], selector: Selector, diagnoser: DiagnosticsBuilder): boolean;
/**
 * Checks if the attribute has duplicates tests
 * @param parameters
 * @param selector The selector the parameters are from
 * @param diagnoser
 * @returns
 */
export declare function selectorattribute_duplicate_check(parameters: CompactJson.IKeyNode[], selector: Selector, diagnoser: DiagnosticsBuilder): boolean;
/**
 * No negative tests are allowed
 * @param parameters The parameters to check
 * @param selector The selector the parameters are from
 * @param diagnoser The diagnoser to use
 */
export declare function selectorattribute_no_negatives(parameters: CompactJson.IKeyNode[], selector: Selector, diagnoser: DiagnosticsBuilder): boolean;
