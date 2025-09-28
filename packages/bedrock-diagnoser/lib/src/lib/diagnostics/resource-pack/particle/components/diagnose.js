"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resourcepack_diagnose_particle_components = resourcepack_diagnose_particle_components;
const types_1 = require("../../../../types");
const checks_1 = require("../../../../utility/components/checks");
const block_1 = require("../../../behavior-pack/block");
/**
 *
 * @param container
 * @param context
 * @param diagnoser
 */
function resourcepack_diagnose_particle_components(container, context, diagnoser) {
    (0, checks_1.components_check)(container, context, diagnoser, component_test);
}
const component_test = {
    "minecraft:particle_appearance_billboard": (name, component, context, diagnoser) => {
        var _a;
        const flipbook = (_a = component["uv"]) === null || _a === void 0 ? void 0 : _a["flipbook"];
        if (!flipbook)
            return;
        if (flipbook["max_frame"] === undefined)
            diagnoser.add(name + "/uv/flipbook", "Required property 'max_frame' is missing", types_1.DiagnosticSeverity.error, "resourcepack.particle.component.particle_appearance_billboard.max_frame");
    },
    "minecraft:particle_expire_if_in_blocks": (name, component, context, diagnoser) => {
        component.forEach((block) => {
            if (typeof block == "string")
                (0, block_1.is_block_defined)(block, diagnoser);
        });
    },
    "minecraft:particle_expire_if_not_in_blocks": (name, component, context, diagnoser) => {
        component.forEach((block) => {
            if (typeof block == "string")
                (0, block_1.is_block_defined)(block, diagnoser);
        });
    },
    "minecraft:particle_motion_collision": (name, component, context, diagnoser) => {
        if (component.collision_radius === undefined)
            diagnoser.add(name, "Required property 'collision_radius' is missing", types_1.DiagnosticSeverity.error, "resourcepack.particle.component.particle_motion_collision.radius");
    },
};
//# sourceMappingURL=diagnose.js.map