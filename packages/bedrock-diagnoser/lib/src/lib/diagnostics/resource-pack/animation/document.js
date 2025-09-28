"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.diagnose_animation_document = diagnose_animation_document;
const bc_minecraft_bedrock_project_1 = require("bc-minecraft-bedrock-project");
const types_1 = require("../../../types");
const json_1 = require("../../json/json");
const molang_1 = require("../../molang");
const model_1 = require("../model");
/**Diagnoses the given document as an animation
 * @param doc The text document to diagnose
 * @param diagnoser The diagnoser builder to receive the errors*/
function diagnose_animation_document(diagnoser) {
    const anims = json_1.Json.LoadReport(diagnoser);
    if (!bc_minecraft_bedrock_project_1.Internal.ResourcePack.Animations.is(anims))
        return;
    (0, molang_1.diagnose_molang_syntax_current_document)(diagnoser, anims);
    Object.keys(anims.animations).forEach((anim_id) => {
        if (!anim_id.startsWith("animation."))
            diagnoser.add(anim_id, `Animation name must begin with "animation."`, types_1.DiagnosticSeverity.error, "resourcepack.animation.name");
    });
    const bones = [];
    Object.entries(anims.animations).forEach(([anim_id, anim]) => {
        var _a;
        const length = anim.animation_length;
        Object.entries((_a = anim.bones) !== null && _a !== void 0 ? _a : {}).forEach(([bone_id, bone]) => {
            bones.push({ bone_id, parent_id: anim_id });
            if (typeof length === "number") {
                check_bone_time(`${anim_id}/${bone_id}`, bone, length, diagnoser);
            }
        });
    });
    (0, model_1.model_bones_must_exist)(bones, diagnoser);
}
function check_bone_time(parentid, bone, animation_length, diagnoser) {
    check_bone_property_time(parentid, bone.position, animation_length, diagnoser);
    check_bone_property_time(parentid, bone.rotation, animation_length, diagnoser);
    check_bone_property_time(parentid, bone.scale, animation_length, diagnoser);
}
function check_bone_property_time(parentid, property, animation_length, diagnoser) {
    if (typeof property !== "object")
        return;
    if (Array.isArray(property))
        return;
    for (const k of Object.keys(property)) {
        //Parse as float
        try {
            const time = parseFloat(k);
            if (isNaN(time)) {
                diagnoser.add(k, `Failed to parse time value: ${k}`, types_1.DiagnosticSeverity.error, "general.float.invalid");
            }
            else if (time > animation_length) {
                diagnoser.add(`${parentid}/${k}`, `Time value of bone ${k} is greater than the animation length: ${animation_length}`, types_1.DiagnosticSeverity.error, "resourcepack.animation.time.exceeds");
            }
        }
        catch (err) {
            diagnoser.add(k, `Failed to parse time value: ${k}\n${err}`, types_1.DiagnosticSeverity.error, "general.float.invalid");
        }
    }
}
//# sourceMappingURL=document.js.map