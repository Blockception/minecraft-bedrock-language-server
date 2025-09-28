"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.model_bones_must_exist = model_bones_must_exist;
const types_1 = require("../../../types");
function model_bones_must_exist(bones, diagnoser) {
    const projectData = diagnoser.context.getProjectData().projectData;
    for (let I = 0; I < bones.length; I++) {
        const bone = bones[I];
        if (bone.bone_id.includes("*"))
            continue;
        // Find a bone that is not in the project
        if (!projectData.resourcePacks.models.find((m) => { var _a; return (_a = m.bones) === null || _a === void 0 ? void 0 : _a.defined.has(bone.bone_id); })) {
            diagnoser.add(`${bone.parent_id}/${bone.bone_id}`, `Bone: ${bone.bone_id} does not exist in the project, though animation can work with missing bones`, types_1.DiagnosticSeverity.warning, `resourcepack.model.bone.missing`);
        }
    }
}
//# sourceMappingURL=bones.js.map