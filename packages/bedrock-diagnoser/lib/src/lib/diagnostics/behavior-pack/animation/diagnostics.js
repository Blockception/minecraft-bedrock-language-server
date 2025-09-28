"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.diagnose_animation_implementation = diagnose_animation_implementation;
const bc_minecraft_bedrock_project_1 = require("bc-minecraft-bedrock-project");
const __1 = require("../..");
const types_1 = require("../../../types");
const diagnostics_1 = require("../../molang/diagnostics");
const using_1 = require("../../resources/using");
/**
 *
 * @param anim_id The animation id to check if it exists
 * @param user The resource / entity that is using the animation
 * @param diagnoser
 */
function diagnose_animation_implementation(anim_id, user, diagnoser) {
    var _a;
    //Project has animation
    const anim = diagnoser.context.getProjectData().behaviors.animations.get(anim_id, diagnoser.project);
    if (anim === undefined) {
        return __1.Errors.missing("behaviors", "animations", anim_id, diagnoser);
    }
    if (!bc_minecraft_bedrock_project_1.ProjectItem.is(anim)) {
        return; // Skip anything but a project defined item
    }
    (0, diagnostics_1.diagnose_molang_implementation)(user, anim.item, diagnoser);
    // Check if entity events are defined
    const entityEvents = (_a = diagnoser.context.getProjectData().projectData.behaviorPacks.entities.get(user.id)) === null || _a === void 0 ? void 0 : _a.events;
    for (const undef of (0, using_1.filter_not_defined)(anim.item.events, entityEvents)) {
        diagnoser.add(`${user.id}/${anim.item.id}`, `Entity does not have event ${undef}`, types_1.DiagnosticSeverity.warning, "behaviorpack.entity.event.missing");
    }
}
//# sourceMappingURL=diagnostics.js.map