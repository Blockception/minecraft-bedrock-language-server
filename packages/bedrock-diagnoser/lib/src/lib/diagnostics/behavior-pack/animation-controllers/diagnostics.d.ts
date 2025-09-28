import { References } from "bc-minecraft-bedrock-project";
import { DiagnosticsBuilder, WithMetadata } from "../../../types";
import { AnimationCarrier } from "../../minecraft/animation-controllers";
import { MolangMetadata, User } from "../../molang";
/**
 *
 * @param id
 * @param data
 * @param diagnoser
 */
export declare function diagnose_animation_controller_implementation(id: string, user: User & Partial<AnimationCarrier<References>>, diagnoser: WithMetadata<DiagnosticsBuilder, MolangMetadata>): void;
