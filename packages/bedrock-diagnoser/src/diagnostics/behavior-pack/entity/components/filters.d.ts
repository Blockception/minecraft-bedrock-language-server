import { ComponentBehavior } from 'bc-minecraft-bedrock-types/src/minecraft/components';
import { DiagnosticsBuilder } from '../../../..';
type Container = ComponentBehavior & {
    events?: Record<string, any>;
} & {
    filters?: any;
};
/**
 *
 * @param container
 * @param diagnoser
 * @returns
 */
export declare function behaviorpack_entity_components_filters(container: Container | undefined, diagnoser: DiagnosticsBuilder): void;
export {};
//# sourceMappingURL=filters.d.ts.map