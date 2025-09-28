"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.behaviorpack_diagnose_entity_components = behaviorpack_diagnose_entity_components;
const minecraft_1 = require("bc-minecraft-bedrock-types/lib/minecraft");
const types_1 = require("../../../../types");
const checks_1 = require("../../../../utility/components/checks");
const minecraft_2 = require("../../../minecraft");
const filter_1 = require("../../../minecraft/filter");
const sounds_1 = require("../../../resource-pack/sounds");
const block_1 = require("../../block");
const item_1 = require("../../item");
const loot_table_1 = require("../../loot-table");
const diagnose_1 = require("../diagnose");
const filters_1 = require("./filters");
const loot_1 = require("./loot");
const trade_1 = require("./trade");
//TODO: Filters for entity_types
/**
 *
 * @param container
 * @param context
 * @param diagnoser
 */
function behaviorpack_diagnose_entity_components(container, context, diagnoser) {
    (0, checks_1.components_check)(container, context, diagnoser, component_test);
    (0, filters_1.behaviorpack_entity_components_filters)(container, diagnoser);
}
const component_test = {
    // Deprecated
    "minecraft:behavior.enderman_leave_block": deprecated_component("minecraft:behavior.place_block"),
    "minecraft:behavior.enderman_take_block": deprecated_component("minecraft:behavior.take_block"),
    "minecraft:body_rotation_axis_aligned": deprecated_component("minecraft:rotation_axis_aligned"),
    // Checks
    "minecraft:behavior.admire_item": (name, component, context, diagnoser) => {
        diagnose_event_trigger(name, component.on_admire_item_start, context.source["minecraft:entity"].description.identifier, diagnoser);
        diagnose_event_trigger(name, component.on_admire_item_stop, context.source["minecraft:entity"].description.identifier, diagnoser);
    },
    "minecraft:behavior.avoid_block": (name, component, context, diagnoser) => {
        var _a;
        diagnose_event_trigger(name, component.on_escape, context.source["minecraft:entity"].description.identifier, diagnoser);
        (_a = component === null || component === void 0 ? void 0 : component.target_blocks) === null || _a === void 0 ? void 0 : _a.forEach((block) => (0, block_1.is_block_defined)(block, diagnoser));
    },
    "minecraft:behavior.avoid_mob_type": (name, component, context, diagnoser) => {
        diagnose_event_trigger(name, component.on_escape_event, context.source["minecraft:entity"].description.identifier, diagnoser);
    },
    "minecraft:behavior.beg": (name, component, context, diagnoser) => {
        var _a;
        (_a = component === null || component === void 0 ? void 0 : component.items) === null || _a === void 0 ? void 0 : _a.forEach((item) => (0, item_1.behaviorpack_item_diagnose)((0, minecraft_2.minecraft_get_item)(item, diagnoser.document), diagnoser));
    },
    "minecraft:behavior.celebrate": (name, component, context, diagnoser) => {
        diagnose_event_trigger(name, component.on_celebration_end_event, context.source["minecraft:entity"].description.identifier, diagnoser);
    },
    "minecraft:behavior.celebrate_survive": (name, component, context, diagnoser) => {
        diagnose_event_trigger(name, component.on_celebration_end_event, context.source["minecraft:entity"].description.identifier, diagnoser);
    },
    "minecraft:behavior.charge_held_item": (name, component, context, diagnoser) => {
        var _a;
        (_a = component === null || component === void 0 ? void 0 : component.items) === null || _a === void 0 ? void 0 : _a.forEach((item) => (0, item_1.behaviorpack_item_diagnose)((0, minecraft_2.minecraft_get_item)(item, diagnoser.document), diagnoser));
    },
    "minecraft:behavior.croak": (name, component, context, diagnoser) => {
        (0, filter_1.minecraft_diagnose_filters)(component.filters, diagnoser);
    },
    "minecraft:behavior.defend_trusted_target": (name, component, context, diagnoser) => {
        diagnose_event_trigger(name, component.on_defend_start, context.source["minecraft:entity"].description.identifier, diagnoser);
    },
    "minecraft:behavior.delayed_attack": (name, component, context, diagnoser) => {
        diagnose_event_trigger(name, component.on_attack, context.source["minecraft:entity"].description.identifier, diagnoser);
    },
    "minecraft:behavior.dig": (name, component, context, diagnoser) => {
        //TODO: Check if requires warden runtime
        diagnose_event_trigger(name, component.on_start, context.source["minecraft:entity"].description.identifier, diagnoser);
    },
    "minecraft:behavior.dragonchargeplayer": (name, component, context, diagnoser) => {
        can_only_be_used_by_specific_mob(name, context, diagnoser, "minecraft:ender_dragon");
    },
    "minecraft:behavior.dragondeath": (name, component, context, diagnoser) => {
        can_only_be_used_by_specific_mob(name, context, diagnoser, "minecraft:ender_dragon");
    },
    "minecraft:behavior.dragonflaming": (name, component, context, diagnoser) => {
        can_only_be_used_by_specific_mob(name, context, diagnoser, "minecraft:ender_dragon");
    },
    "minecraft:behavior.dragonholdingpattern": (name, component, context, diagnoser) => {
        can_only_be_used_by_specific_mob(name, context, diagnoser, "minecraft:ender_dragon");
    },
    "minecraft:behavior.dragonlanding": (name, component, context, diagnoser) => {
        can_only_be_used_by_specific_mob(name, context, diagnoser, "minecraft:ender_dragon");
    },
    "minecraft:behavior.dragonscanning": (name, component, context, diagnoser) => {
        can_only_be_used_by_specific_mob(name, context, diagnoser, "minecraft:ender_dragon");
    },
    "minecraft:behavior.dragonstrafeplayer": (name, component, context, diagnoser) => {
        can_only_be_used_by_specific_mob(name, context, diagnoser, "minecraft:ender_dragon");
    },
    "minecraft:behavior.dragontakeoff": (name, component, context, diagnoser) => {
        can_only_be_used_by_specific_mob(name, context, diagnoser, "minecraft:ender_dragon");
    },
    "minecraft:behavior.drink_milk": (name, component, context, diagnoser) => {
        (0, filter_1.minecraft_diagnose_filters)(component.filters, diagnoser);
    },
    "minecraft:behavior.drink_potion": (name, component, context, diagnoser) => {
        var _a;
        (_a = component === null || component === void 0 ? void 0 : component.potions) === null || _a === void 0 ? void 0 : _a.forEach((obj) => (0, filter_1.minecraft_diagnose_filters)(obj.filters, diagnoser));
    },
    "minecraft:behavior.drop_item_for": (name, component, context, diagnoser) => {
        if (typeof component.loot_table === "string") {
            (0, loot_table_1.behaviorpack_loot_table_diagnose)(component.loot_table, diagnoser);
        }
        diagnose_event_trigger(name, component.on_drop_attempt, context.source["minecraft:entity"].description.identifier, diagnoser);
    },
    "minecraft:behavior.eat_block": (name, component, context, diagnoser) => {
        var _a;
        (_a = component === null || component === void 0 ? void 0 : component.eat_and_replace_block_pairs) === null || _a === void 0 ? void 0 : _a.forEach((obj) => {
            if (obj.eat_block)
                (0, block_1.is_block_defined)(obj.eat_block, diagnoser);
            if (obj.replace_block)
                (0, block_1.is_block_defined)(obj.replace_block, diagnoser);
        });
        diagnose_event_trigger(name, component.on_eat, context.source["minecraft:entity"].description.identifier, diagnoser);
    },
    "minecraft:behavior.eat_mob": (name, component, context, diagnoser) => {
        if (typeof component.loot_table === "string")
            (0, loot_table_1.behaviorpack_loot_table_diagnose)(component.loot_table, diagnoser);
    },
    "minecraft:behavior.emerge": (name, component, context, diagnoser) => {
        diagnose_event_trigger(name, component.on_done, context.source["minecraft:entity"].description.identifier, diagnoser);
    },
    "minecraft:behavior.fire_at_target": (name, component, context, diagnoser) => {
        (0, filter_1.minecraft_diagnose_filters)(component.filters, diagnoser);
        if (typeof component.projectile_def === "string")
            (0, diagnose_1.behaviorpack_entityid_diagnose)(component.projectile_def, diagnoser);
    },
    "minecraft:behavior.go_and_give_items_to_noteblock": (name, component, context, diagnoser) => {
        diagnose_event_trigger(name, component.on_item_throw, context.source["minecraft:entity"].description.identifier, diagnoser);
    },
    "minecraft:behavior.go_and_give_items_to_owner": (name, component, context, diagnoser) => {
        diagnose_event_trigger(name, component.on_item_throw, context.source["minecraft:entity"].description.identifier, diagnoser);
    },
    "minecraft:behavior.go_home": (name, component, context, diagnoser) => {
        const identifier = context.source["minecraft:entity"].description.identifier;
        diagnose_event_trigger(name, component.on_failed, identifier, diagnoser);
        diagnose_event_trigger(name, component.on_home, identifier, diagnoser);
    },
    "minecraft:behavior.guardian_attack": (name, component, context, diagnoser) => {
        can_only_be_used_by_specific_mob(name, context, diagnoser, "minecraft:elder_guardian", "minecraft:guardian");
    },
    "minecraft:behavior.jump_around_target": (name, component, context, diagnoser) => {
        (0, filter_1.minecraft_diagnose_filters)(component.filters, diagnoser);
    },
    "minecraft:behavior.jump_to_block": (name, component, context, diagnoser) => {
        var _a, _b;
        (_a = component === null || component === void 0 ? void 0 : component.forbidden_blocks) === null || _a === void 0 ? void 0 : _a.forEach((block) => {
            if (typeof block == "string")
                (0, block_1.is_block_defined)(block, diagnoser);
        });
        (_b = component === null || component === void 0 ? void 0 : component.preferred_blocks) === null || _b === void 0 ? void 0 : _b.forEach((block) => {
            if (typeof block == "string")
                (0, block_1.is_block_defined)(block, diagnoser);
        });
    },
    "minecraft:behavior.knockback_roar": (name, component, context, diagnoser) => {
        (0, filter_1.minecraft_diagnose_filters)(component.damage_filters, diagnoser);
        (0, filter_1.minecraft_diagnose_filters)(component.knockback_filters, diagnoser);
        diagnose_event_trigger(name, component.on_roar_end, context.source["minecraft:entity"].description.identifier, diagnoser);
    },
    "minecraft:behavior.lay_egg": (name, component, context, diagnoser) => {
        var _a;
        if (typeof component.egg_type == "string")
            (0, block_1.is_block_defined)(component.egg_type, diagnoser);
        diagnose_event_trigger(name, component.on_lay, context.source["minecraft:entity"].description.identifier, diagnoser);
        (_a = component === null || component === void 0 ? void 0 : component.target_blocks) === null || _a === void 0 ? void 0 : _a.filter((block) => typeof block === "string").forEach((block) => (0, block_1.is_block_defined)(block, diagnoser));
    },
    "minecraft:behavior.look_at_entity": (name, component, context, diagnoser) => {
        (0, filter_1.minecraft_diagnose_filters)(component.filters, diagnoser);
    },
    "minecraft:behavior.make_love": (name, component, context, diagnoser) => {
        can_only_be_used_by_specific_mob(name, context, diagnoser, "minecraft:villager", "minecraft:villager_v2");
    },
    "minecraft:behavior.melee_attack": (name, component, context, diagnoser) => {
        const identifier = context.source["minecraft:entity"].description.identifier;
        diagnose_event_trigger(name, component.on_attack, identifier, diagnoser);
        diagnose_event_trigger(name, component.on_kill, identifier, diagnoser);
    },
    "minecraft:behavior.melee_box_attack": (name, component, context, diagnoser) => {
        const identifier = context.source["minecraft:entity"].description.identifier;
        diagnose_event_trigger(name, component.on_attack, identifier, diagnoser);
        diagnose_event_trigger(name, component.on_kill, identifier, diagnoser);
    },
    "minecraft:behavior.mingle": (name, component, context, diagnoser) => {
        var _a;
        if (typeof component.mingle_partner_type == "string") {
            (0, diagnose_1.behaviorpack_entityid_diagnose)(component.mingle_partner_type, diagnoser);
        }
        else if (Array.isArray(component.mingle_partner_type)) {
            (_a = component === null || component === void 0 ? void 0 : component.mingle_partner_type) === null || _a === void 0 ? void 0 : _a.forEach((id) => (0, diagnose_1.behaviorpack_entityid_diagnose)(id, diagnoser));
        }
    },
    "minecraft:behavior.move_around_target": (name, component, context, diagnoser) => {
        (0, filter_1.minecraft_diagnose_filters)(component.filters, diagnoser);
    },
    "minecraft:behavior.move_to_block": (name, component, context, diagnoser) => {
        var _a;
        const identifier = context.source["minecraft:entity"].description.identifier;
        diagnose_event_trigger(name, component.on_reach, identifier, diagnoser);
        diagnose_event_trigger(name, component.on_stay_completed, identifier, diagnoser);
        (_a = component.target_blocks) === null || _a === void 0 ? void 0 : _a.filter((block) => typeof block === "string").forEach((block) => (0, block_1.is_block_defined)(block, diagnoser));
    },
    "minecraft:behavior.offer_flower": (name, component, context, diagnoser) => {
        (0, filter_1.minecraft_diagnose_filters)(component.filters, diagnoser);
    },
    "minecraft:behavior.pickup_items": (name, component, context, diagnoser) => {
        var _a;
        (_a = component === null || component === void 0 ? void 0 : component.excluded_items) === null || _a === void 0 ? void 0 : _a.forEach((item) => {
            (0, item_1.behaviorpack_item_diagnose)((0, minecraft_2.minecraft_get_item)(item, diagnoser.document), diagnoser);
        });
    },
    "minecraft:behavior.place_block": (name, component, context, diagnoser) => {
        var _a, _b;
        (0, filter_1.minecraft_diagnose_filters)(component.can_place, diagnoser);
        diagnose_event_trigger(name, component.on_place, context.source["minecraft:entity"].description.identifier, diagnoser);
        (_a = component === null || component === void 0 ? void 0 : component.placeable_carried_blocks) === null || _a === void 0 ? void 0 : _a.forEach((entry) => {
            if (typeof entry == "string") {
                (0, block_1.is_block_defined)(entry, diagnoser);
            }
            else if (typeof entry.name == "string") {
                (0, block_1.is_block_defined)(entry.name, diagnoser);
            }
        });
        (_b = component === null || component === void 0 ? void 0 : component.randomly_placeable_blocks) === null || _b === void 0 ? void 0 : _b.forEach((entry) => {
            if (typeof entry[0] == "string")
                (0, block_1.is_block_defined)(entry[0], diagnoser);
            else if (typeof entry[0].name == "string")
                (0, block_1.is_block_defined)(entry[0].name, diagnoser);
        });
    },
    "minecraft:behavior.play_dead": (name, component, context, diagnoser) => {
        (0, filter_1.minecraft_diagnose_filters)(component.filters, diagnoser);
    },
    "minecraft:behavior.raid_garden": (name, component, context, diagnoser) => {
        var _a;
        (_a = component.blocks) === null || _a === void 0 ? void 0 : _a.forEach((block) => {
            if (typeof block == "string")
                (0, block_1.is_block_defined)(block, diagnoser);
        });
    },
    "minecraft:behavior.ram_attack": (name, component, context, diagnoser) => {
        diagnose_event_trigger(name, component.on_start, context.source["minecraft:entity"].description.identifier, diagnoser);
    },
    "minecraft:behavior.random_search_and_dig": (name, component, context, diagnoser) => {
        var _a;
        const identifier = context.source["minecraft:entity"].description.identifier;
        diagnose_event_trigger(name, component.on_digging_start, identifier, diagnoser);
        diagnose_event_trigger(name, component.on_fail_during_digging, identifier, diagnoser);
        diagnose_event_trigger(name, component.on_fail_during_searching, identifier, diagnoser);
        diagnose_event_trigger(name, component.on_item_found, identifier, diagnoser);
        diagnose_event_trigger(name, component.on_searching_start, identifier, diagnoser);
        diagnose_event_trigger(name, component.on_success, identifier, diagnoser);
        if (typeof component.item_table === "string") {
            (0, loot_table_1.behaviorpack_loot_table_diagnose)(component.item_table, diagnoser);
        }
        (_a = component.target_blocks) === null || _a === void 0 ? void 0 : _a.filter((block) => typeof block === "string").forEach((block) => (0, block_1.is_block_defined)(block, diagnoser));
    },
    "minecraft:behavior.receive_love": (name, component, context, diagnoser) => {
        can_only_be_used_by_specific_mob(name, context, diagnoser, "minecraft:villager", "minecraft:villager_v2");
    },
    "minecraft:behavior.silverfish_merge_with_stone": (name, component, context, diagnoser) => {
        can_only_be_used_by_specific_mob(name, context, diagnoser, "minecraft:silverfish");
    },
    "minecraft:behavior.silverfish_wake_up_friends": (name, component, context, diagnoser) => {
        can_only_be_used_by_specific_mob(name, context, diagnoser, "minecraft:silverfish");
    },
    "minecraft:behavior.skeleton_horse_trap": (name, component, context, diagnoser) => {
        can_only_be_used_by_specific_mob(name, context, diagnoser, "minecraft:horse", "minecraft:donkey", "minecraft:mule", "minecraft:skeleton_horse");
    },
    "minecraft:behavior.slime_float": (name, component, context, diagnoser) => {
        can_only_be_used_by_specific_mob(name, context, diagnoser, "minecraft:magma_cube", "minecraft:slime");
    },
    "minecraft:behavior.snacking": (name, component, context, diagnoser) => {
        var _a;
        (_a = component.items) === null || _a === void 0 ? void 0 : _a.forEach((item) => {
            (0, item_1.behaviorpack_item_diagnose)((0, minecraft_2.minecraft_get_item)(item, diagnoser.document), diagnoser);
        });
    },
    "minecraft:behavior.sneeze": (name, component, context, diagnoser) => {
        if (typeof component.loot_table === "string")
            (0, loot_table_1.behaviorpack_loot_table_diagnose)(component.loot_table, diagnoser);
    },
    "minecraft:behavior.squid_dive": (name, component, context, diagnoser) => {
        can_only_be_used_by_specific_mob(name, context, diagnoser, "minecraft:squid", "minecraft:glow_squid");
    },
    "minecraft:behavior.squid_flee": (name, component, context, diagnoser) => {
        can_only_be_used_by_specific_mob(name, context, diagnoser, "minecraft:squid", "minecraft:glow_squid");
    },
    "minecraft:behavior.squid_idle": (name, component, context, diagnoser) => {
        can_only_be_used_by_specific_mob(name, context, diagnoser, "minecraft:squid", "minecraft:glow_squid");
    },
    "minecraft:behavior.squid_move_away_from_ground": (name, component, context, diagnoser) => {
        can_only_be_used_by_specific_mob(name, context, diagnoser, "minecraft:squid", "minecraft:glow_squid");
    },
    "minecraft:behavior.squid_out_of_water": (name, component, context, diagnoser) => {
        can_only_be_used_by_specific_mob(name, context, diagnoser, "minecraft:squid", "minecraft:glow_squid");
    },
    "minecraft:behavior.stomp_attack": (name, component, context, diagnoser) => {
        diagnose_event_trigger(name, component.on_attack, context.source["minecraft:entity"].description.identifier, diagnoser);
    },
    "minecraft:behavior.summon_entity": () => {
        //TODO: Complete
    },
    "minecraft:behavior.swoop_attack": (name, component, context, diagnoser) => {
        if (!diagnoser.document.getText().includes("movement.glide"))
            diagnoser.add(name, "This component requires 'minecraft:movement.glide' to function", types_1.DiagnosticSeverity.warning, "behaviorpack.entity.components.swoop_attack");
    },
    "minecraft:behavior.take_block": (name, component, context, diagnoser) => {
        var _a;
        (0, filter_1.minecraft_diagnose_filters)(component.can_take, diagnoser);
        diagnose_event_trigger(name, component.on_take, context.source["minecraft:entity"].description.identifier, diagnoser);
        (_a = component.blocks) === null || _a === void 0 ? void 0 : _a.forEach((entry) => {
            if (typeof entry == "string")
                (0, block_1.is_block_defined)(entry, diagnoser);
            else if (typeof entry.name == "string")
                (0, block_1.is_block_defined)(entry.name, diagnoser);
        });
    },
    "minecraft:behavior.take_flower": (name, component, context, diagnoser) => {
        (0, filter_1.minecraft_diagnose_filters)(component.filters, diagnoser);
    },
    "minecraft:behavior.teleport_to_owner": (name, component, context, diagnoser) => {
        (0, filter_1.minecraft_diagnose_filters)(component.filters, diagnoser);
    },
    "minecraft:behavior.tempt": (name, component, context, diagnoser) => {
        var _a;
        (_a = component.items) === null || _a === void 0 ? void 0 : _a.forEach((item) => {
            (0, item_1.behaviorpack_item_diagnose)((0, minecraft_2.minecraft_get_item)(item, diagnoser.document), diagnoser);
        });
    },
    "minecraft:behavior.timer_flag_1": (name, component, context, diagnoser) => {
        diagnose_event_trigger(name, component.on_start, context.source["minecraft:entity"].description.identifier, diagnoser);
        diagnose_event_trigger(name, component.on_end, context.source["minecraft:entity"].description.identifier, diagnoser);
    },
    "minecraft:behavior.timer_flag_2": (name, component, context, diagnoser) => {
        diagnose_event_trigger(name, component.on_start, context.source["minecraft:entity"].description.identifier, diagnoser);
        diagnose_event_trigger(name, component.on_end, context.source["minecraft:entity"].description.identifier, diagnoser);
    },
    "minecraft:behavior.timer_flag_3": (name, component, context, diagnoser) => {
        diagnose_event_trigger(name, component.on_start, context.source["minecraft:entity"].description.identifier, diagnoser);
        diagnose_event_trigger(name, component.on_end, context.source["minecraft:entity"].description.identifier, diagnoser);
    },
    "minecraft:behavior.transport_items": (name, component, context, diagnoser) => {
        var _a, _b, _c, _d;
        (_a = component.source_container_types) === null || _a === void 0 ? void 0 : _a.forEach((reference) => {
            let element = typeof reference == "string" ? reference : reference.name;
            if (typeof reference !== "string")
                return;
            if (!element.startsWith("minecraft:") ||
                (!element.includes("chest") && !element.includes("barrel") && !element.includes("shulker")))
                diagnoser.add(element, `Chests, Copper Chests, Barrels, and Shulker Boxes are the only supported containers: ${element}`, types_1.DiagnosticSeverity.error, `behaviorpack.entity.component.transport_items.invalid_container`);
        });
        (_b = component.destination_container_types) === null || _b === void 0 ? void 0 : _b.forEach((reference) => {
            let element = typeof reference == "string" ? reference : reference.name;
            if (typeof reference !== "string")
                return;
            if (!element.startsWith("minecraft:") ||
                (!element.includes("chest") && !element.includes("barrel") && !element.includes("shulker")))
                diagnoser.add(element, `Chests, Copper Chests, Barrels, and Shulker Boxes are the only supported containers: ${element}`, types_1.DiagnosticSeverity.error, `behaviorpack.entity.component.transport_items.invalid_container`);
        });
        (_c = component.allowed_items) === null || _c === void 0 ? void 0 : _c.forEach((item) => {
            (0, item_1.behaviorpack_item_diagnose)(item, diagnoser);
        });
        (_d = component.disallowed_items) === null || _d === void 0 ? void 0 : _d.forEach((item) => {
            (0, item_1.behaviorpack_item_diagnose)(item, diagnoser);
        });
    },
    "minecraft:behavior.wither_random_attack_pos_goal": (name, component, context, diagnoser) => {
        can_only_be_used_by_specific_mob(name, context, diagnoser, "minecraft:wither");
    },
    "minecraft:behavior.work": (name, component, context, diagnoser) => {
        diagnose_event_trigger(name, component.on_arrival, context.source["minecraft:entity"].description.identifier, diagnoser);
    },
    "minecraft:behavior.work_composter": (name, component, context, diagnoser) => {
        diagnose_event_trigger(name, component.on_arrival, context.source["minecraft:entity"].description.identifier, diagnoser);
    },
    "minecraft:addrider": (name, component, context, diagnoser) => {
        if (typeof component.entity_type === "string")
            (0, diagnose_1.behaviorpack_entityid_diagnose)(component.entity_type, diagnoser);
    },
    "minecraft:ageable": (name, component, context, diagnoser) => {
        var _a, _b;
        diagnose_event_trigger(name, component.grow_up, context.source["minecraft:entity"].description.identifier, diagnoser);
        (0, filter_1.minecraft_diagnose_filters)(component.interact_filters, diagnoser);
        (_a = component.drop_items) === null || _a === void 0 ? void 0 : _a.forEach((item) => (0, item_1.behaviorpack_item_diagnose)((0, minecraft_2.minecraft_get_item)(item, diagnoser.document), diagnoser));
        if (Array.isArray(component.feed_items))
            (_b = component.feed_items) === null || _b === void 0 ? void 0 : _b.forEach((item) => {
                if (typeof item == "string") {
                    (0, item_1.behaviorpack_item_diagnose)((0, minecraft_2.minecraft_get_item)(item, diagnoser.document), diagnoser);
                }
                else if (typeof item.feed_items == "string") {
                    (0, item_1.behaviorpack_item_diagnose)((0, minecraft_2.minecraft_get_item)(item.item, diagnoser.document), diagnoser);
                }
            });
        else if (typeof component.feed_items == "string") {
            (0, item_1.behaviorpack_item_diagnose)((0, minecraft_2.minecraft_get_item)(component.feed_items, diagnoser.document), diagnoser);
        }
        if (typeof component.transform_to_item === "string") {
            (0, item_1.behaviorpack_item_diagnose)((0, minecraft_2.minecraft_get_item)(component.transform_to_item, diagnoser.document), diagnoser);
        }
    },
    "minecraft:anger_level": (name, component, context, diagnoser) => {
        (0, filter_1.minecraft_diagnose_filters)(component.nuisance_filter, diagnoser);
    },
    "minecraft:angry": (name, component, context, diagnoser) => {
        (0, filter_1.minecraft_diagnose_filters)(component.broadcast_filters, diagnoser);
    },
    "minecraft:area_attack": (name, component, context, diagnoser) => {
        (0, filter_1.minecraft_diagnose_filters)(component.entity_filter, diagnoser);
    },
    "minecraft:annotation.break_door": (name, component, context, diagnoser) => {
        const navigatorId = context.components.find((id) => id.startsWith("minecraft:navigation."));
        if (!navigatorId)
            return;
        const navigationComponent = findValue(context.source["minecraft:entity"], navigatorId);
        if (navigationComponent.can_break_doors !== true)
            diagnoser.add(name, "Requires the entity's navigation component to have the parameter 'can_break_doors' set to 'true'.", types_1.DiagnosticSeverity.warning, "behaviorpack.entity.component.annotation_break_door");
    },
    "minecraft:barter": (name, component, context, diagnoser) => {
        if (typeof component.barter_table == "string") {
            (0, loot_table_1.behaviorpack_loot_table_diagnose)(component.barter_table, diagnoser);
        }
    },
    "minecraft:block_sensor": (name, component, context, diagnoser) => {
        var _a, _b;
        (_a = component.on_break) === null || _a === void 0 ? void 0 : _a.forEach((entry) => {
            var _a;
            (_a = entry.block_list) === null || _a === void 0 ? void 0 : _a.forEach((block) => {
                if (typeof block == "string")
                    (0, block_1.is_block_defined)(block, diagnoser);
            });
        });
        (_b = component.sources) === null || _b === void 0 ? void 0 : _b.forEach((entry) => {
            (0, filter_1.minecraft_diagnose_filters)(entry, diagnoser);
        });
    },
    "minecraft:boostable": (name, component, context, diagnoser) => {
        var _a;
        (_a = component.boost_items) === null || _a === void 0 ? void 0 : _a.forEach((entry) => {
            if (typeof entry.item == "string")
                (0, item_1.behaviorpack_item_diagnose)((0, minecraft_2.minecraft_get_item)(entry.item, diagnoser.document), diagnoser);
            if (typeof entry.replace_item == "string")
                (0, item_1.behaviorpack_item_diagnose)((0, minecraft_2.minecraft_get_item)(entry.replace_item, diagnoser.document), diagnoser);
        });
    },
    "minecraft:break_blocks": (name, component, context, diagnoser) => {
        var _a;
        (_a = component.block_list) === null || _a === void 0 ? void 0 : _a.forEach((block) => {
            if (typeof block == "string")
                (0, block_1.is_block_defined)(block, diagnoser);
        });
    },
    "minecraft:breedable": (name, component, context, diagnoser) => {
        var _a;
        (0, filter_1.minecraft_diagnose_filters)(component.love_filters, diagnoser);
        processEntries(component.environment_requirements, (entry) => {
            if (typeof entry.blocks === "string")
                (0, block_1.is_block_defined)(entry.blocks, diagnoser);
        });
        processEntries(component.breeds_with, (entry) => {
            var _a;
            if (typeof entry.baby_type === "string")
                (0, diagnose_1.behaviorpack_entityid_diagnose)(entry.baby_type, diagnoser);
            if (typeof entry.mate_type === "string")
                (0, diagnose_1.behaviorpack_entityid_diagnose)(entry.mate_type, diagnoser);
            (0, filter_1.minecraft_diagnose_filters)((_a = entry === null || entry === void 0 ? void 0 : entry.breed_event) === null || _a === void 0 ? void 0 : _a.filters, diagnoser);
        });
        if (Array.isArray(component.breed_items)) {
            (_a = component.breed_items) === null || _a === void 0 ? void 0 : _a.filter((item) => typeof item === "string").forEach((item) => (0, item_1.behaviorpack_item_diagnose)((0, minecraft_2.minecraft_get_item)(item, diagnoser.document), diagnoser));
        }
        else if (typeof component.breed_items == "string") {
            (0, item_1.behaviorpack_item_diagnose)((0, minecraft_2.minecraft_get_item)(component.breed_items, diagnoser.document), diagnoser);
        }
        if (typeof component.transform_to_item === "string") {
            (0, item_1.behaviorpack_item_diagnose)((0, minecraft_2.minecraft_get_item)(component.transform_to_item, diagnoser.document), diagnoser);
        }
        const text = diagnoser.document.getText();
        if (component.require_tame && !text.includes("minecraft:tameable") && !text.includes("minecraft:tamemount")) {
            diagnoser.add(name + "/require_tame", "This entity cannot be tamed despite being tamed set as a requirement for breeding", types_1.DiagnosticSeverity.info, "behaviorpack.entity.components.breedable");
        }
        //TODO: minecraft:breedable/property_inheritance
    },
    "minecraft:bribeable": (name, component, context, diagnoser) => {
        var _a;
        (_a = component.bribe_items) === null || _a === void 0 ? void 0 : _a.forEach((item) => {
            (0, item_1.behaviorpack_item_diagnose)((0, minecraft_2.minecraft_get_item)(item, diagnoser.document), diagnoser);
        });
    },
    "minecraft:buoyant": (name, component, context, diagnoser) => {
        var _a;
        (_a = component.liquid_blocks) === null || _a === void 0 ? void 0 : _a.forEach((block) => {
            if (typeof block == "string")
                (0, block_1.is_block_defined)(block, diagnoser);
        });
    },
    "minecraft:celebrate_hunt": (name, component, context, diagnoser) => {
        (0, filter_1.minecraft_diagnose_filters)(component.celeberation_targets, diagnoser);
    },
    "minecraft:damage_sensor": (name, component, context, diagnoser) => {
        processEntries(component.triggers, (entry) => {
            var _a;
            (0, filter_1.minecraft_diagnose_filters)((_a = entry.on_damage) === null || _a === void 0 ? void 0 : _a.filters, diagnoser);
        });
    },
    "minecraft:dash": deprecated_component('minecraft:dash_action'),
    "minecraft:despawn": (name, component, context, diagnoser) => {
        (0, filter_1.minecraft_diagnose_filters)(component.filters, diagnoser);
    },
    "minecraft:drying_out_timer": (name, component, context, diagnoser) => {
        const identifier = context.source["minecraft:entity"].description.identifier;
        diagnose_event_trigger(name, component.dried_out_event, identifier, diagnoser);
        diagnose_event_trigger(name, component.recover_after_dried_out_event, identifier, diagnoser);
        diagnose_event_trigger(name, component.stopped_drying_out_event, identifier, diagnoser);
    },
    "minecraft:economy_trade_table": trade_1.check_trade_table,
    "minecraft:entity_sensor": (name, component, context, diagnoser) => {
        if (component.subsensors === undefined)
            return;
        try {
            if (minecraft_1.FormatVersion.isLessThan(minecraft_1.FormatVersion.parse(context.source.format_version), [1, 21, 0])) {
                diagnoser.add(name, `To use "minecraft:entity_sensor/subsensors", you need a "format_version" of 1.21.0 or higher`, types_1.DiagnosticSeverity.error, "behaviorpack.entity.component.entity_sensor");
            }
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        }
        catch (err) {
            // Leaving empty as the base diagnoser should flag an invalid format version
        }
        component.subsensors.forEach((sensor) => {
            (0, filter_1.minecraft_diagnose_filters)(sensor.event_filters, diagnoser);
            if (typeof sensor.event == "string")
                (0, diagnose_1.behaviorpack_entity_event_diagnose)(sensor.event, component + "/" + sensor.event, Object.keys(context.source["minecraft:entity"].events || {}), diagnoser);
        });
    },
    "minecraft:environment_sensor": (name, component, context, diagnoser) => {
        processEntries(component.triggers, (entry) => {
            (0, filter_1.minecraft_diagnose_filters)(entry.filters, diagnoser);
        });
    },
    "minecraft:equip_item": (name, component, context, diagnoser) => {
        var _a;
        (_a = component.excluded_items) === null || _a === void 0 ? void 0 : _a.forEach((item) => {
            (0, item_1.behaviorpack_item_diagnose)((0, minecraft_2.minecraft_get_item)(typeof item == "string" ? item : item.item, diagnoser.document), diagnoser);
        });
    },
    "minecraft:equippable": (name, component, context, diagnoser) => {
        var _a;
        (_a = component.slots) === null || _a === void 0 ? void 0 : _a.forEach((slot) => {
            var _a, _b, _c;
            (_a = slot.accepted_items) === null || _a === void 0 ? void 0 : _a.forEach((item) => {
                (0, item_1.behaviorpack_item_diagnose)((0, minecraft_2.minecraft_get_item)(item, diagnoser.document), diagnoser);
            });
            (0, filter_1.minecraft_diagnose_filters)((_b = slot.on_equip) === null || _b === void 0 ? void 0 : _b.filters, diagnoser);
            (0, filter_1.minecraft_diagnose_filters)((_c = slot.on_unequip) === null || _c === void 0 ? void 0 : _c.filters, diagnoser);
        });
    },
    "minecraft:giveable": (name, component, context, diagnoser) => {
        var _a;
        (_a = component.items) === null || _a === void 0 ? void 0 : _a.forEach((item) => {
            (0, item_1.behaviorpack_item_diagnose)((0, minecraft_2.minecraft_get_item)(item, diagnoser.document), diagnoser);
        });
        diagnose_event_trigger(name, component.on_give, context.source["minecraft:entity"].description.identifier, diagnoser);
    },
    "minecraft:healable": (name, component, context, diagnoser) => {
        var _a;
        (0, filter_1.minecraft_diagnose_filters)(component.filters, diagnoser);
        (_a = component.items) === null || _a === void 0 ? void 0 : _a.forEach((item) => {
            if (typeof item == "string")
                (0, item_1.behaviorpack_item_diagnose)((0, minecraft_2.minecraft_get_item)(item, diagnoser.document), diagnoser);
            else if (typeof item.item == "string")
                (0, item_1.behaviorpack_item_diagnose)((0, minecraft_2.minecraft_get_item)(item.item, diagnoser.document), diagnoser);
        });
    },
    "minecraft:home": (name, component, context, diagnoser) => {
        var _a;
        (_a = component.home_block_list) === null || _a === void 0 ? void 0 : _a.forEach((block) => {
            (0, block_1.is_block_defined)(block, diagnoser);
        });
    },
    "minecraft:input_air_controlled": deprecated_component('minecraft:free_camera_controlled'),
    "minecraft:inside_block_notifier": (name, component, context, diagnoser) => {
        var _a;
        (_a = component.block_list) === null || _a === void 0 ? void 0 : _a.forEach((entry) => {
            if (typeof entry.block == "string")
                (0, block_1.is_block_defined)(entry.block, diagnoser);
            else if (typeof entry.block.name == "string")
                (0, block_1.is_block_defined)(entry.block.name, diagnoser);
        });
    },
    "minecraft:interact": (name, component, context, diagnoser) => {
        const interactions = Array.isArray(component.interactions) ? component.interactions : [component.interactions];
        interactions === null || interactions === void 0 ? void 0 : interactions.forEach((entry) => {
            var _a, _b;
            diagnose_event_trigger(name, component.on_interact, context.source["minecraft:entity"].description.identifier, diagnoser);
            if (typeof ((_a = entry.add_items) === null || _a === void 0 ? void 0 : _a.table) == "string")
                (0, loot_table_1.behaviorpack_loot_table_diagnose)(entry.add_items.table, diagnoser);
            if (typeof ((_b = entry.spawn_items) === null || _b === void 0 ? void 0 : _b.table) == "string")
                (0, loot_table_1.behaviorpack_loot_table_diagnose)(entry.spawn_items.table, diagnoser);
            if (typeof entry.spawn_entities == "string")
                (0, diagnose_1.behaviorpack_entityid_diagnose)(entry.spawn_entities, diagnoser);
            else if (Array.isArray(entry.spawn_entities))
                entry.spawn_entities.forEach((id) => {
                    if (typeof id == "string")
                        (0, diagnose_1.behaviorpack_entityid_diagnose)(id, diagnoser);
                });
            if (typeof component.transform_to_item === "string")
                (0, item_1.behaviorpack_item_diagnose)((0, minecraft_2.minecraft_get_item)(component.transform_to_item, diagnoser.document), diagnoser);
        });
    },
    "minecraft:leashable": (name, component, context, diagnoser) => {
        diagnose_event_trigger(name, component.on_leash, context.source["minecraft:entity"].description.identifier, diagnoser);
        diagnose_event_trigger(name, component.on_unleash, context.source["minecraft:entity"].description.identifier, diagnoser);
    },
    "minecraft:looked_at": (name, component, context, diagnoser) => {
        (0, filter_1.minecraft_diagnose_filters)(component.filters, diagnoser);
        diagnose_event_trigger(name, component.looked_at_event, context.source["minecraft:entity"].description.identifier, diagnoser);
        diagnose_event_trigger(name, component.not_looked_at_event, context.source["minecraft:entity"].description.identifier, diagnoser);
    },
    "minecraft:mob_effect": (name, component, context, diagnoser) => {
        (0, filter_1.minecraft_diagnose_filters)(component.entity_filter, diagnoser);
    },
    "minecraft:nameable": (name, component, context, diagnoser) => {
        var _a;
        diagnose_event_trigger(name, component.default_trigger, context.source["minecraft:entity"].description.identifier, diagnoser);
        (_a = component.name_actions) === null || _a === void 0 ? void 0 : _a.forEach((entry) => {
            var _a;
            (0, filter_1.minecraft_diagnose_filters)((_a = entry.on_named) === null || _a === void 0 ? void 0 : _a.filters, diagnoser);
        });
    },
    "minecraft:peek": (name, component, context, diagnoser) => {
        const identifier = context.source["minecraft:entity"].description.identifier;
        diagnose_event_trigger(name, component.on_close, identifier, diagnoser);
        diagnose_event_trigger(name, component.on_open, identifier, diagnoser);
        diagnose_event_trigger(name, component.on_target_open, identifier, diagnoser);
    },
    "minecraft:preferred_path": (name, component, context, diagnoser) => {
        var _a;
        (_a = component.preferred_path_blocks) === null || _a === void 0 ? void 0 : _a.forEach((entry) => {
            entry.blocks.forEach((id) => {
                if (typeof id == "string")
                    (0, block_1.is_block_defined)(id, diagnoser);
            });
        });
    },
    "minecraft:projectile": (name, component, context, diagnoser) => {
        var _a, _b, _c, _d;
        diagnose_event_trigger(name, (_b = (_a = component.on_hit) === null || _a === void 0 ? void 0 : _a.definition_event) === null || _b === void 0 ? void 0 : _b.event_trigger, context.source["minecraft:entity"].description.identifier, diagnoser);
        if (typeof ((_d = (_c = component.on_hit) === null || _c === void 0 ? void 0 : _c.spawn_chance) === null || _d === void 0 ? void 0 : _d.spawn_definition) == "string") {
            (0, diagnose_1.behaviorpack_entityid_diagnose)(component.on_hit.spawn_chance.spawn_definition, diagnoser);
        }
    },
    "minecraft:rail_sensor": (name, component, context, diagnoser) => {
        diagnose_event_trigger(name, component.on_activate, context.source["minecraft:entity"].description.identifier, diagnoser);
        diagnose_event_trigger(name, component.on_deactivate, context.source["minecraft:entity"].description.identifier, diagnoser);
    },
    "minecraft:ravager_blocked": (name, component, context, diagnoser) => {
        var _a;
        (_a = component.reaction_choices) === null || _a === void 0 ? void 0 : _a.forEach((entry) => {
            var _a;
            (0, filter_1.minecraft_diagnose_filters)((_a = entry.value) === null || _a === void 0 ? void 0 : _a.filters, diagnoser);
        });
    },
    "minecraft:rideable": (name, component, context, diagnoser) => {
        var _a;
        (_a = component.family_types) === null || _a === void 0 ? void 0 : _a.forEach((family) => {
            (0, minecraft_2.minecraft_family_diagnose)(family, diagnoser);
        });
        if (typeof component.on_rider_enter_event == "string")
            (0, diagnose_1.behaviorpack_entity_event_diagnose)(component.on_rider_enter_event, component + "/" + component.event, Object.keys(context.source["minecraft:entity"].events || {}), diagnoser);
        if (typeof component.on_rider_exit_event == "string")
            (0, diagnose_1.behaviorpack_entity_event_diagnose)(component.on_rider_exit_event, component + "/" + component.event, Object.keys(context.source["minecraft:entity"].events || {}), diagnoser);
    },
    "minecraft:scheduler": (name, component, context, diagnoser) => {
        var _a;
        (_a = component.scheduled_events) === null || _a === void 0 ? void 0 : _a.forEach((entry) => {
            (0, filter_1.minecraft_diagnose_filters)(entry.filters, diagnoser);
        });
    },
    "minecraft:shareables": (name, component, context, diagnoser) => {
        var _a;
        (_a = component.items) === null || _a === void 0 ? void 0 : _a.forEach((entry) => {
            (0, item_1.behaviorpack_item_diagnose)((0, minecraft_2.minecraft_get_item)(entry.item, diagnoser.document), diagnoser);
            if (entry.craft_into)
                (0, item_1.behaviorpack_item_diagnose)((0, minecraft_2.minecraft_get_item)(entry.craft_into, diagnoser.document), diagnoser);
            // TODO: Check if entry.barter and then check for barter components
            // TODO: Check if entry.admire and then check for admire components
        });
    },
    "minecraft:shooter": (name, component, context, diagnoser) => {
        var _a;
        (0, diagnose_1.behaviorpack_entityid_diagnose)(component.def, diagnoser);
        (_a = component.projectiles) === null || _a === void 0 ? void 0 : _a.forEach((entry) => {
            (0, diagnose_1.behaviorpack_entityid_diagnose)(entry.def, diagnoser);
        });
    },
    "minecraft:sittable": (name, component, context, diagnoser) => {
        diagnose_event_trigger(name, component.sit_event, context.source["minecraft:entity"].description.identifier, diagnoser);
        diagnose_event_trigger(name, component.stand_event, context.source["minecraft:entity"].description.identifier, diagnoser);
    },
    "minecraft:spawn_entity": (name, component, context, diagnoser) => {
        processEntries(component.entities, (entry) => {
            var _a, _b;
            (0, filter_1.minecraft_diagnose_filters)(entry.filters, diagnoser);
            (0, filter_1.minecraft_diagnose_filters)((_a = entry.spawn_item_event) === null || _a === void 0 ? void 0 : _a.filters, diagnoser);
            if (entry.spawn_item)
                (0, item_1.behaviorpack_item_diagnose)((0, minecraft_2.minecraft_get_item)(entry.spawn_item, diagnoser.document), diagnoser);
            if (!entry.spawn_entity)
                return;
            (0, diagnose_1.behaviorpack_entityid_diagnose)(entry.spawn_entity, diagnoser);
            const events = (_b = diagnoser.context
                .getProjectData()
                .projectData.behaviorPacks.entities.get(entry.spawn_entity)) === null || _b === void 0 ? void 0 : _b.events;
            if (entry.spawn_event && !(events === null || events === void 0 ? void 0 : events.defined.has(entry.spawn_event))) {
                diagnoser.add(name, `Trying to call event "${entry.spawn_event}" that does not exist on "${entry.spawn_entity}"`, types_1.DiagnosticSeverity.warning, `behaviorpack.entity.component.spawn_entity`);
            }
        });
    },
    "minecraft:tameable": (name, component, context, diagnoser) => {
        normalizeToArray(component.tame_items).forEach((item) => {
            (0, item_1.behaviorpack_item_diagnose)((0, minecraft_2.minecraft_get_item)(item, diagnoser.document), diagnoser);
        });
        diagnose_event_trigger(name, component.tame_event, context.source["minecraft:entity"].description.identifier, diagnoser);
    },
    "minecraft:tamemount": (name, component, context, diagnoser) => {
        var _a, _b;
        (_a = component.auto_reject_items) === null || _a === void 0 ? void 0 : _a.forEach((entry) => {
            (0, item_1.behaviorpack_item_diagnose)((0, minecraft_2.minecraft_get_item)(entry.item, diagnoser.document), diagnoser);
        });
        (_b = component.feed_items) === null || _b === void 0 ? void 0 : _b.forEach((entry) => {
            (0, item_1.behaviorpack_item_diagnose)((0, minecraft_2.minecraft_get_item)(entry.item, diagnoser.document), diagnoser);
        });
        diagnose_event_trigger(name, component.tame_event, context.source["minecraft:entity"].description.identifier, diagnoser);
    },
    "minecraft:target_nearby_sensor": (name, component, context, diagnoser) => {
        const identifier = context.source["minecraft:entity"].description.identifier;
        diagnose_event_trigger(name, component.on_inside_range, identifier, diagnoser);
        diagnose_event_trigger(name, component.on_outside_range, identifier, diagnoser);
        diagnose_event_trigger(name, component.on_vision_lost_inside_range, identifier, diagnoser);
    },
    "minecraft:timer": (name, component, context, diagnoser) => {
        diagnose_event_trigger(name, component.time_down_event, context.source["minecraft:entity"].description.identifier, diagnoser);
        if (component.time && component.random_time_choices)
            diagnoser.add(name, `"time" & "random_time_choices" are incompatible with each other`, types_1.DiagnosticSeverity.error, `behaviorpack.entity.component.timer`);
    },
    "minecraft:trade_table": trade_1.check_trade_table,
    "minecraft:trail": (name, component, context, diagnoser) => {
        if (component.block_type)
            (0, block_1.is_block_defined)(component.block_type, diagnoser);
        (0, filter_1.minecraft_diagnose_filters)(component.spawn_filter, diagnoser);
    },
    "minecraft:transformation": (name, component, context, diagnoser) => {
        (0, sounds_1.diagnose_resourcepack_sound)(component.begin_transform_sound, diagnoser);
        (0, sounds_1.diagnose_resourcepack_sound)(component.transformation_sound, diagnoser);
        if (component.into)
            (0, diagnose_1.behaviorpack_entityid_diagnose)(component.into, diagnoser);
    },
    "minecraft:trusting": (name, component, context, diagnoser) => {
        var _a;
        (_a = component === null || component === void 0 ? void 0 : component.trust_items) === null || _a === void 0 ? void 0 : _a.forEach((item) => {
            (0, item_1.behaviorpack_item_diagnose)((0, minecraft_2.minecraft_get_item)(item, diagnoser.document), diagnoser);
        });
        diagnose_event_trigger(name, component.trust_event, context.source["minecraft:entity"].description.identifier, diagnoser);
    },
    "minecraft:equipment": loot_1.check_loot_table,
    "minecraft:ignore_cannot_be_attacked": (name, component, context, diagnoser) => {
        (0, filter_1.minecraft_diagnose_filters)(component.filters, diagnoser);
    },
    "minecraft:item_controllable": (name, component, context, diagnoser) => {
        normalizeToArray(component === null || component === void 0 ? void 0 : component.control_items).forEach((item) => {
            (0, item_1.behaviorpack_item_diagnose)((0, minecraft_2.minecraft_get_item)(item, diagnoser.document), diagnoser);
        });
    },
    "minecraft:loot": loot_1.check_loot_table,
    "minecraft:on_death": (name, component, context, diagnoser) => {
        diagnose_event_trigger(name, component, context.source["minecraft:entity"].description.identifier, diagnoser);
    },
    "minecraft:on_friendly_anger": (name, component, context, diagnoser) => {
        diagnose_event_trigger(name, component, context.source["minecraft:entity"].description.identifier, diagnoser);
    },
    "minecraft:on_hurt": (name, component, context, diagnoser) => {
        diagnose_event_trigger(name, component, context.source["minecraft:entity"].description.identifier, diagnoser);
    },
    "minecraft:on_hurt_by_player": (name, component, context, diagnoser) => {
        diagnose_event_trigger(name, component, context.source["minecraft:entity"].description.identifier, diagnoser);
    },
    "minecraft:on_ignite": (name, component, context, diagnoser) => {
        diagnose_event_trigger(name, component, context.source["minecraft:entity"].description.identifier, diagnoser);
    },
    "minecraft:on_start_landing": (name, component, context, diagnoser) => {
        can_only_be_used_by_specific_mob(name, context, diagnoser, "minecraft:ender_dragon");
        diagnose_event_trigger(name, component, context.source["minecraft:entity"].description.identifier, diagnoser);
    },
    "minecraft:on_start_takeoff": (name, component, context, diagnoser) => {
        can_only_be_used_by_specific_mob(name, context, diagnoser, "minecraft:ender_dragon");
        diagnose_event_trigger(name, component, context.source["minecraft:entity"].description.identifier, diagnoser);
    },
    "minecraft:on_target_acquired": (name, component, context, diagnoser) => {
        diagnose_event_trigger(name, component, context.source["minecraft:entity"].description.identifier, diagnoser);
    },
    "minecraft:on_target_escape": (name, component, context, diagnoser) => {
        diagnose_event_trigger(name, component, context.source["minecraft:entity"].description.identifier, diagnoser);
    },
    "minecraft:on_wake_with_owner": (name, component, context, diagnoser) => {
        diagnose_event_trigger(name, component, context.source["minecraft:entity"].description.identifier, diagnoser);
    },
    "minecraft:fall_damage": (name, component, context, diagnoser) => {
        try {
            if (minecraft_1.FormatVersion.isGreaterThan(minecraft_1.FormatVersion.parse(context.source.format_version), [1, 10, 0])) {
                diagnoser.add(name, `To use "minecraft:fall_damage", you need a "format_version" of 1.10.0 or lesser`, types_1.DiagnosticSeverity.error, "behaviorpack.entity.component.fall_damage");
            }
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        }
        catch (err) {
            // Leaving empty as the base diagnoser should flag an invalid format version
        }
    },
};
function can_only_be_used_by_specific_mob(name, context, diagnoser, ...id) {
    var _a, _b;
    const { identifier, runtime_identifier } = (_b = (_a = context.source["minecraft:entity"]) === null || _a === void 0 ? void 0 : _a.description) !== null && _b !== void 0 ? _b : {};
    if (id.includes(identifier) || id.includes(runtime_identifier))
        return;
    const code = "behaviorpack.entity.components." + id.map((x) => x.slice(10)).join("_") + "_component";
    diagnoser.add(name, `This component can only be used by '${id}'`, types_1.DiagnosticSeverity.error, code);
}
function deprecated_component(replacement) {
    const str = replacement ? ", replace with " + replacement : "";
    return (0, checks_1.component_error)(`This component is no longer supported${str}. You are recommended to use the latest format version.`, "behaviorpack.entity.components.deprecated");
}
function diagnose_event_trigger(componentName, component, entityId, diagnoser) {
    var _a;
    if (!component)
        return;
    (0, filter_1.minecraft_diagnose_filters)(component.filters, diagnoser);
    if (typeof component.event == "string") {
        (0, diagnose_1.behaviorpack_entity_event_diagnose)(component.event, componentName + "/" + component.event, (_a = diagnoser.context.getProjectData().projectData.behaviorPacks.entities.get(entityId)) === null || _a === void 0 ? void 0 : _a.events, diagnoser);
    }
}
function processEntries(data, callback) {
    if (Array.isArray(data)) {
        data.forEach(callback);
    }
    else if (data) {
        callback(data);
    }
}
function findValue(obj, targetKey) {
    for (const key in obj) {
        if (key === targetKey) {
            return obj[key];
        }
        if (typeof obj[key] === "object" && obj[key] !== null) {
            const result = findValue(obj[key], targetKey);
            if (result !== undefined) {
                return result;
            }
        }
    }
    return undefined;
}
function normalizeToArray(data) {
    if (data === undefined)
        return [];
    if (Array.isArray(data))
        return data;
    return [data];
}
//# sourceMappingURL=diagnose.js.map