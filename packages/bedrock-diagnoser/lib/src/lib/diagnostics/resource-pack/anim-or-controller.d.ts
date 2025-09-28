import { Types } from "bc-minecraft-bedrock-types";
import { Definition } from "bc-minecraft-bedrock-types/lib/types/definition";
import { DiagnosticsBuilder, EntityAnimationMolangCarrier, WithMetadata } from "../../types";
import { MolangMetadata } from "../molang";
export declare function animation_or_controller_diagnose_implementation(id: string, user: EntityAnimationMolangCarrier, diagnoser: WithMetadata<DiagnosticsBuilder, MolangMetadata>, particles?: Definition, sounds?: Definition): void;
export declare function animation_or_controller_diagnose(id: Types.OffsetWord, diagnoser: DiagnosticsBuilder): void;
export declare function animation_reference_diagnose(value: Types.OffsetWord, diagnoser: DiagnosticsBuilder): void;
export declare enum anim_or_contr {
    animation = 0,
    controller = 1,
    neither = 2
}
/**
 *
 * @param id
 * @param diagnoser
 * @returns True if animation, false if controller
 */
export declare function is_animation_or_controller(id: string, diagnoser: DiagnosticsBuilder): anim_or_contr;
