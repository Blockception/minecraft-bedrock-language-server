import { Definition } from "bc-minecraft-project";
import { DiagnosticsBuilder } from "../types";
/**Returns if the project has education enabled
 * @param diagnoser The diagnostics builder to add the errors to
 * @returns True if education is enabled, false if not*/
export declare function education_enabled(diagnoser: DiagnosticsBuilder): boolean;
/**Checks if the Definition has the given value, if it has then return `true`, if it also excluded will report it to the diagnoser.
 * If it is neither in defined or excluded then `false` is return
 * @param container The container to check
 * @param value The value to find
 * @param diagnoser The diagnoser to report to
 * @returns false is not found in either exclusion or definitions*/
export declare function check_definition_value(container: Definition | undefined, value: string, diagnoser: DiagnosticsBuilder): boolean;
