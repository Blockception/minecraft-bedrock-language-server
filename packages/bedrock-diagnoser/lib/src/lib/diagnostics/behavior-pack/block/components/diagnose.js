"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.behaviorpack_diagnose_block_components = behaviorpack_diagnose_block_components;
const types_1 = require("../../../../types");
const checks_1 = require("../../../../utility/components/checks");
const block_culling_1 = require("../../../resource-pack/block-culling");
const diagnose_1 = require("../../../resource-pack/model/diagnose");
const loot_table_1 = require("../../loot-table");
const diagnose_2 = require("../diagnose");
const minecraft_1 = require("bc-minecraft-bedrock-types/lib/minecraft");
const bc_minecraft_bedrock_vanilla_data_1 = require("bc-minecraft-bedrock-vanilla-data");
/**
 *
 * @param container
 * @param context
 * @param diagnoser
 */
function behaviorpack_diagnose_block_components(container, context, diagnoser) {
    (0, checks_1.components_check)(container, context, diagnoser, component_test);
}
const component_test = {
    // deprecated
    "minecraft:aim_collision": deprecated_component("minecraft:selection_box"),
    "minecraft:block_collision": deprecated_component("minecraft:selection_box"),
    "minecraft:block_light_absorption": deprecated_component("minecraft:light_dampening"),
    "minecraft:block_light_emission": deprecated_component("minecraft:light_emission"),
    "minecraft:block_light_filter": deprecated_component("minecraft:light_dampening"),
    "minecraft:breakonpush": deprecated_component(),
    "minecraft:breathability": deprecated_component(),
    "minecraft:creative_category": deprecated_component("description.menu_category"),
    "minecraft:destroy_time": deprecated_component("minecraft:destructible_by_mining"),
    "minecraft:entity_collision": deprecated_component("minecraft:collision_box"),
    "minecraft:explosion_resistance": deprecated_component("minecraft:destructible_by_explosion"),
    "minecraft:immovable": deprecated_component(),
    "minecraft:on_fall_on": deprecated_component("minecraft:custom_components"),
    "minecraft:on_interact": deprecated_component("minecraft:custom_components"),
    "minecraft:on_placed": deprecated_component("minecraft:custom_components"),
    "minecraft:on_player_destroyed": deprecated_component("minecraft:custom_components"),
    "minecraft:on_player_placing": deprecated_component("minecraft:custom_components"),
    "minecraft:on_step_off": deprecated_component("minecraft:custom_components"),
    "minecraft:on_step_on": deprecated_component("minecraft:custom_components"),
    "minecraft:onlypistonpush": deprecated_component(),
    "minecraft:partial_visibility": deprecated_component("minecraft:geometry.bone_visibility"),
    "minecraft:pick_collision": deprecated_component("minecraft:selection_box"),
    "minecraft:preventsjumping": deprecated_component(),
    "minecraft:queued_ticking": deprecated_component("minecraft:custom_components"),
    "minecraft:random_ticking": deprecated_component("minecraft:custom_components"),
    "minecraft:rotation": deprecated_component("minecraft:transformation"),
    "minecraft:unit_cube": deprecated_component("geometry.minecraft:full_block"),
    "minecraft:unwalkable": deprecated_component(),
    // General
    "minecraft:destructible_by_mining": (name, component, context, diagnoser) => {
        var _a;
        const destroyTime = component.seconds_to_destroy;
        if (!destroyTime)
            return;
        (_a = component.item_specific_speeds) === null || _a === void 0 ? void 0 : _a.forEach((specific_speed) => {
            if (specific_speed.destroy_speed && specific_speed.destroy_speed > destroyTime) {
                diagnoser.add(specific_speed.destroy_speed, `Item specific destroy speed ${specific_speed.destroy_speed} cannot be higher than block's destroy time ${destroyTime}`, types_1.DiagnosticSeverity.error, "behaviorpack.block.components.fast_break_speed");
            }
        });
    },
    "minecraft:placement_filter": (name, component, context, diagnoser) => {
        var _a;
        for (const condition of component.conditions) {
            (_a = condition.block_filter) === null || _a === void 0 ? void 0 : _a.map((block) => (typeof block === "string" ? block : ("name" in block ? block.name : undefined))).forEach((block) => { if (typeof block == 'string')
                (0, diagnose_2.is_block_defined)(block, diagnoser); });
        }
    },
    "minecraft:geometry": (name, component, context, diagnoser) => {
        try {
            if (!context.components.includes("minecraft:material_instances") &&
                minecraft_1.FormatVersion.isGreaterOrEqualThan(context.source.format_version, [1, 21, 80]))
                diagnoser.add(name, `"minecraft:geometry" requires "minecraft:material_instances" in format versions >= 1.21.80`, types_1.DiagnosticSeverity.error, "behaviorpack.block.components.material_instances_x_geometry");
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        }
        catch (err) {
            // Leaving empty as the base diagnoser should flag an invalid format version
        }
        if (typeof component === "string") {
            (0, diagnose_1.model_is_defined)(component, diagnoser);
        }
        else if (typeof component === "object") {
            if (component.value)
                (0, diagnose_1.model_is_defined)(component.value, diagnoser);
            if (component.identifier)
                (0, diagnose_1.model_is_defined)(component.identifier, diagnoser);
            if (component.culling && component.identifier)
                (0, block_culling_1.diagnose_block_culling_geo_and_rules)(component.identifier, component.culling, diagnoser);
        }
    },
    "minecraft:loot": (name, component, context, diagnoser) => {
        if (typeof component === "string")
            (0, loot_table_1.behaviorpack_loot_table_diagnose)(component, diagnoser);
    },
    "minecraft:material_instances": (name, component, context, diagnoser) => {
        try {
            if (!context.components.includes("minecraft:geometry") &&
                minecraft_1.FormatVersion.isGreaterOrEqualThan(context.source.format_version, [1, 21, 80]))
                diagnoser.add(name, `"minecraft:material_instances" requires "minecraft:geometry" in format versions >= 1.21.80`, types_1.DiagnosticSeverity.error, "behaviorpack.block.components.material_instances_x_geometry");
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        }
        catch (err) {
            // Leaving empty as the base diagnoser should flag an invalid format version
        }
        Object.keys(component)
            .map((value) => component[value].texture)
            .forEach((textureId) => {
            if (!diagnoser.context
                .getProjectData()
                .projectData.resourcePacks.terrainTextures.find((val) => val.id == textureId) &&
                !bc_minecraft_bedrock_vanilla_data_1.Vanilla.ResourcePack.TextureTerrain.includes(textureId)) {
                diagnoser.add(textureId, `Texture reference "${textureId}" was not defined in terrain_texture.json`, types_1.DiagnosticSeverity.error, "behaviorpack.block.components.texture_not_found");
            }
        });
        if (new Set(Object.keys(component).map(value => component[value].render_method)).size > 1)
            diagnoser.add(name, "Custom blocks were never intended to support multiple different render_method inside this component", types_1.DiagnosticSeverity.error, "behaviorpack.block.components.multiple_render_methods");
    },
    "minecraft:custom_components": (name, component, context, diagnoser) => {
        try {
            if (minecraft_1.FormatVersion.isGreaterThan(context.source.format_version, [1, 21, 90]))
                diagnoser.add(context.source.format_version, `'minecraft:custom_components' is deprecated in versions after 1.21.80`, types_1.DiagnosticSeverity.warning, "behaviorpack.block.components.custom_components_deprecation");
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        }
        catch (err) {
            // Leaving empty as the base diagnoser should flag an invalid format version
        }
    },
    "minecraft:item_visual": (name, component, context, diagnoser) => {
        minimum_version_required(context.source, name, [1, 21, 50], diagnoser);
    },
    "minecraft:liquid_detection": (name, component, context, diagnoser) => {
        minimum_version_required(context.source, name, [1, 21, 50], diagnoser);
    },
    "minecraft:redstone_conductivity": (name, component, context, diagnoser) => {
        minimum_version_required(context.source, name, [1, 21, 30], diagnoser);
    },
    "minecraft:replaceable": (name, component, context, diagnoser) => {
        minimum_version_required(context.source, name, [1, 21, 60], diagnoser);
    },
    "minecraft:movable": (name, component, context, diagnoser) => {
        minimum_version_required(context.source, name, [1, 21, 100], diagnoser);
    },
};
function minimum_version_required(block, name, version, diagnoser) {
    try {
        if (minecraft_1.FormatVersion.isLessThan(block.format_version, version)) {
            diagnoser.add(name, `${name} requires a format version of ${version.join(".")} or greater to use.`, types_1.DiagnosticSeverity.error, "behaviorpack.block.components." + name.split(":")[1]);
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    }
    catch (err) {
        // Leaving empty as the base diagnoser should flag an invalid format version
    }
}
function deprecated_component(replacement) {
    const str = replacement ? ", replace with " + replacement : "";
    return (0, checks_1.component_error)("This component is no longer supported" + str + ". You are recommended to use the latest format version.", "behaviorpack.block.components.deprecated");
}
//# sourceMappingURL=diagnose.js.map