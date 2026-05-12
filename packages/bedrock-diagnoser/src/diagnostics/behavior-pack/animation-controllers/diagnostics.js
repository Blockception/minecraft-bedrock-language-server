"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.diagnose_animation_controller_implementation = diagnose_animation_controller_implementation;
const bc_minecraft_bedrock_project_1 = require("bc-minecraft-bedrock-project");
const __1 = require("../..");
const types_1 = require("../../../types");
const animation_controllers_1 = require("../../minecraft/animation-controllers");
const using_1 = require("../../resources/using");
/**
 *
 * @param id
 * @param data
 * @param diagnoser
 */
function diagnose_animation_controller_implementation(id, user, diagnoser) {
    //Project has animation controller
    const anim = diagnoser.context.getProjectData().behaviors.animationControllers.get(id, diagnoser.project);
    if (anim === undefined) {
        return __1.Errors.missing('behaviors', 'animationControllers', id, diagnoser);
    }
    if (!bc_minecraft_bedrock_project_1.ProjectItem.is(anim)) {
        return; // Skip anything but a project defined item
    }
    const entityEvents = diagnoser.context.getProjectData().projectData.behaviorPacks.entities.get(user.id)?.events;
    for (const undef of (0, using_1.filter_not_defined)(anim.item.events, entityEvents)) {
        diagnoser.add(`${user.id}/${anim.item.id}`, `Entity does not have event ${undef}`, types_1.DiagnosticSeverity.warning, 'behaviorpack.entity.event.missing');
    }
    (0, animation_controllers_1.general_animation_controllers_implementation)(user, anim.item, diagnoser);
}
//# sourceMappingURL=diagnostics.js.map