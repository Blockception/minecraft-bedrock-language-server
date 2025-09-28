import { Internal } from "bc-minecraft-bedrock-project";
import { DocumentDiagnosticsBuilder } from "../../../types";
import { Json } from "../../json";
import { general_animation_controllers } from "../../minecraft/animation-controllers";
import { diagnose_molang_syntax_current_document } from "../../molang";
import { no_other_duplicates } from "../../packs/duplicate-check";
import { json_commandsCheck } from "../mcfunction/commands";

/**
 * Diagnoses the given document as an animation controller
 * @param doc The text document to diagnose
 * @param diagnoser The diagnoser builder to receive the errors*/
export function diagnose_animation_controller_document(diagnoser: DocumentDiagnosticsBuilder): void {
  const controllers = Json.LoadReport<Internal.BehaviorPack.AnimationControllers>(diagnoser);
  if (!Internal.BehaviorPack.AnimationControllers.is(controllers)) return;

  diagnose_molang_syntax_current_document(diagnoser, controllers);
  //Transition check
  general_animation_controllers(controllers, diagnoser);

  //foreach animation,
  Object.entries(controllers.animation_controllers).forEach(([id, controller]) => {
    // check that no other exists with this id
    no_other_duplicates(
      "behaviorpack.animation_controllers",
      diagnoser.context.getProjectData().projectData.behaviorPacks.animation_controllers,
      id,
      diagnoser
    );

    Object.values(controller.states).forEach((state) => {
      state.on_entry?.forEach((item) => json_commandsCheck(item, diagnoser));
      state.on_exit?.forEach((item) => json_commandsCheck(item, diagnoser));
    });
  });
}
