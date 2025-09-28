"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.anim_or_contr = void 0;
exports.diagnose_animation_or_controller_implementation = diagnose_animation_or_controller_implementation;
exports.is_animation_or_controller = is_animation_or_controller;
const types_1 = require("../../types");
const animation_1 = require("./animation");
const diagnostics_1 = require("./animation-controllers/diagnostics");
/**
 * @param id
 * @param user
 * @param ownerType
 * @param diagnoser
 * @returns
 */
function diagnose_animation_or_controller_implementation(id, user, diagnoser) {
    switch (is_animation_or_controller(id, diagnoser)) {
        case anim_or_contr.animation:
            return (0, animation_1.diagnose_animation_implementation)(id, user, diagnoser);
        case anim_or_contr.controller:
            return (0, diagnostics_1.diagnose_animation_controller_implementation)(id, user, diagnoser);
        case anim_or_contr.neither:
            diagnoser.add(id, `Cannot find animation / animation controller: ${id}`, types_1.DiagnosticSeverity.error, "behaviorpack.animation_or_controller.missing");
    }
}
/** The result of the animation or controller check */
var anim_or_contr;
(function (anim_or_contr) {
    /** the id is an animation */
    anim_or_contr[anim_or_contr["animation"] = 0] = "animation";
    /** the id is an animation controller */
    anim_or_contr[anim_or_contr["controller"] = 1] = "controller";
    /** the id is neither an animation nor an animation controller */
    anim_or_contr[anim_or_contr["neither"] = 2] = "neither";
})(anim_or_contr || (exports.anim_or_contr = anim_or_contr = {}));
/** is an animation or controller.
 * @param id The id of the animation or controller
 * @param diagnoser The diagnostics builder to add the errors to
 * @returns True if animation, false if controller*/
function is_animation_or_controller(id, diagnoser) {
    const bp = diagnoser.context.getProjectData().behaviors;
    if (bp.animations.has(id, diagnoser.project))
        return anim_or_contr.animation;
    if (bp.animation_controllers.has(id, diagnoser.project))
        return anim_or_contr.controller;
    return anim_or_contr.neither;
}
//# sourceMappingURL=anim-or-controller.js.map