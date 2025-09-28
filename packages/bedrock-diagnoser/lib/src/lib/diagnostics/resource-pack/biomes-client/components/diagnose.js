"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resourcepack_diagnose_biome_components = resourcepack_diagnose_biome_components;
const types_1 = require("../../../../types");
const checks_1 = require("../../../../utility/components/checks");
const diagnose_1 = require("../../fog/diagnose");
const sounds_1 = require("../../sounds");
/**
 *
 * @param container
 * @param context
 * @param diagnoser
 */
function resourcepack_diagnose_biome_components(container, context, diagnoser) {
    (0, checks_1.components_check)(container, context, diagnoser, component_test);
}
const component_test = {
    "minecraft:ambient_sounds": (name, component, context, diagnoser) => {
        if (typeof component.addition === "string")
            (0, sounds_1.diagnose_resourcepack_sound)(component.addition, diagnoser);
        if (typeof component.loop === "string")
            (0, sounds_1.diagnose_resourcepack_sound)(component.loop, diagnoser);
        if (typeof component.mood === "string")
            (0, sounds_1.diagnose_resourcepack_sound)(component.mood, diagnoser);
    },
    "minecraft:water_appearance": (name, component, context, diagnoser) => {
        if (component.surface_color === undefined && component.surface_opacity === undefined)
            diagnoser.add(name, "Component needs at least one property", types_1.DiagnosticSeverity.error, "resourcepack.biome.water_appearance.minimum_properties");
    },
    "minecraft:atmosphere_identifier": (name, component, context, diagnoser) => {
        //TODO
    },
    "minecraft:color_grading_identifier": (name, component, context, diagnoser) => {
        //TODO
    },
    "minecraft:lighting_identifier": (name, component, context, diagnoser) => {
        //TODO
    },
    "minecraft:water_identifier": (name, component, context, diagnoser) => {
        //TODO
    },
    "minecraft:fog_appearance": (name, component, context, diagnoser) => {
        (0, diagnose_1.fog_is_defined)(component.fog_identifier, diagnoser);
    },
};
//# sourceMappingURL=diagnose.js.map