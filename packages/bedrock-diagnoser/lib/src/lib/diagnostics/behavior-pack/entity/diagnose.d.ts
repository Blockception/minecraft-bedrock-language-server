import { Command } from "bc-minecraft-bedrock-command";
import { Types } from "bc-minecraft-bedrock-types";
import { DiagnosticsBuilder } from "../../../types";
import { Defined } from "bc-minecraft-bedrock-project";
/**
 * Checks if the entities exists in the project or in vanilla, if not then a bug is reported
 * @param id The entity to check
 * @param diagnoser The diagnoser
 * @returns True if the entity exists
 */
export declare function behaviorpack_entityid_diagnose(id: Types.OffsetWord | string, diagnoser: DiagnosticsBuilder): boolean;
/**Checks if the entities exists in the project or in vanilla, if not then a bug is reported
 * @param id
 * @param diagnoser
 * @returns
 */
export declare function behaviorpack_entity_spawnegg_diagnose(value: Types.OffsetWord, diagnoser: DiagnosticsBuilder): void;
export declare function behaviorpack_entity_event_diagnose(id: string, path: string, events: Defined | string[] | undefined, diagnoser: DiagnosticsBuilder): void;
/**Checks if the event is defined on the correct entities
 * @param data
 * @param builder
 * @param Com
 */
export declare function command_entity_event_diagnose(data: Types.OffsetWord, diagnoser: DiagnosticsBuilder, Com: Command): void;
