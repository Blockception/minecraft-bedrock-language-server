import { OffsetWord } from 'bc-minecraft-bedrock-shared';
import { DiagnosticsBuilder } from '../../types';
/**
 * Diagnoses a range integer value
 * @param value The value to diagnose
 * @param diagnoser The diagnoser to use
 * @param range The accepted range
 * @returns Returns true when the value is valid
 */
export declare function general_range_integer_diagnose(value: OffsetWord, diagnoser: DiagnosticsBuilder, range?: {
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
export declare function general_range_float_diagnose(value: OffsetWord, diagnoser: DiagnosticsBuilder, range?: {
    min: number;
    max: number;
}): boolean;
//# sourceMappingURL=range.d.ts.map