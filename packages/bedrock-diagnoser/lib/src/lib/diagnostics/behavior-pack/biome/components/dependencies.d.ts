import { Internal } from "bc-minecraft-bedrock-project";
import { DiagnosticsBuilder } from "../../../../types";
import { Context } from "../../../../utility/components";
/**
 * Checks if components dependencies are present, a component might need others to be present
 * @param biome The entity to check
 * @param diagnoser The diagnoser to report to*/
export declare function behaviorpack_biome_components_dependencies(biome: Internal.BehaviorPack.Biome, context: Context<Internal.BehaviorPack.Biome>, diagnoser: DiagnosticsBuilder): void;
