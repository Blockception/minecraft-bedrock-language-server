import { ProjectItem } from "bc-minecraft-bedrock-project";
import { Definition } from "bc-minecraft-bedrock-types/src/types/definition";
import { MolangDataSetKey } from "bc-minecraft-molang";
import { Errors } from "../..";
import { DiagnosticsBuilder, DiagnosticSeverity, EntityAnimationMolangCarrier, WithMetadata } from "../../../types";
import { forEach } from "../../../utility/references";
import { general_animation_controllers_implementation } from "../../minecraft/animation-controllers";
import { MolangMetadata, User } from "../../molang";

/**
 *
 * @param id
 * @param data
 * @param diagnoser
 */
export function diagnose_animation_controller_implementation(
  id: string,
  user: User,
  diagnoser: WithMetadata<DiagnosticsBuilder, MolangMetadata>,
  definitions: {
    particles?: Definition;
    sounds?: Definition;
  }
): void {
  //Project has animation controllers
  const anim = diagnoser.context.getProjectData().resources.animation_controllers.get(id, diagnoser.project);
  if (anim === undefined) {
    return Errors.missing("resources", "animation_controllers", id, diagnoser);
  }
  if (!ProjectItem.is(anim)) {
    return; // Skip anything but a project defined item
  }
  const controller = anim.item;

  general_animation_controllers_implementation(user, controller, diagnoser);

  //Particle check
  const particles = definitions.particles || {};
  forEach(controller.particles, (particle) => {
    if (particles[particle] !== undefined) return;

    diagnoser.add(
      `animations/${id}`,
      `Animation controller: ${id} uses particle: '${particle}', but no definition has been found`,
      DiagnosticSeverity.warning,
      "resourcepack.particle.missing"
    );
  });

  //Sound check
  const sounds = definitions.sounds || {};
  forEach(controller.sounds, (sound) => {
    if (sounds[sound] !== undefined) return;

    diagnoser.add(
      `animations/${id}`,
      `Animation controller: ${id} uses sound: '${sound}', but no definition has been found`,
      DiagnosticSeverity.warning,
      "resourcepack.sound.missing"
    );
  });
}
