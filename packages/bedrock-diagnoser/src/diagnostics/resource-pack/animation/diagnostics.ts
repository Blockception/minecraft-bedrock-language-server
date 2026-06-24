import { Definition } from 'bc-minecraft-bedrock-shared';
import { ProjectItem } from 'bc-minecraft-bedrock-project';
import { Errors } from '../..';
import { DiagnosticsBuilder, DiagnosticSeverity, EntityAnimationMolangCarrier, WithMetadata } from '../../../types';
import { diagnose_molang_implementation, MolangMetadata } from '../../molang';

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
  sounds?: Definition,
): void {
  //Project has animation
  const animItem = diagnoser.context.getProjectData().resources.animations.get(id, diagnoser.project);
  if (animItem === undefined) {
    return Errors.missing('behaviors', 'animations', id, diagnoser);
  }
  if (!ProjectItem.is(animItem)) {
    return; // Skip anything but a project defined item
  }
  const anim = animItem.item;

  diagnose_molang_implementation(user, anim, diagnoser);

  //Particle check
  anim.particles.using.forEach((particle) => {
    if (particles && particles[particle] !== undefined) return;

    diagnoser.add(
      `animations/${id}`,
      `Animation: ${id} uses particle: '${particle}', but no definition has been found`,
      DiagnosticSeverity.warning,
      'resourcepack.particle.missing',
    );
  });

  //Sound check
  anim.sounds.using.forEach((sound) => {
    if (sounds && sounds[sound] !== undefined) return;

    diagnoser.add(
      `animations/${id}`,
      `Animation: ${id} uses sound: '${sound}', but no definition has been found`,
      DiagnosticSeverity.warning,
      'resourcepack.sound.missing',
    );
  });
}
