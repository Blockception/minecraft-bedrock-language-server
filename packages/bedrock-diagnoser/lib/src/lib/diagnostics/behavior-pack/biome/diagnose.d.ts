import { DiagnosticsBuilder } from "../../../types";
/**Checks if the biome exists in the project or in vanilla, if not then a bug is reported
 * @param id
 * @param diagnoser
 * @returns
 */
export declare function is_biome_defined(id: string, diagnoser: DiagnosticsBuilder, namespace_required?: boolean): boolean;
