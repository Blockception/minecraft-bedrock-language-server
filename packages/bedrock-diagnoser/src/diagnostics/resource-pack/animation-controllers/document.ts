import { Internal } from "bc-minecraft-bedrock-project";
import { DocumentDiagnosticsBuilder } from "../../../types";
import { Json } from "../../json/json";
import { general_animation_controllers } from "../../minecraft/animation-controllers";
import { diagnose_molang_syntax_current_document } from "../../molang";

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

  //TODO add rp animation controller diagnostics
}
