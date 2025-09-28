import { DiagnosticsBuilder } from "../../types";
export type Depended = string | RegExp;
export type DependedMap = Record<string, Depended[]>;
/**
 *
 */
export interface Context<T> {
    /** The object / item that defined or carries the components */
    source: Readonly<T>;
    /** The components used by the source collected from multiple sources */
    components: string[];
}
/**Checks if components dependencies are present, a component might need others to be present
 * @param entity The entity to check
 * @param entity The needed context
 * @param diagnoser The diagnoser to report to*/
export declare function components_dependencies<T>(owner: string, context: Context<T>, diagnoser: DiagnosticsBuilder, component_dependents_all: DependedMap, component_dependents_any: DependedMap): void;
/**The component needs all of the specified needs
 * @param diagnoser
 * @param dependent The component group that is depended on other groups
 * @param needs
 * @param components The list of used components
 * @returns
 */
export declare function checkAll(owner: string, diagnoser: DiagnosticsBuilder, components: string[], dependent: string, ...needs: Depended[]): void;
/**The component needs one of the specified needs
 * @param diagnoser
 * @param dependent The component group that is depended on other groups
 * @param needs
 * @param components The list of used components
 * @returns
 */
export declare function checkAny(owner: string, diagnoser: DiagnosticsBuilder, components: string[], dependent: string, ...needs: Depended[]): void;
