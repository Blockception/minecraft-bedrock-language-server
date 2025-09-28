import { Internal } from "bc-minecraft-bedrock-project";
import { DiagnosticsBuilder } from "../../../../types";
import { Context } from "../../../../utility/components";
/**
 * Checks if components dependencies are present, a component might need others to be present
 * @param particle The entity to check
 * @param diagnoser The diagnoser to report to*/
export declare function resourcepack_particle_components_dependencies(particle: Internal.ResourcePack.Particle, context: Context<Internal.ResourcePack.Particle>, diagnoser: DiagnosticsBuilder): void;
