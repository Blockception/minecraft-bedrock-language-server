import { Types } from "bc-minecraft-bedrock-types";
import { DiagnosticsBuilder } from "../../../types";
/**
 *
 * @param blockDescriptor
 * @param diagnoser
 */
export declare function behaviorpack_check_blockdescriptor(blockDescriptor: Types.OffsetWord, diagnoser: DiagnosticsBuilder): void;
export declare function behaviorpack_check_blockid_from_descriptor(blockDescriptor: Types.OffsetWord, diagnoser: DiagnosticsBuilder): boolean;
/**Checks if the blocks exists in the project or in vanilla, if not then a bug is reported
 * @param id
 * @param diagnoser
 * @returns
 */
export declare function is_block_defined(id: string, diagnoser: DiagnosticsBuilder): boolean;
