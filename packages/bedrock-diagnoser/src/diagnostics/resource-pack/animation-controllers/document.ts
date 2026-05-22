import { Internal } from 'bc-minecraft-bedrock-project';
import { DocumentDiagnosticsBuilder } from '../../../types';
import { Json } from '../../json/json';
import { lint_check_animation_controller_naming, lint_check_animation_state_naming } from '../../lint';
import { general_animation_controllers } from '../../minecraft/animation-controllers';
import { diagnose_molang_syntax_current_document } from '../../molang';

/**
 * Diagnoses the given document as an animation controller
 * @param doc The text document to diagnose
 * @param diagnoser The diagnoser builder to receive the errors*/
export function diagnose_animation_controller_document(diagnoser: DocumentDiagnosticsBuilder): void {
  const controllers = Json.LoadReport<Internal.ResourcePack.AnimationControllers>(diagnoser);
  if (!Internal.ResourcePack.AnimationControllers.is(controllers)) return;
  diagnose_molang_syntax_current_document(diagnoser, controllers);

  //Transition check
  general_animation_controllers(controllers, diagnoser);

  // Run configurable lint checks for animation state naming
  Object.entries(controllers.animation_controllers).forEach(([id, controller]) => {
    // Run configurable lint check for animation controller naming
    lint_check_animation_controller_naming(id, diagnoser);

    Object.keys(controller.states).forEach((stateId) => {
      lint_check_animation_state_naming(stateId, diagnoser);
    });
  });
}
