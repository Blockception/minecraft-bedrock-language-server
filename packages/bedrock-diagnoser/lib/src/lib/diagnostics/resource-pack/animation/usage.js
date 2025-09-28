"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resourcepack_animation_used = resourcepack_animation_used;
const animation_1 = require("../../minecraft/animation");
/**
 * Checks if the animations and animation controllers which are defined are used
 * @param data The dataset to check
 * @param diagnoser The diagnoser builder to receive the errors
 */
function resourcepack_animation_used(data, diagnoser) {
    const controllers = diagnoser.context.getProjectData().projectData.resourcePacks.animation_controllers;
    (0, animation_1.minecraft_animation_used)(data, diagnoser, controllers);
}
//# sourceMappingURL=usage.js.map