import { BehaviorPack, Defined, Internal, References, ResourcePack, Using } from "bc-minecraft-bedrock-project";
import { Types } from "bc-minecraft-bedrock-types";
import { DiagnosticsBuilder, WithMetadata } from "../../types";
import { MolangMetadata, User } from "../molang/diagnostics";
export type animation_controllers = Internal.BehaviorPack.AnimationControllers | Internal.ResourcePack.AnimationControllers;
export type animation_controller = Internal.BehaviorPack.AnimationController | Internal.ResourcePack.AnimationController;
export type animationsOwner = Types.Identifiable & AnimationCarrier<Pick<References, "defined">>;
/**
 *
 * @param data
 * @param diagnoser
 */
export declare function general_animation_controllers(data: animation_controllers, diagnoser: DiagnosticsBuilder): void;
/**
 *
 * @param controller
 * @param controller_id
 * @param diagnoser
 */
export declare function general_animation_controller(controller_id: string, controller: animation_controller, diagnoser: DiagnosticsBuilder): void;
export type Controller = ResourcePack.AnimationController.AnimationController | BehaviorPack.AnimationController.AnimationController;
export interface AnimationCarrier<T extends Defined | Using> {
    animations: T;
}
export declare function general_animation_controllers_implementation(user: User & Partial<AnimationCarrier<Defined>>, controller: Controller, diagnoser: WithMetadata<DiagnosticsBuilder, MolangMetadata>): void;
