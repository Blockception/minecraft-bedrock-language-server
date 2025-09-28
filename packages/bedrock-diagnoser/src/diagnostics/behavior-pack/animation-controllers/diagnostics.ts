import { ProjectItem, References } from "bc-minecraft-bedrock-project";
import { Errors } from "../..";
import { DiagnosticsBuilder, DiagnosticSeverity, WithMetadata } from "../../../types";
import { AnimationCarrier, general_animation_controllers_implementation } from "../../minecraft/animation-controllers";
import { MolangMetadata, User } from "../../molang";
import { filter_not_defined } from "../../resources/using";

/**
 *
 * @param id
 * @param data
 * @param diagnoser
 */
export function diagnose_animation_controller_implementation(
  id: string,
  user: User & Partial<AnimationCarrier<References>>,
  diagnoser: WithMetadata<DiagnosticsBuilder, MolangMetadata>
): void {
  //Project has animation controller
  const anim = diagnoser.context.getProjectData().behaviors.animation_controllers.get(id, diagnoser.project);
  if (anim === undefined) {
    return Errors.missing("behaviors", "animation_controllers", id, diagnoser);
  }
  if (!ProjectItem.is(anim)) {
    return; // Skip anything but a project defined item
  }

  const entityEvents = diagnoser.context.getProjectData().projectData.behaviorPacks.entities.get(user.id)?.events;
  for (const undef of filter_not_defined(anim.item.events, entityEvents)) {
    diagnoser.add(
      `${user.id}/${anim.item.id}`,
      `Entity does not have event ${undef}`,
      DiagnosticSeverity.warning,
      "behaviorpack.entity.event.missing"
    );
  }

  general_animation_controllers_implementation(user, anim.item, diagnoser);
}
