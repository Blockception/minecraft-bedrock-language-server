import { Internal } from "bc-minecraft-bedrock-project";
import { DiagnosticsBuilder } from "../../../../types";
import { Context } from "../../../../utility/components";
/**
 * Checks if components dependencies are present, a component might need others to be present
 * @param block The entity to check
 * @param diagnoser The diagnoser to report to*/
export declare function behaviorpack_block_components_dependencies(block: Internal.BehaviorPack.Block, context: Context<Internal.BehaviorPack.Block>, diagnoser: DiagnosticsBuilder): void;
