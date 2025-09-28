import { Types } from "bc-minecraft-bedrock-types";
import { DiagnosticsBuilder } from "../../types";
export declare function general_integer_diagnose(value: Types.OffsetWord, diagnoser: DiagnosticsBuilder, range?: {
    min: number;
    max: number;
}): boolean;
export declare function general_positive_integer_diagnose(value: Types.OffsetWord, diagnoser: DiagnosticsBuilder): boolean;
