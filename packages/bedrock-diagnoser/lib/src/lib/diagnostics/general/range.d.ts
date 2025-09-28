import { Types } from "bc-minecraft-bedrock-types";
import { DiagnosticsBuilder } from "../../types";
/**
 * Diagnoses a range integer value
 * @param value The value to diagnose
 * @param diagnoser The diagnoser to use
 * @param range The accepted range
 * @returns Returns true when the value is valid
 */
export declare function general_range_integer_diagnose(value: Types.OffsetWord, diagnoser: DiagnosticsBuilder, range?: {
    min: number;
    max: number;
}): boolean;
/**
 * Diagnoses a range value
 * @param value The value to diagnose
 * @param diagnoser The diagnoser to use
 * @param range The accepted range
 * @returns Returns true when the value is valid
 */
export declare function general_range_float_diagnose(value: Types.OffsetWord, diagnoser: DiagnosticsBuilder, range?: {
    min: number;
    max: number;
}): boolean;
