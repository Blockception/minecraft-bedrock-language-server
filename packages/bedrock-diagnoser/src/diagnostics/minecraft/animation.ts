import { BehaviorPack, DataSetConnector, ResourcePack } from 'bc-minecraft-bedrock-project';
import { Script } from 'bc-minecraft-bedrock-project/src/internal/types';
import { Types } from 'bc-minecraft-bedrock-types';
import { Vanilla } from 'bc-minecraft-bedrock-vanilla-data';
import { DiagnosticsBuilder, DiagnosticSeverity } from '../../types';

// Vanilla animations and controllers that aren't played via the typical means; the controllers aren't under scripts.animate and the animations aren't in controllers. Vanilla player stuff so no point in flagging it
const whitelist = [
  'controller.animation.player.base',
  'controller.animation.player.hudplayer',
  'animation.player.look_at_target.inverted',
  'controller.animation.persona.blink',
  'animation.humanoid.fishing_rod',
  'animation.player.first_person.attack_rotation_item',
  'animation.player.first_person.crossbow_hold',
];

export interface AnimationUsage {
  animation_controllers: Types.Definition;
  animations: Types.Definition;
  script: Script;
}

export function minecraft_animation_used(
  data: AnimationUsage,
  diagnoser: DiagnosticsBuilder,
  controllers: Pick<
    DataSetConnector<
      ResourcePack.AnimationController.AnimationController | BehaviorPack.AnimationController.AnimationController,
      ResourcePack.ResourcePack
    >,
    'get'
  >,
): void {
  // Scripts, animation controller use a reference name to an animation
  const refsUsed: Record<string, boolean> = {};
  const { animation_controllers, animations, script } = data;

  const controllersUsed = Object.values(animation_controllers)
    .concat(Object.values(animations))
    .filter((id) => id.startsWith('controller.'));

  // Check against vanilla controllers
  Vanilla.ResourcePack.AnimationControllers.forEach((controller) => {
    if (!controllersUsed.includes(controller.id)) return;
    controller.animations.forEach((anim) => (refsUsed[anim] = true));
  });

  // Animations field is to be used by script and animations controllers
  Types.Definition.forEach(animations, (ref, id) => {
    controllers.get(id)?.animations.using.forEach((anim) => (refsUsed[anim] = true));
  });

  // Script will use animations
  Types.Conditional.forEach(script.animate, (id) => (refsUsed[id] = true));

  // Animation controllers are assumed to be always active
  Types.Definition.forEach(animation_controllers, (ref, id) => {
    refsUsed[ref] = true;

    controllers.get(id)?.animations.using.forEach((anim) => (refsUsed[anim] = true));
  });

  // Check if animations are used
  Types.Definition.forEach(animations, (ref, id) => {
    if (whitelist.includes(id)) return;

    //If the used animations does not contain the referenced animation, then its unused
    if (refsUsed[ref] === true) {
      return;
    }

    diagnoser.add(
      `${ref}/${id}`,
      `Animation: ${id} is not being used, could be removed`,
      DiagnosticSeverity.info,
      `minecraft.animation.unused`,
    );
  });
}
