"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.diagnose_animation_implementation = diagnose_animation_implementation;
const bc_minecraft_bedrock_project_1 = require("bc-minecraft-bedrock-project");
const __1 = require("../..");
const types_1 = require("../../../types");
const molang_1 = require("../../molang");
/**
 *
 * @param id
 * @param user
 * @param ownerType
 * @param diagnoser
 * @param particles
 * @param sounds
 * @returns
 */
function diagnose_animation_implementation(id, user, diagnoser, particles, sounds) {
    //Project has animation
    const anim_item = diagnoser.context.getProjectData().resources.animations.get(id, diagnoser.project);
    if (anim_item === undefined) {
        return __1.Errors.missing("behaviors", "animations", id, diagnoser);
    }
    if (!bc_minecraft_bedrock_project_1.ProjectItem.is(anim_item)) {
        return; // Skip anything but a project defined item
    }
    const anim = anim_item.item;
    (0, molang_1.diagnose_molang_implementation)(user, anim, diagnoser);
    //Particle check
    anim.particles.using.forEach((particle) => {
        if (particles && particles[particle] !== undefined)
            return;
        diagnoser.add(`animations/${id}`, `Animation: ${id} uses particle: '${particle}', but no definition has been found`, types_1.DiagnosticSeverity.warning, "resourcepack.particle.missing");
    });
    //Sound check
    anim.sounds.using.forEach((sound) => {
        if (sounds && sounds[sound] !== undefined)
            return;
        diagnoser.add(`animations/${id}`, `Animation: ${id} uses sound: '${sound}', but no definition has been found`, types_1.DiagnosticSeverity.warning, "resourcepack.sound.missing");
    });
}
//# sourceMappingURL=diagnostics.js.map