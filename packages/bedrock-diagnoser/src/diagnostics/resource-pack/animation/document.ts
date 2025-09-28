import { Internal } from "bc-minecraft-bedrock-project";
import { BoneAnimation } from "bc-minecraft-bedrock-project/lib/src/internal/resource-pack";
import { DiagnosticSeverity, DocumentDiagnosticsBuilder } from "../../../types";
import { Json } from "../../json/json";
import { diagnose_molang_syntax_current_document } from "../../molang";
import { BoneUsage, model_bones_must_exist } from "../model";

/**Diagnoses the given document as an animation
 * @param doc The text document to diagnose
 * @param diagnoser The diagnoser builder to receive the errors*/
export function diagnose_animation_document(diagnoser: DocumentDiagnosticsBuilder): void {
  const anims = Json.LoadReport<Internal.ResourcePack.Animations>(diagnoser);
  if (!Internal.ResourcePack.Animations.is(anims)) return;
  diagnose_molang_syntax_current_document(diagnoser, anims);

  Object.keys(anims.animations).forEach((anim_id) => {
    if (!anim_id.startsWith("animation."))
      diagnoser.add(
        anim_id,
        `Animation name must begin with "animation."`,
        DiagnosticSeverity.error,
        "resourcepack.animation.name"
      );
  });

  const bones: BoneUsage[] = [];

  Object.entries(anims.animations).forEach(([anim_id, anim]) => {
    const length = anim.animation_length;

    Object.entries(anim.bones ?? {}).forEach(([bone_id, bone]) => {
      bones.push({ bone_id, parent_id: anim_id });

      if (typeof length === "number") {
        check_bone_time(`${anim_id}/${bone_id}`, bone, length, diagnoser);
      }
    });
  });

  model_bones_must_exist(bones, diagnoser);
}

function check_bone_time(
  parentid: string,
  bone: BoneAnimation,
  animation_length: number,
  diagnoser: DocumentDiagnosticsBuilder
) {
  check_bone_property_time(parentid, bone.position, animation_length, diagnoser);
  check_bone_property_time(parentid, bone.rotation, animation_length, diagnoser);
  check_bone_property_time(parentid, bone.scale, animation_length, diagnoser);
}

type BoneProperties = BoneAnimation["position" | "rotation" | "scale"];

function check_bone_property_time(
  parentid: string,
  property: BoneProperties,
  animation_length: number,
  diagnoser: DocumentDiagnosticsBuilder
) {
  if (typeof property !== "object") return;
  if (Array.isArray(property)) return;

  for (const k of Object.keys(property)) {
    //Parse as float
    try {
      const time = parseFloat(k);
      if (isNaN(time)) {
        diagnoser.add(k, `Failed to parse time value: ${k}`, DiagnosticSeverity.error, "general.float.invalid");
      } else if (time > animation_length) {
        diagnoser.add(
          `${parentid}/${k}`,
          `Time value of bone ${k} is greater than the animation length: ${animation_length}`,
          DiagnosticSeverity.error,
          "resourcepack.animation.time.exceeds"
        );
      }
    } catch (err) {
      diagnoser.add(k, `Failed to parse time value: ${k}\n${err}`, DiagnosticSeverity.error, "general.float.invalid");
    }
  }
}
