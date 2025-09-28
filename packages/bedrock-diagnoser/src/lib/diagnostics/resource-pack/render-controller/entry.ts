import { Internal } from "bc-minecraft-bedrock-project";
import { DocumentDiagnosticsBuilder } from "../../../types";
import { Json } from "../../json";
import { diagnose_molang_syntax_current_document } from "../../molang";
import { BoneUsage, model_bones_must_exist } from "../model";

/**
 * Diagnoses the given document as a render controller
 * @param doc The text document to diagnose
 * @param diagnoser The diagnoser builder to receive the errors*/
export function Diagnose(diagnoser: DocumentDiagnosticsBuilder): void {
  const model = Json.LoadReport<Internal.ResourcePack.RenderController>(diagnoser);
  if (!Internal.ResourcePack.RenderControllers.is(model)) return;
  diagnose_molang_syntax_current_document(diagnoser, model);

  const bones: BoneUsage[] = [];

  Object.entries(model.render_controllers).forEach(([id, controller]) => {
    controller.part_visibility?.forEach((v) => {
      const key = Object.keys(v)[0];
      if (key) return;

      bones.push({ bone_id: key, parent_id: id });
    });
  });

  model_bones_must_exist(bones, diagnoser);
}
