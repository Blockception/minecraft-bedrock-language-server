import { DiagnosticsBuilder } from "../../../types";
import { AnimationUsage, minecraft_animation_used } from "../../minecraft";

/**
 * Checks if the animations and animation controllers which are defined are used
 * @param data The dataset to check
 * @param diagnoser The diagnoser builder to receive the errors
 */
export function behaviorpack_animation_used(data: AnimationUsage, diagnoser: DiagnosticsBuilder): void {
  const controllers = diagnoser.context.getProjectData().projectData.behaviorPacks.animation_controllers;

  minecraft_animation_used(data, diagnoser, controllers);
}
