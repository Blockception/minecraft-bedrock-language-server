import { Definition } from "bc-minecraft-bedrock-types/lib/types/definition";
import { DiagnosticsBuilder, EntityAnimationMolangCarrier, WithMetadata } from "../../../types";
import { MolangMetadata } from "../../molang";
/**
 *
 * @param id
 * @param user
 * @param ownerType
 * @param diagnoser
 * @param particles
 * @param sounds
 * @returns
 */
export declare function diagnose_animation_implementation(id: string, user: EntityAnimationMolangCarrier, diagnoser: WithMetadata<DiagnosticsBuilder, MolangMetadata>, particles?: Definition, sounds?: Definition): void;
