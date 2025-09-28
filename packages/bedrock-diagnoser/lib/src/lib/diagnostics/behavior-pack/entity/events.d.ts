import { Internal } from "bc-minecraft-bedrock-project";
import { EntityProperty } from "bc-minecraft-bedrock-project/lib/src/project/behavior-pack/entity";
import { ComponentGroups } from "bc-minecraft-bedrock-types/lib/minecraft/components";
import { DocumentDiagnosticsBuilder } from "../../../types";
type EntityEvent = Internal.BehaviorPack.EntityEvent;
export declare function behaviorpack_entity_check_events(events: Record<string, EntityEvent> | EntityEvent[], diagnoser: DocumentDiagnosticsBuilder, properties: EntityProperty[], component_groups?: ComponentGroups): void;
/**
 *
 * @param event
 * @param diagnoser
 * @param component_groups
 */
export declare function behaviorpack_entity_check_event(event: EntityEvent & {
    filters?: any;
}, event_id: string, diagnoser: DocumentDiagnosticsBuilder, properties: EntityProperty[], component_groups?: ComponentGroups, eventIds?: string[]): void;
export {};
