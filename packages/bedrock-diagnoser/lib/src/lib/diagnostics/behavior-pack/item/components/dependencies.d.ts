import { Internal } from "bc-minecraft-bedrock-project";
import { DiagnosticsBuilder } from "../../../../types";
import { Context } from "../../../../utility/components";
/**
 * Checks if components dependencies are present, a component might need others to be present
 * @param item The item to check
 * @param diagnoser The diagnoser to report to*/
export declare function behaviorpack_item_components_dependencies(item: Internal.BehaviorPack.Item, context: Context<Internal.BehaviorPack.Item>, diagnoser: DiagnosticsBuilder): void;
