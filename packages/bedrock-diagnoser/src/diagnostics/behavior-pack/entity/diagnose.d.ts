import { OffsetWord } from 'bc-minecraft-bedrock-shared';
import { Command } from 'bc-minecraft-bedrock-command';
import { Defined } from 'bc-minecraft-bedrock-project';
import { DiagnosticsBuilder } from '../../../types';
/**
 * Checks if the entities exists in the project or in vanilla, if not then a bug is reported
 * @param id The entity to check
 * @param diagnoser The diagnoser
 * @returns True if the entity exists
 */
export declare function behaviorpack_entityid_diagnose(id: OffsetWord | string, diagnoser: DiagnosticsBuilder): boolean;
/**Checks if the entities exists in the project or in vanilla, if not then a bug is reported
 * @param id
 * @param diagnoser
 * @returns
 */
export declare function behaviorpack_entity_spawnegg_diagnose(value: OffsetWord, diagnoser: DiagnosticsBuilder): void;
export declare function behaviorpack_entity_event_diagnose(id: string, path: string, events: Defined | string[] | undefined, diagnoser: DiagnosticsBuilder): void;
/**Checks if the event is defined on the correct entities
 * @param data
 * @param builder
 * @param Com
 */
export declare function command_entity_event_diagnose(data: OffsetWord, diagnoser: DiagnosticsBuilder, Com: Command): void;
//# sourceMappingURL=diagnose.d.ts.map