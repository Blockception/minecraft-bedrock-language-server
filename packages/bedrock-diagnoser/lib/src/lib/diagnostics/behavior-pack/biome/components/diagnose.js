"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.behaviorpack_diagnose_biome_components = behaviorpack_diagnose_biome_components;
const types_1 = require("../../../../types");
const checks_1 = require("../../../../utility/components/checks");
const block_1 = require("../../block");
const diagnose_1 = require("../diagnose");
/**
 *
 * @param container
 * @param context
 * @param diagnoser
 */
function behaviorpack_diagnose_biome_components(container, context, diagnoser) {
    (0, checks_1.components_check)(container, context, diagnoser, component_test);
}
const component_test = {
    "minecraft:surface_parameters": deprecated_component("minecraft:surface_builder"),
    "minecraft:frozen_ocean_surface": deprecated_component("minecraft:surface_builder"),
    "minecraft:mesa_surface": deprecated_component("minecraft:surface_builder"),
    "minecraft:swamp_surface": deprecated_component("minecraft:surface_builder"),
    "minecraft:the_end_surface": deprecated_component("minecraft:surface_builder"),
    "minecraft:climate": (name, component, context, diagnoser) => {
        const particles = ["ash", "blue_spores", "red_spores", "white_ash"];
        Object.keys(component).forEach(key => {
            if (particles.includes(key))
                diagnoser.add(key, "This capability has been moved to the client_biome.json", types_1.DiagnosticSeverity.error, "behaviorpack.biome.components.climate.particles");
        });
    },
    "minecraft:overworld_generation_rules": (name, component, context, diagnoser) => {
        if (!context.source['minecraft:biome'].description.identifier.startsWith('minecraft:'))
            return (0, checks_1.component_error)("Pre Caves and cliffs components do nothing with biome generation and will return a content error when used in custom biomes", "behaviorpack.biome.components.pre_1.17_component");
    },
    "minecraft:multinoise_generation_rules": (name, component, context, diagnoser) => {
        if (!context.source['minecraft:biome'].description.identifier.startsWith('minecraft:'))
            return (0, checks_1.component_error)("Pre Caves and cliffs components do nothing with biome generation and will return a content error when used in custom biomes", "behaviorpack.biome.components.pre_1.17_component");
    },
    "minecraft:surface_builder": (name, component, context, diagnoser) => {
        const builder = component.builder;
        const properties = ["sea_floor_material", "foundation_material", "mid_material", "top_material", "sea_material"];
        properties.forEach(key => {
            if (typeof builder[key] === 'string')
                (0, block_1.is_block_defined)(builder[key], diagnoser);
        });
    },
    "minecraft:replace_biomes": (name, component, context, diagnoser) => {
        if (Array.isArray(component.replacements))
            component.replacements.forEach((entry) => {
                entry.targets.forEach((id) => {
                    (0, diagnose_1.is_biome_defined)(id, diagnoser, true); // TODO: Is this limited to replacing vanilla biomes only?
                });
            });
    }
};
function deprecated_component(replacement) {
    const str = replacement ? ", replace with " + replacement : "";
    return (0, checks_1.component_error)(`This component is no longer supported${str}. You are recommended to use the latest format version.`, "behaviorpack.biome.components.deprecated");
}
//# sourceMappingURL=diagnose.js.map