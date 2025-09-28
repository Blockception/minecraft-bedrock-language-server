"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.diagnose_animation_controller_implementation = diagnose_animation_controller_implementation;
const bc_minecraft_bedrock_project_1 = require("bc-minecraft-bedrock-project");
const __1 = require("../..");
const types_1 = require("../../../types");
const references_1 = require("../../../utility/references");
const animation_controllers_1 = require("../../minecraft/animation-controllers");
/**
 *
 * @param id
 * @param data
 * @param diagnoser
 */
function diagnose_animation_controller_implementation(id, user, diagnoser, definitions) {
    //Project has animation controllers
    const anim = diagnoser.context.getProjectData().resources.animation_controllers.get(id, diagnoser.project);
    if (anim === undefined) {
        return __1.Errors.missing("resources", "animation_controllers", id, diagnoser);
    }
    if (!bc_minecraft_bedrock_project_1.ProjectItem.is(anim)) {
        return; // Skip anything but a project defined item
    }
    const controller = anim.item;
    (0, animation_controllers_1.general_animation_controllers_implementation)(user, controller, diagnoser);
    //Particle check
    const particles = definitions.particles || {};
    (0, references_1.forEach)(controller.particles, (particle) => {
        if (particles[particle] !== undefined)
            return;
        diagnoser.add(`animations/${id}`, `Animation controller: ${id} uses particle: '${particle}', but no definition has been found`, types_1.DiagnosticSeverity.warning, "resourcepack.particle.missing");
    });
    //Sound check
    const sounds = definitions.sounds || {};
    (0, references_1.forEach)(controller.sounds, (sound) => {
        if (sounds[sound] !== undefined)
            return;
        diagnoser.add(`animations/${id}`, `Animation controller: ${id} uses sound: '${sound}', but no definition has been found`, types_1.DiagnosticSeverity.warning, "resourcepack.sound.missing");
    });
}
//# sourceMappingURL=diagnostics.js.map