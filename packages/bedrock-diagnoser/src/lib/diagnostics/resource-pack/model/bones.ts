import { DiagnosticSeverity, DiagnosticsBuilder } from "../../../types";

export interface BoneUsage {
  bone_id: string;
  parent_id: string;
}

export function model_bones_must_exist(bones: BoneUsage[], diagnoser: DiagnosticsBuilder) {
  const projectData = diagnoser.context.getProjectData().projectData;

  for (let I = 0; I < bones.length; I++) {
    const bone = bones[I];
    if (bone.bone_id.includes("*")) continue;

    // Find a bone that is not in the project
    if (!projectData.resourcePacks.models.find((m) => m.bones?.defined.has(bone.bone_id))) {
      diagnoser.add(
        `${bone.parent_id}/${bone.bone_id}`,
        `Bone: ${bone.bone_id} does not exist in the project, though animation can work with missing bones`,
        DiagnosticSeverity.warning,
        `resourcepack.model.bone.missing`
      );
    }
  }
}
