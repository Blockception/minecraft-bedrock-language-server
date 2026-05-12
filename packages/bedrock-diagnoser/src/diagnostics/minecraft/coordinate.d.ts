import { CommandInfo, Parameter } from 'bc-minecraft-bedrock-command';
import { OffsetWord } from 'bc-minecraft-bedrock-shared';
import { DiagnosticsBuilder } from '../../types';
export declare function minecraft_coordinate_diagnose(value: OffsetWord, diagnoser: DiagnosticsBuilder): boolean;
/**
 * Validates coordinate groups across all matching overloads.
 * When multiple overloads are provided, the first one with valid coordinate usage is preferred
 * to avoid false positives (e.g. when a name-tag overload would consume a coordinate as a string).
 * @param overloads The matching command overloads to validate against
 * @param commandParams The actual parameters provided in the command
 * @param diagnoser The diagnostics builder
 */
export declare function minecraft_coordinate_set_diagnose(overloads: CommandInfo[], commandParams: Parameter[], diagnoser: DiagnosticsBuilder): void;
//# sourceMappingURL=coordinate.d.ts.map