"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.behaviorpack_animation_used = behaviorpack_animation_used;
const minecraft_1 = require("../../minecraft");
/**
 * Checks if the animations and animation controllers which are defined are used
 * @param data The dataset to check
 * @param diagnoser The diagnoser builder to receive the errors
 */
function behaviorpack_animation_used(data, diagnoser) {
    const controllers = diagnoser.context.getProjectData().projectData.behaviorPacks.animation_controllers;
    (0, minecraft_1.minecraft_animation_used)(data, diagnoser, controllers);
}
//# sourceMappingURL=usage.js.map