import { ProjectItem } from "bc-minecraft-bedrock-project";
import { Definition } from "bc-minecraft-bedrock-types/lib/types/definition";
import { Errors } from "../..";
import { DiagnosticsBuilder, DiagnosticSeverity, EntityAnimationMolangCarrier, WithMetadata } from "../../../types";
import { diagnose_molang_implementation, MolangMetadata } from "../../molang";

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
export function diagnose_animation_implementation(
  id: string,
  user: EntityAnimationMolangCarrier,
  diagnoser: WithMetadata<DiagnosticsBuilder, MolangMetadata>,
  particles?: Definition,
  sounds?: Definition
): void {
  //Project has animation
  const anim_item = diagnoser.context.getProjectData().resources.animations.get(id, diagnoser.project);
  if (anim_item === undefined) {
    return Errors.missing("behaviors", "animations", id, diagnoser);
  }
  if (!ProjectItem.is(anim_item)) {
    return; // Skip anything but a project defined item
  }
  const anim = anim_item.item;

  diagnose_molang_implementation(user, anim, diagnoser);

  //Particle check
  anim.particles.using.forEach((particle) => {
    if (particles && particles[particle] !== undefined) return;

    diagnoser.add(
      `animations/${id}`,
      `Animation: ${id} uses particle: '${particle}', but no definition has been found`,
      DiagnosticSeverity.warning,
      "resourcepack.particle.missing"
    );
  });

  //Sound check
  anim.sounds.using.forEach((sound) => {
    if (sounds && sounds[sound] !== undefined) return;

    diagnoser.add(
      `animations/${id}`,
      `Animation: ${id} uses sound: '${sound}', but no definition has been found`,
      DiagnosticSeverity.warning,
      "resourcepack.sound.missing"
    );
  });
}
