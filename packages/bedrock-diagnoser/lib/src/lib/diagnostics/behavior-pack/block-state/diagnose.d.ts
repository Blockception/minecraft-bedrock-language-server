import { Types } from "bc-minecraft-bedrock-types";
import { DiagnosticsBuilder } from "../../../types";
/** Checks if the blocks exists in the project or in vanilla, if not then a bug is reported
 * @param id
 * @param diagnoser
 * @returns
 */
export declare function behaviorpack_check_blockstates(blockDescriptor: Types.OffsetWord, diagnoser: DiagnosticsBuilder): void;
/**
 *
 * @param blockId
 * @param states
 * @param diagnoser
 */
export declare function behaviorpack_check_command_blockstates(blockId: Types.OffsetWord, states: Types.OffsetWord, diagnoser: DiagnosticsBuilder): void;
