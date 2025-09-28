import { Context } from "../../../../utility/components";
import { DiagnosticsBuilder } from "../../../../types";
import { Internal } from "bc-minecraft-bedrock-project";
/**Checks if components dependencies are present, a component might need others to be present
 * @param entity The entity to check
 * @param entity The needed context
 * @param diagnoser The diagnoser to report to*/
export declare function behaviorpack_entity_components_dependencies(entity: Internal.BehaviorPack.Entity, context: Context<Internal.BehaviorPack.Entity>, diagnoser: DiagnosticsBuilder): void;
export declare function checkMovements(diagnoser: DiagnosticsBuilder, components: string[], entity: Internal.BehaviorPack.Entity): void;
