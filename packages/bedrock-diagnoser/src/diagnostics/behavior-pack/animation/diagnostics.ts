import { ProjectItem } from "bc-minecraft-bedrock-project";
import { Errors } from "../..";
import { DiagnosticsBuilder, DiagnosticSeverity, WithMetadata } from "../../../types";
import { diagnose_molang_implementation, MolangMetadata, User } from "../../molang/diagnostics";
import { filter_not_defined } from "../../resources/using";

/**
 *
 * @param anim_id The animation id to check if it exists
 * @param user The resource / entity that is using the animation
 * @param diagnoser
 */
export function diagnose_animation_implementation(
  anim_id: string,
  user: User,
  diagnoser: WithMetadata<DiagnosticsBuilder, MolangMetadata>
): void {
  //Project has animation
  const anim = diagnoser.context.getProjectData().behaviors.animations.get(anim_id, diagnoser.project);
  if (anim === undefined) {
    return Errors.missing("behaviors", "animations", anim_id, diagnoser);
  }
  if (!ProjectItem.is(anim)) {
    return; // Skip anything but a project defined item
  }

  diagnose_molang_implementation(user, anim.item, diagnoser);

  // Check if entity events are defined
  const entityEvents = diagnoser.context.getProjectData().projectData.behaviorPacks.entities.get(user.id)?.events;
  for (const undef of filter_not_defined(anim.item.events, entityEvents)) {
    diagnoser.add(
      `${user.id}/${anim.item.id}`,
      `Entity does not have event ${undef}`,
      DiagnosticSeverity.warning,
      "behaviorpack.entity.event.missing"
    );
  }
}
