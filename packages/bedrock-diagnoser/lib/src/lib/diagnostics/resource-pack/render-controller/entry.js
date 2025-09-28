"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Diagnose = Diagnose;
const bc_minecraft_bedrock_project_1 = require("bc-minecraft-bedrock-project");
const json_1 = require("../../json");
const molang_1 = require("../../molang");
const model_1 = require("../model");
/**
 * Diagnoses the given document as a render controller
 * @param doc The text document to diagnose
 * @param diagnoser The diagnoser builder to receive the errors*/
function Diagnose(diagnoser) {
    const model = json_1.Json.LoadReport(diagnoser);
    if (!bc_minecraft_bedrock_project_1.Internal.ResourcePack.RenderControllers.is(model))
        return;
    (0, molang_1.diagnose_molang_syntax_current_document)(diagnoser, model);
    const bones = [];
    Object.entries(model.render_controllers).forEach(([id, controller]) => {
        var _a;
        (_a = controller.part_visibility) === null || _a === void 0 ? void 0 : _a.forEach((v) => {
            const key = Object.keys(v)[0];
            if (key)
                return;
            bones.push({ bone_id: key, parent_id: id });
        });
    });
    (0, model_1.model_bones_must_exist)(bones, diagnoser);
}
//# sourceMappingURL=entry.js.map