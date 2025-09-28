"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.diagnose_animation_document = diagnose_animation_document;
const bc_minecraft_bedrock_project_1 = require("bc-minecraft-bedrock-project");
const types_1 = require("../../../types");
const json_1 = require("../../json/json");
const molang_1 = require("../../molang");
const duplicate_check_1 = require("../../packs/duplicate-check");
const commands_1 = require("../mcfunction/commands");
/**Diagnoses the given document as an animation
 * @param doc The text document to diagnose
 * @param diagnoser The diagnoser builder to receive the errors*/
function diagnose_animation_document(diagnoser) {
    const anims = json_1.Json.LoadReport(diagnoser);
    if (!bc_minecraft_bedrock_project_1.Internal.BehaviorPack.Animations.is(anims))
        return;
    (0, molang_1.diagnose_molang_syntax_current_document)(diagnoser, anims);
    //foreach animation,
    Object.entries(anims.animations).forEach(([id, anim]) => {
        var _a;
        const length = anim.animation_length;
        // check that no other exists with this id
        (0, duplicate_check_1.no_other_duplicates)("behaviorpack.animation", diagnoser.context.getProjectData().projectData.behaviorPacks.animations, id, diagnoser);
        //foreach time
        Object.entries((_a = anim.timeline) !== null && _a !== void 0 ? _a : {}).forEach(([time, data]) => {
            (0, commands_1.json_commandsCheck)(data, diagnoser);
            if (length) {
                const temp = Number.parseFloat(time);
                if (temp > length)
                    diagnoser.add(`${id}/timeline/${time}`, "Time specification is outside the animation range", types_1.DiagnosticSeverity.warning, "minecraft.animation.time.range");
            }
        });
    });
}
//# sourceMappingURL=document.js.map