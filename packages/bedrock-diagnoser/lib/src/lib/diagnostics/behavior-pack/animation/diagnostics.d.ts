import { DiagnosticsBuilder, WithMetadata } from "../../../types";
import { MolangMetadata, User } from "../../molang/diagnostics";
/**
 *
 * @param anim_id The animation id to check if it exists
 * @param user The resource / entity that is using the animation
 * @param diagnoser
 */
export declare function diagnose_animation_implementation(anim_id: string, user: User, diagnoser: WithMetadata<DiagnosticsBuilder, MolangMetadata>): void;
