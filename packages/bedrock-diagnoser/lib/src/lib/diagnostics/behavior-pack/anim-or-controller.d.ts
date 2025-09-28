import { References } from "bc-minecraft-bedrock-project";
import { DiagnosticsBuilder, WithMetadata } from "../../types";
import { AnimationCarrier } from "../minecraft/animation-controllers";
import { MolangMetadata, User } from "../molang";
/**
 * @param id
 * @param user
 * @param ownerType
 * @param diagnoser
 * @returns
 */
export declare function diagnose_animation_or_controller_implementation(id: string, user: User & Partial<AnimationCarrier<References>>, diagnoser: WithMetadata<DiagnosticsBuilder, MolangMetadata>): void;
/** The result of the animation or controller check */
export declare enum anim_or_contr {
    /** the id is an animation */
    animation = 0,
    /** the id is an animation controller */
    controller = 1,
    /** the id is neither an animation nor an animation controller */
    neither = 2
}
/** is an animation or controller.
 * @param id The id of the animation or controller
 * @param diagnoser The diagnostics builder to add the errors to
 * @returns True if animation, false if controller*/
export declare function is_animation_or_controller(id: string, diagnoser: DiagnosticsBuilder): anim_or_contr;
