"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.minecraft_animation_used = minecraft_animation_used;
const bc_minecraft_bedrock_types_1 = require("bc-minecraft-bedrock-types");
const bc_minecraft_bedrock_vanilla_data_1 = require("bc-minecraft-bedrock-vanilla-data");
const types_1 = require("../../types");
// Vanilla animations and controllers that aren't played via the typical means; the controllers aren't under scripts.animate and the animations aren't in controllers. Vanilla player stuff so no point in flagging it
const whitelist = [
    "controller.animation.player.base",
    "controller.animation.player.hudplayer",
    "animation.player.look_at_target.inverted",
    "controller.animation.persona.blink",
    "animation.humanoid.fishing_rod",
    "animation.player.first_person.attack_rotation_item",
    "animation.player.first_person.crossbow_hold",
];
function minecraft_animation_used(data, diagnoser, controllers) {
    // Scripts, animation controller use a reference name to an animation
    const refsUsed = {};
    const { animation_controllers, animations, script } = data;
    const controllersUsed = Object.values(animation_controllers)
        .concat(Object.values(animations))
        .filter((id) => id.startsWith("controller."));
    // Check against vanilla controllers
    bc_minecraft_bedrock_vanilla_data_1.Vanilla.ResourcePack.AnimationControllers.forEach((controller) => {
        if (!controllersUsed.includes(controller.id))
            return;
        controller.animations.forEach((anim) => (refsUsed[anim] = true));
    });
    // Animations field is to be used by script and animations controllers
    bc_minecraft_bedrock_types_1.Types.Definition.forEach(animations, (ref, id) => {
        var _a;
        (_a = controllers.get(id)) === null || _a === void 0 ? void 0 : _a.animations.using.forEach((anim) => (refsUsed[anim] = true));
    });
    // Script will use animations
    bc_minecraft_bedrock_types_1.Types.Conditional.forEach(script.animate, (id) => (refsUsed[id] = true));
    // Animation controllers are assumed to be always active
    bc_minecraft_bedrock_types_1.Types.Definition.forEach(animation_controllers, (ref, id) => {
        var _a;
        refsUsed[ref] = true;
        (_a = controllers.get(id)) === null || _a === void 0 ? void 0 : _a.animations.using.forEach((anim) => (refsUsed[anim] = true));
    });
    // Check if animations are used
    bc_minecraft_bedrock_types_1.Types.Definition.forEach(animations, (ref, id) => {
        if (whitelist.includes(id))
            return;
        //If the used animations does not contain the referenced animation, then its unused
        if (refsUsed[ref] === true) {
            return;
        }
        diagnoser.add(`${ref}/${id}`, `Animation: ${id} is not being used, could be removed`, types_1.DiagnosticSeverity.info, `minecraft.animation.unused`);
    });
}
//# sourceMappingURL=animation.js.map