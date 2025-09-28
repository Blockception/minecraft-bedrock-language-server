import { DiagnosticsBuilder } from "../../../types";
import { AnimationUsage } from "../../minecraft/animation";
/**
 * Checks if the animations and animation controllers which are defined are used
 * @param data The dataset to check
 * @param diagnoser The diagnoser builder to receive the errors
 */
export declare function resourcepack_animation_used(data: AnimationUsage, diagnoser: DiagnosticsBuilder): void;
