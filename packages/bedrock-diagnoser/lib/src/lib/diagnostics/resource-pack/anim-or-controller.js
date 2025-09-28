"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.anim_or_contr = void 0;
exports.animation_or_controller_diagnose_implementation = animation_or_controller_diagnose_implementation;
exports.animation_or_controller_diagnose = animation_or_controller_diagnose;
exports.animation_reference_diagnose = animation_reference_diagnose;
exports.is_animation_or_controller = is_animation_or_controller;
const bc_minecraft_bedrock_vanilla_data_1 = require("bc-minecraft-bedrock-vanilla-data");
const types_1 = require("../../types");
const diagnostics_1 = require("./animation-controllers/diagnostics");
const diagnostics_2 = require("./animation/diagnostics");
const whiteList = ["animation.humanoid.fishing_rod"];
function animation_or_controller_diagnose_implementation(id, user, diagnoser, particles, sounds) {
    switch (is_animation_or_controller(id, diagnoser)) {
        case anim_or_contr.animation:
            return (0, diagnostics_2.diagnose_animation_implementation)(id, user, diagnoser, particles, sounds);
        case anim_or_contr.controller:
            return (0, diagnostics_1.diagnose_animation_controller_implementation)(id, user, diagnoser, { particles, sounds });
        case anim_or_contr.neither:
            if (whiteList.includes(id))
                return;
            diagnoser.add(id, `Cannot find animation / animation controller: ${id}`, types_1.DiagnosticSeverity.error, "resourcepack.anim_or_controller.missing");
    }
}
function animation_or_controller_diagnose(id, diagnoser) {
    switch (is_animation_or_controller(id.text, diagnoser)) {
        case anim_or_contr.controller:
        case anim_or_contr.animation:
            return;
        case anim_or_contr.neither:
            diagnoser.add(id, `Cannot find animation / animation controller: ${id}`, types_1.DiagnosticSeverity.error, "resourcepack.anim_or_controller.missing");
            return;
    }
}
function animation_reference_diagnose(value, diagnoser) {
    const data = diagnoser.context.getProjectData().projectData;
    const id = value.text;
    //Project in entity
    if (data.resourcePacks.entities.find((entity) => entity.animations.defined.has(id)) !== undefined) {
        return;
    }
    if (data.resourcePacks.animations.find((anim) => anim.id === id) !== undefined) {
        return;
    }
    if (data.resourcePacks.animation_controllers.find((anim) => anim.id === id) !== undefined) {
        return;
    }
    //Vanilla?
    if (bc_minecraft_bedrock_vanilla_data_1.MinecraftData.vanilla.ResourcePack.entities.some((entity) => entity.animations.includes(id))) {
        return;
    }
    if (bc_minecraft_bedrock_vanilla_data_1.MinecraftData.vanilla.ResourcePack.animations.some((anim) => anim.id === id)) {
        return;
    }
    if (bc_minecraft_bedrock_vanilla_data_1.MinecraftData.vanilla.ResourcePack.animation_controllers.some((anim) => anim.id === id)) {
        return;
    }
    diagnoser.add(value, `Cannot find animation / animation controller: ${value.text}`, types_1.DiagnosticSeverity.error, "resourcepack.anim_or_controller.missing");
}
var anim_or_contr;
(function (anim_or_contr) {
    anim_or_contr[anim_or_contr["animation"] = 0] = "animation";
    anim_or_contr[anim_or_contr["controller"] = 1] = "controller";
    anim_or_contr[anim_or_contr["neither"] = 2] = "neither";
})(anim_or_contr || (exports.anim_or_contr = anim_or_contr = {}));
/**
 *
 * @param id
 * @param diagnoser
 * @returns True if animation, false if controller
 */
function is_animation_or_controller(id, diagnoser) {
    const rp = diagnoser.context.getProjectData().resources;
    if (rp.animations.has(id, diagnoser.project))
        return anim_or_contr.animation;
    if (rp.animation_controllers.has(id, diagnoser.project))
        return anim_or_contr.controller;
    return anim_or_contr.neither;
}
//# sourceMappingURL=anim-or-controller.js.map