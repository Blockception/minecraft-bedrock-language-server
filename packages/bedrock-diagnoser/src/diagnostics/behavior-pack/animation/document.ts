import { Internal } from 'bc-minecraft-bedrock-project';
import { DiagnosticSeverity, DocumentDiagnosticsBuilder } from '../../../types';
import { Json } from '../../json/json';
import { diagnose_molang_syntax_current_document } from '../../molang';
import { no_other_duplicates } from '../../packs/duplicate-check';
import { json_commandsCheck } from '../mcfunction/commands';

/**Diagnoses the given document as an animation
 * @param doc The text document to diagnose
 * @param diagnoser The diagnoser builder to receive the errors*/
export function diagnose_animation_document(diagnoser: DocumentDiagnosticsBuilder): void {
  const anims = Json.LoadReport<Internal.BehaviorPack.Animations>(diagnoser);
  if (!Internal.BehaviorPack.Animations.is(anims)) return;
  diagnose_molang_syntax_current_document(diagnoser, anims);

  //foreach animation,
  Object.entries(anims.animations).forEach(([id, anim]) => {
    const length = anim.animation_length;

    // check that no other exists with this id
    no_other_duplicates(
      'behaviorpack.animation',
      diagnoser.context.getProjectData().projectData.behaviorPacks.animations,
      id,
      diagnoser,
    );

    //foreach time
    Object.entries(anim.timeline ?? {}).forEach(([time, data]) => {
      json_commandsCheck(data, diagnoser);

      if (length) {
        const temp = Number.parseFloat(time);

        if (temp > length)
          diagnoser.add(
            `${id}/timeline/${time}`,
            'Time specification is outside the animation range',
            DiagnosticSeverity.warning,
            'minecraft.animation.time.range',
          );
      }
    });
  });
}
