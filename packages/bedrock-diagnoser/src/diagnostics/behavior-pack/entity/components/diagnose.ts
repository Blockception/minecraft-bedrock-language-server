import { Internal } from "bc-minecraft-bedrock-project";
import { FormatVersion } from "bc-minecraft-bedrock-types/src/minecraft";
import { ComponentBehavior } from "bc-minecraft-bedrock-types/src/minecraft/components";
import { DiagnosticSeverity, DocumentDiagnosticsBuilder } from "../../../../types";
import { Context } from "../../../../utility/components";
import { component_error, ComponentCheck, components_check } from "../../../../utility/components/checks";
import { minecraft_family_diagnose, minecraft_get_item } from "../../../minecraft";
import { minecraft_diagnose_filters } from "../../../minecraft/filter";
import { diagnose_resourcepack_sound } from "../../../resource-pack/sounds";
import { is_block_defined } from "../../block";
import { behaviorpack_item_diagnose } from "../../item";
import { behaviorpack_loot_table_diagnose } from "../../loot-table";
import { behaviorpack_entity_event_diagnose, behaviorpack_entityid_diagnose } from "../diagnose";
import { behaviorpack_entity_components_filters } from "./filters";
import { check_loot_table } from "./loot";
import { check_trade_table } from "./trade";

//TODO: Filters for entity_types

/**
 *
 * @param container
 * @param context
 * @param diagnoser
 */
export function behaviorpack_diagnose_entity_components(
  container: ComponentBehavior,
  context: Context<Internal.BehaviorPack.Entity>,
  diagnoser: DocumentDiagnosticsBuilder
): void {
  components_check(container, context, diagnoser, component_test);

  behaviorpack_entity_components_filters(container, diagnoser);
}

const component_test: Record<string, ComponentCheck<Internal.BehaviorPack.Entity>> = {
  // Deprecated
  "minecraft:behavior.enderman_leave_block": deprecated_component("minecraft:behavior.place_block"),
  "minecraft:behavior.enderman_take_block": deprecated_component("minecraft:behavior.take_block"),
  "minecraft:body_rotation_axis_aligned": deprecated_component("minecraft:rotation_axis_aligned"),

  // Checks
  "minecraft:behavior.admire_item": (name, component, context, diagnoser) => {
    diagnose_event_trigger(
      name,
      component.on_admire_item_start,
      context.source["minecraft:entity"].description.identifier,
      diagnoser
    );
    diagnose_event_trigger(
      name,
      component.on_admire_item_stop,
      context.source["minecraft:entity"].description.identifier,
      diagnoser
    );
  },
  "minecraft:behavior.avoid_block": (name, component, context, diagnoser) => {
    diagnose_event_trigger(
      name,
      component.on_escape,
      context.source["minecraft:entity"].description.identifier,
      diagnoser
    );
    component?.target_blocks?.forEach((block: string) => is_block_defined(block, diagnoser));
  },
  "minecraft:behavior.avoid_mob_type": (name, component, context, diagnoser) => {
    diagnose_event_trigger(
      name,
      component.on_escape_event,
      context.source["minecraft:entity"].description.identifier,
      diagnoser
    );
  },
  "minecraft:behavior.beg": (name, component, context, diagnoser) => {
    component?.items?.forEach((item: string) =>
      behaviorpack_item_diagnose(minecraft_get_item(item, diagnoser.document), diagnoser)
    );
  },
  "minecraft:behavior.celebrate": (name, component, context, diagnoser) => {
    diagnose_event_trigger(
      name,
      component.on_celebration_end_event,
      context.source["minecraft:entity"].description.identifier,
      diagnoser
    );
  },
  "minecraft:behavior.celebrate_survive": (name, component, context, diagnoser) => {
    diagnose_event_trigger(
      name,
      component.on_celebration_end_event,
      context.source["minecraft:entity"].description.identifier,
      diagnoser
    );
  },
  "minecraft:behavior.charge_held_item": (name, component, context, diagnoser) => {
    component?.items?.forEach((item: string) =>
      behaviorpack_item_diagnose(minecraft_get_item(item, diagnoser.document), diagnoser)
    );
  },
  "minecraft:behavior.croak": (name, component, context, diagnoser) => {
    minecraft_diagnose_filters(component.filters, diagnoser);
  },
  "minecraft:behavior.defend_trusted_target": (name, component, context, diagnoser) => {
    diagnose_event_trigger(
      name,
      component.on_defend_start,
      context.source["minecraft:entity"].description.identifier,
      diagnoser
    );
  },
  "minecraft:behavior.delayed_attack": (name, component, context, diagnoser) => {
    diagnose_event_trigger(
      name,
      component.on_attack,
      context.source["minecraft:entity"].description.identifier,
      diagnoser
    );
  },
  "minecraft:behavior.dig": (name, component, context, diagnoser) => {
    //TODO: Check if requires warden runtime
    diagnose_event_trigger(
      name,
      component.on_start,
      context.source["minecraft:entity"].description.identifier,
      diagnoser
    );
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
    minecraft_diagnose_filters(component.filters, diagnoser);
  },
  "minecraft:behavior.drink_potion": (name, component, context, diagnoser) => {
    component?.potions?.forEach((obj: any) => minecraft_diagnose_filters(obj.filters, diagnoser));
  },
  "minecraft:behavior.drop_item_for": (name, component, context, diagnoser) => {
    if (typeof component.loot_table === "string") {
      behaviorpack_loot_table_diagnose(component.loot_table, diagnoser);
    }

    diagnose_event_trigger(
      name,
      component.on_drop_attempt,
      context.source["minecraft:entity"].description.identifier,
      diagnoser
    );
  },
  "minecraft:behavior.eat_block": (name, component, context, diagnoser) => {
    component?.eat_and_replace_block_pairs?.forEach((obj: any) => {
      if (obj.eat_block) is_block_defined(obj.eat_block, diagnoser);
      if (obj.replace_block) is_block_defined(obj.replace_block, diagnoser);
    });
    diagnose_event_trigger(
      name,
      component.on_eat,
      context.source["minecraft:entity"].description.identifier,
      diagnoser
    );
  },
  "minecraft:behavior.eat_mob": (name, component, context, diagnoser) => {
    if (typeof component.loot_table === "string") behaviorpack_loot_table_diagnose(component.loot_table, diagnoser);
  },
  "minecraft:behavior.emerge": (name, component, context, diagnoser) => {
    diagnose_event_trigger(
      name,
      component.on_done,
      context.source["minecraft:entity"].description.identifier,
      diagnoser
    );
  },
  "minecraft:behavior.fire_at_target": (name, component, context, diagnoser) => {
    minecraft_diagnose_filters(component.filters, diagnoser);
    if (typeof component.projectile_def === "string")
      behaviorpack_entityid_diagnose(component.projectile_def, diagnoser);
  },
  "minecraft:behavior.go_and_give_items_to_noteblock": (name, component, context, diagnoser) => {
    diagnose_event_trigger(
      name,
      component.on_item_throw,
      context.source["minecraft:entity"].description.identifier,
      diagnoser
    );
  },
  "minecraft:behavior.go_and_give_items_to_owner": (name, component, context, diagnoser) => {
    diagnose_event_trigger(
      name,
      component.on_item_throw,
      context.source["minecraft:entity"].description.identifier,
      diagnoser
    );
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
    minecraft_diagnose_filters(component.filters, diagnoser);
  },
  "minecraft:behavior.jump_to_block": (name, component, context, diagnoser) => {
    component?.forbidden_blocks?.forEach((block: string) => {
      if (typeof block == "string") is_block_defined(block, diagnoser);
    });
    component?.preferred_blocks?.forEach((block: string) => {
      if (typeof block == "string") is_block_defined(block, diagnoser);
    });
  },
  "minecraft:behavior.knockback_roar": (name, component, context, diagnoser) => {
    minecraft_diagnose_filters(component.damage_filters, diagnoser);
    minecraft_diagnose_filters(component.knockback_filters, diagnoser);
    diagnose_event_trigger(
      name,
      component.on_roar_end,
      context.source["minecraft:entity"].description.identifier,
      diagnoser
    );
  },
  "minecraft:behavior.lay_egg": (name, component, context, diagnoser) => {
    if (typeof component.egg_type == "string") is_block_defined(component.egg_type, diagnoser);
    diagnose_event_trigger(
      name,
      component.on_lay,
      context.source["minecraft:entity"].description.identifier,
      diagnoser
    );
    component?.target_blocks
      ?.filter((block: any) => typeof block === "string")
      .forEach((block: string) => is_block_defined(block, diagnoser));
  },
  "minecraft:behavior.look_at_entity": (name, component, context, diagnoser) => {
    minecraft_diagnose_filters(component.filters, diagnoser);
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
    if (typeof component.mingle_partner_type == "string") {
      behaviorpack_entityid_diagnose(component.mingle_partner_type, diagnoser);
    } else if (Array.isArray(component.mingle_partner_type)) {
      component?.mingle_partner_type?.forEach((id: string) => behaviorpack_entityid_diagnose(id, diagnoser));
    }
  },
  "minecraft:behavior.move_around_target": (name, component, context, diagnoser) => {
    minecraft_diagnose_filters(component.filters, diagnoser);
  },
  "minecraft:behavior.move_to_block": (name, component, context, diagnoser) => {
    const identifier = context.source["minecraft:entity"].description.identifier;
    diagnose_event_trigger(name, component.on_reach, identifier, diagnoser);
    diagnose_event_trigger(name, component.on_stay_completed, identifier, diagnoser);
    component.target_blocks
      ?.filter((block: any) => typeof block === "string")
      .forEach((block: string) => is_block_defined(block, diagnoser));
  },
  "minecraft:behavior.offer_flower": (name, component, context, diagnoser) => {
    minecraft_diagnose_filters(component.filters, diagnoser);
  },
  "minecraft:behavior.pickup_items": (name, component, context, diagnoser) => {
    component?.excluded_items?.forEach((item: string) => {
      behaviorpack_item_diagnose(minecraft_get_item(item, diagnoser.document), diagnoser);
    });
  },
  "minecraft:behavior.place_block": (name, component, context, diagnoser) => {
    minecraft_diagnose_filters(component.can_place, diagnoser);
    diagnose_event_trigger(
      name,
      component.on_place,
      context.source["minecraft:entity"].description.identifier,
      diagnoser
    );
    component?.placeable_carried_blocks?.forEach((entry: any) => {
      if (typeof entry == "string") {
        is_block_defined(entry, diagnoser);
      } else if (typeof entry.name == "string") {
        is_block_defined(entry.name, diagnoser);
      }
    });
    component?.randomly_placeable_blocks?.forEach((entry: [any, number]) => {
      if (typeof entry[0] == "string") is_block_defined(entry[0], diagnoser);
      else if (typeof entry[0].name == "string") is_block_defined(entry[0].name, diagnoser);
    });
  },
  "minecraft:behavior.play_dead": (name, component, context, diagnoser) => {
    minecraft_diagnose_filters(component.filters, diagnoser);
  },
  "minecraft:behavior.raid_garden": (name, component, context, diagnoser) => {
    component.blocks?.forEach((block: string) => {
      if (typeof block == "string") is_block_defined(block, diagnoser);
    });
  },
  "minecraft:behavior.ram_attack": (name, component, context, diagnoser) => {
    diagnose_event_trigger(
      name,
      component.on_start,
      context.source["minecraft:entity"].description.identifier,
      diagnoser
    );
  },
  "minecraft:behavior.random_search_and_dig": (name, component, context, diagnoser) => {
    const identifier = context.source["minecraft:entity"].description.identifier;
    diagnose_event_trigger(name, component.on_digging_start, identifier, diagnoser);
    diagnose_event_trigger(name, component.on_fail_during_digging, identifier, diagnoser);
    diagnose_event_trigger(name, component.on_fail_during_searching, identifier, diagnoser);
    diagnose_event_trigger(name, component.on_item_found, identifier, diagnoser);
    diagnose_event_trigger(name, component.on_searching_start, identifier, diagnoser);
    diagnose_event_trigger(name, component.on_success, identifier, diagnoser);
    if (typeof component.item_table === "string") {
      behaviorpack_loot_table_diagnose(component.item_table, diagnoser);
    }
    component.target_blocks
      ?.filter((block: string) => typeof block === "string")
      .forEach((block: string) => is_block_defined(block, diagnoser));
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
    can_only_be_used_by_specific_mob(
      name,
      context,
      diagnoser,
      "minecraft:horse",
      "minecraft:donkey",
      "minecraft:mule",
      "minecraft:skeleton_horse"
    );
  },
  "minecraft:behavior.slime_float": (name, component, context, diagnoser) => {
    can_only_be_used_by_specific_mob(name, context, diagnoser, "minecraft:magma_cube", "minecraft:slime");
  },
  "minecraft:behavior.snacking": (name, component, context, diagnoser) => {
    component.items?.forEach((item: string) => {
      behaviorpack_item_diagnose(minecraft_get_item(item, diagnoser.document), diagnoser);
    });
  },
  "minecraft:behavior.sneeze": (name, component, context, diagnoser) => {
    if (typeof component.loot_table === "string") behaviorpack_loot_table_diagnose(component.loot_table, diagnoser);
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
    diagnose_event_trigger(
      name,
      component.on_attack,
      context.source["minecraft:entity"].description.identifier,
      diagnoser
    );
  },
  "minecraft:behavior.summon_entity": () => {
    //TODO: Complete
  },
  "minecraft:behavior.swoop_attack": (name, component, context, diagnoser) => {
    if (!diagnoser.document.getText().includes("movement.glide"))
      diagnoser.add(
        name,
        "This component requires 'minecraft:movement.glide' to function",
        DiagnosticSeverity.warning,
        "behaviorpack.entity.components.swoop_attack"
      );
  },
  "minecraft:behavior.take_block": (name, component, context, diagnoser) => {
    minecraft_diagnose_filters(component.can_take, diagnoser);
    diagnose_event_trigger(
      name,
      component.on_take,
      context.source["minecraft:entity"].description.identifier,
      diagnoser
    );
    component.blocks?.forEach((entry: any) => {
      if (typeof entry == "string") is_block_defined(entry, diagnoser);
      else if (typeof entry.name == "string") is_block_defined(entry.name, diagnoser);
    });
  },
  "minecraft:behavior.take_flower": (name, component, context, diagnoser) => {
    minecraft_diagnose_filters(component.filters, diagnoser);
  },
  "minecraft:behavior.teleport_to_owner": (name, component, context, diagnoser) => {
    minecraft_diagnose_filters(component.filters, diagnoser);
  },
  "minecraft:behavior.tempt": (name, component, context, diagnoser) => {
    component.items?.forEach((item: string) => {
      behaviorpack_item_diagnose(minecraft_get_item(item, diagnoser.document), diagnoser);
    });
  },
  "minecraft:behavior.timer_flag_1": (name, component, context, diagnoser) => {
    diagnose_event_trigger(
      name,
      component.on_start,
      context.source["minecraft:entity"].description.identifier,
      diagnoser
    );
    diagnose_event_trigger(
      name,
      component.on_end,
      context.source["minecraft:entity"].description.identifier,
      diagnoser
    );
  },
  "minecraft:behavior.timer_flag_2": (name, component, context, diagnoser) => {
    diagnose_event_trigger(
      name,
      component.on_start,
      context.source["minecraft:entity"].description.identifier,
      diagnoser
    );
    diagnose_event_trigger(
      name,
      component.on_end,
      context.source["minecraft:entity"].description.identifier,
      diagnoser
    );
  },
  "minecraft:behavior.timer_flag_3": (name, component, context, diagnoser) => {
    diagnose_event_trigger(
      name,
      component.on_start,
      context.source["minecraft:entity"].description.identifier,
      diagnoser
    );
    diagnose_event_trigger(
      name,
      component.on_end,
      context.source["minecraft:entity"].description.identifier,
      diagnoser
    );
  },
  "minecraft:behavior.transport_items": (name, component, context, diagnoser) => {
    component.source_container_types?.forEach((reference: any) => {
      const element = typeof reference == "string" ? reference : reference.name;
      if (typeof reference !== "string") return;

      if (
        !element.startsWith("minecraft:") ||
        (!element.includes("chest") && !element.includes("barrel") && !element.includes("shulker"))
      )
        diagnoser.add(
          element,
          `Chests, Copper Chests, Barrels, and Shulker Boxes are the only supported containers: ${element}`,
          DiagnosticSeverity.error,
          `behaviorpack.entity.component.transport_items.invalid_container`
        );
    });

    component.destination_container_types?.forEach((reference: any) => {
      const element = typeof reference == "string" ? reference : reference.name;
      if (typeof reference !== "string") return;

      if (
        !element.startsWith("minecraft:") ||
        (!element.includes("chest") && !element.includes("barrel") && !element.includes("shulker"))
      )
        diagnoser.add(
          element,
          `Chests, Copper Chests, Barrels, and Shulker Boxes are the only supported containers: ${element}`,
          DiagnosticSeverity.error,
          `behaviorpack.entity.component.transport_items.invalid_container`
        );
    });

    component.allowed_items?.forEach((item: string) => {
      behaviorpack_item_diagnose(item, diagnoser);
    });

    component.disallowed_items?.forEach((item: string) => {
      behaviorpack_item_diagnose(item, diagnoser);
    });
  },
  "minecraft:behavior.wither_random_attack_pos_goal": (name, component, context, diagnoser) => {
    can_only_be_used_by_specific_mob(name, context, diagnoser, "minecraft:wither");
  },
  "minecraft:behavior.work": (name, component, context, diagnoser) => {
    diagnose_event_trigger(
      name,
      component.on_arrival,
      context.source["minecraft:entity"].description.identifier,
      diagnoser
    );
  },
  "minecraft:behavior.work_composter": (name, component, context, diagnoser) => {
    diagnose_event_trigger(
      name,
      component.on_arrival,
      context.source["minecraft:entity"].description.identifier,
      diagnoser
    );
  },
  "minecraft:addrider": (name, component, context, diagnoser) => {
    if (typeof component.entity_type === "string") behaviorpack_entityid_diagnose(component.entity_type, diagnoser);
  },
  "minecraft:ageable": (name, component, context, diagnoser) => {
    diagnose_event_trigger(
      name,
      component.grow_up,
      context.source["minecraft:entity"].description.identifier,
      diagnoser
    );
    minecraft_diagnose_filters(component.interact_filters, diagnoser);

    component.drop_items?.forEach((item: string) =>
      behaviorpack_item_diagnose(minecraft_get_item(item, diagnoser.document), diagnoser)
    );

    if (Array.isArray(component.feed_items))
      component.feed_items?.forEach((item: string | any) => {
        if (typeof item == "string") {
          behaviorpack_item_diagnose(minecraft_get_item(item, diagnoser.document), diagnoser);
        } else if (typeof item.feed_items == "string") {
          behaviorpack_item_diagnose(minecraft_get_item(item.item, diagnoser.document), diagnoser);
        }
      });
    else if (typeof component.feed_items == "string") {
      behaviorpack_item_diagnose(minecraft_get_item(component.feed_items, diagnoser.document), diagnoser);
    }

    if (typeof component.transform_to_item === "string") {
      behaviorpack_item_diagnose(minecraft_get_item(component.transform_to_item, diagnoser.document), diagnoser);
    }
  },
  "minecraft:anger_level": (name, component, context, diagnoser) => {
    minecraft_diagnose_filters(component.nuisance_filter, diagnoser);
  },
  "minecraft:angry": (name, component, context, diagnoser) => {
    minecraft_diagnose_filters(component.broadcast_filters, diagnoser);
  },
  "minecraft:area_attack": (name, component, context, diagnoser) => {
    minecraft_diagnose_filters(component.entity_filter, diagnoser);
  },
  "minecraft:annotation.break_door": (name, component, context, diagnoser) => {
    const navigatorId = context.components.find((id) => id.startsWith("minecraft:navigation."));
    if (!navigatorId) return;
    const navigationComponent = findValue(context.source["minecraft:entity"], navigatorId);
    if (navigationComponent.can_break_doors !== true)
      diagnoser.add(
        name,
        "Requires the entity's navigation component to have the parameter 'can_break_doors' set to 'true'.",
        DiagnosticSeverity.warning,
        "behaviorpack.entity.component.annotation_break_door"
      );
  },
  "minecraft:barter": (name, component, context, diagnoser) => {
    if (typeof component.barter_table == "string") {
      behaviorpack_loot_table_diagnose(component.barter_table, diagnoser);
    }
  },
  "minecraft:block_sensor": (name, component, context, diagnoser) => {
    component.on_break?.forEach((entry: any) => {
      entry.block_list?.forEach((block: string) => {
        if (typeof block == "string") is_block_defined(block, diagnoser);
      });
    });
    component.sources?.forEach((entry: any) => {
      minecraft_diagnose_filters(entry, diagnoser);
    });
  },
  "minecraft:boostable": (name, component, context, diagnoser) => {
    component.boost_items?.forEach((entry: any) => {
      if (typeof entry.item == "string")
        behaviorpack_item_diagnose(minecraft_get_item(entry.item, diagnoser.document), diagnoser);
      if (typeof entry.replace_item == "string")
        behaviorpack_item_diagnose(minecraft_get_item(entry.replace_item, diagnoser.document), diagnoser);
    });
  },
  "minecraft:break_blocks": (name, component, context, diagnoser) => {
    component.block_list?.forEach((block: string) => {
      if (typeof block == "string") is_block_defined(block, diagnoser);
    });
  },
  "minecraft:breedable": (name, component, context, diagnoser) => {
    minecraft_diagnose_filters(component.love_filters, diagnoser);
    processEntries(component.environment_requirements, (entry: any) => {
      if (typeof entry.blocks === "string") is_block_defined(entry.blocks, diagnoser);
    });
    processEntries(component.breeds_with, (entry: any) => {
      if (typeof entry.baby_type === "string") behaviorpack_entityid_diagnose(entry.baby_type, diagnoser);
      if (typeof entry.mate_type === "string") behaviorpack_entityid_diagnose(entry.mate_type, diagnoser);
      minecraft_diagnose_filters(entry?.breed_event?.filters, diagnoser);
    });

    if (Array.isArray(component.breed_items)) {
      component.breed_items
        ?.filter((item: any) => typeof item === "string")
        .forEach((item: string) => behaviorpack_item_diagnose(minecraft_get_item(item, diagnoser.document), diagnoser));
    } else if (typeof component.breed_items == "string") {
      behaviorpack_item_diagnose(minecraft_get_item(component.breed_items, diagnoser.document), diagnoser);
    }
    if (typeof component.transform_to_item === "string") {
      behaviorpack_item_diagnose(minecraft_get_item(component.transform_to_item, diagnoser.document), diagnoser);
    }
    const text = diagnoser.document.getText();
    if (component.require_tame && !text.includes("minecraft:tameable") && !text.includes("minecraft:tamemount")) {
      diagnoser.add(
        name + "/require_tame",
        "This entity cannot be tamed despite being tamed set as a requirement for breeding",
        DiagnosticSeverity.info,
        "behaviorpack.entity.components.breedable"
      );
    }

    //TODO: minecraft:breedable/property_inheritance
  },
  "minecraft:bribeable": (name, component, context, diagnoser) => {
    component.bribe_items?.forEach((item: string) => {
      behaviorpack_item_diagnose(minecraft_get_item(item, diagnoser.document), diagnoser);
    });
  },
  "minecraft:buoyant": (name, component, context, diagnoser) => {
    component.liquid_blocks?.forEach((block: string) => {
      if (typeof block == "string") is_block_defined(block, diagnoser);
    });
  },
  "minecraft:celebrate_hunt": (name, component, context, diagnoser) => {
    minecraft_diagnose_filters(component.celeberation_targets, diagnoser);
  },
  "minecraft:damage_sensor": (name, component, context, diagnoser) => {
    processEntries(component.triggers, (entry) => {
      minecraft_diagnose_filters(entry.on_damage?.filters, diagnoser);
    });
  },
  "minecraft:dash": deprecated_component('minecraft:dash_action'),
  "minecraft:despawn": (name, component, context, diagnoser) => {
    minecraft_diagnose_filters(component.filters, diagnoser);
  },
  "minecraft:drying_out_timer": (name, component, context, diagnoser) => {
    const identifier = context.source["minecraft:entity"].description.identifier;
    diagnose_event_trigger(name, component.dried_out_event, identifier, diagnoser);
    diagnose_event_trigger(name, component.recover_after_dried_out_event, identifier, diagnoser);
    diagnose_event_trigger(name, component.stopped_drying_out_event, identifier, diagnoser);
  },
  "minecraft:economy_trade_table": check_trade_table,
  "minecraft:entity_sensor": (name, component, context, diagnoser) => {
    if (component.subsensors === undefined) return;
    try {
      if (FormatVersion.isLessThan(FormatVersion.parse(context.source.format_version), [1, 21, 0])) {
        diagnoser.add(
          name,
          `To use "minecraft:entity_sensor/subsensors", you need a "format_version" of 1.21.0 or higher`,
          DiagnosticSeverity.error,
          "behaviorpack.entity.component.entity_sensor"
        );
      }
       
    } catch (err) {
      // Leaving empty as the base diagnoser should flag an invalid format version
    }
    component.subsensors.forEach((sensor: any) => {
      minecraft_diagnose_filters(sensor.event_filters, diagnoser);
      if (typeof sensor.event == "string")
        behaviorpack_entity_event_diagnose(
          sensor.event,
          component + "/" + sensor.event,
          Object.keys(context.source["minecraft:entity"].events || {}),
          diagnoser
        );
    });
  },
  "minecraft:environment_sensor": (name, component, context, diagnoser) => {
    processEntries(component.triggers, (entry) => {
      minecraft_diagnose_filters(entry.filters, diagnoser);
    });
  },
  "minecraft:equip_item": (name, component, context, diagnoser) => {
    component.excluded_items?.forEach((item: string | { item: string }) => {
      behaviorpack_item_diagnose(
        minecraft_get_item(typeof item == "string" ? item : item.item, diagnoser.document),
        diagnoser
      );
    });
  },
  "minecraft:equippable": (name, component, context, diagnoser) => {
    component.slots?.forEach((slot: any) => {
      slot.accepted_items?.forEach((item: string) => {
        behaviorpack_item_diagnose(minecraft_get_item(item, diagnoser.document), diagnoser);
      });
      minecraft_diagnose_filters(slot.on_equip?.filters, diagnoser);
      minecraft_diagnose_filters(slot.on_unequip?.filters, diagnoser);
    });
  },
  "minecraft:giveable": (name, component, context, diagnoser) => {
    component.items?.forEach((item: string) => {
      behaviorpack_item_diagnose(minecraft_get_item(item, diagnoser.document), diagnoser);
    });
    diagnose_event_trigger(
      name,
      component.on_give,
      context.source["minecraft:entity"].description.identifier,
      diagnoser
    );
  },
  "minecraft:healable": (name, component, context, diagnoser) => {
    minecraft_diagnose_filters(component.filters, diagnoser);
    component.items?.forEach((item: string | any) => {
      if (typeof item == "string") behaviorpack_item_diagnose(minecraft_get_item(item, diagnoser.document), diagnoser);
      else if (typeof item.item == "string")
        behaviorpack_item_diagnose(minecraft_get_item(item.item, diagnoser.document), diagnoser);
    });
  },
  "minecraft:home": (name, component, context, diagnoser) => {
    component.home_block_list?.forEach((block: string) => {
      is_block_defined(block, diagnoser);
    });
  },
  "minecraft:input_air_controlled": deprecated_component('minecraft:free_camera_controlled'),
  "minecraft:inside_block_notifier": (name, component, context, diagnoser) => {
    component.block_list?.forEach((entry: any) => {
      if (typeof entry.block == "string") is_block_defined(entry.block, diagnoser);
      else if (typeof entry.block.name == "string") is_block_defined(entry.block.name, diagnoser);
    });
  },
  "minecraft:interact": (name, component, context, diagnoser) => {
    const interactions = Array.isArray(component.interactions) ? component.interactions : [component.interactions];

    interactions?.forEach((entry: any) => {
      diagnose_event_trigger(
        name,
        component.on_interact,
        context.source["minecraft:entity"].description.identifier,
        diagnoser
      );
      if (typeof entry.add_items?.table == "string") behaviorpack_loot_table_diagnose(entry.add_items.table, diagnoser);
      if (typeof entry.spawn_items?.table == "string")
        behaviorpack_loot_table_diagnose(entry.spawn_items.table, diagnoser);
      if (typeof entry.spawn_entities == "string") behaviorpack_entityid_diagnose(entry.spawn_entities, diagnoser);
      else if (Array.isArray(entry.spawn_entities))
        entry.spawn_entities.forEach((id: string) => {
          if (typeof id == "string") behaviorpack_entityid_diagnose(id, diagnoser);
        });
      if (typeof component.transform_to_item === "string")
        behaviorpack_item_diagnose(minecraft_get_item(component.transform_to_item, diagnoser.document), diagnoser);
    });
  },
  "minecraft:leashable": (name, component, context, diagnoser) => {
    diagnose_event_trigger(
      name,
      component.on_leash,
      context.source["minecraft:entity"].description.identifier,
      diagnoser
    );
    diagnose_event_trigger(
      name,
      component.on_unleash,
      context.source["minecraft:entity"].description.identifier,
      diagnoser
    );
  },
  "minecraft:looked_at": (name, component, context, diagnoser) => {
    minecraft_diagnose_filters(component.filters, diagnoser);
    diagnose_event_trigger(
      name,
      component.looked_at_event,
      context.source["minecraft:entity"].description.identifier,
      diagnoser
    );
    diagnose_event_trigger(
      name,
      component.not_looked_at_event,
      context.source["minecraft:entity"].description.identifier,
      diagnoser
    );
  },
  "minecraft:mob_effect": (name, component, context, diagnoser) => {
    minecraft_diagnose_filters(component.entity_filter, diagnoser);
  },
  "minecraft:nameable": (name, component, context, diagnoser) => {
    diagnose_event_trigger(
      name,
      component.default_trigger,
      context.source["minecraft:entity"].description.identifier,
      diagnoser
    );
    component.name_actions?.forEach((entry: any) => {
      minecraft_diagnose_filters(entry.on_named?.filters, diagnoser);
    });
  },
  "minecraft:peek": (name, component, context, diagnoser) => {
    const identifier = context.source["minecraft:entity"].description.identifier;
    diagnose_event_trigger(name, component.on_close, identifier, diagnoser);
    diagnose_event_trigger(name, component.on_open, identifier, diagnoser);
    diagnose_event_trigger(name, component.on_target_open, identifier, diagnoser);
  },
  "minecraft:preferred_path": (name, component, context, diagnoser) => {
    component.preferred_path_blocks?.forEach((entry: any) => {
      entry.blocks.forEach((id: string) => {
        if (typeof id == "string") is_block_defined(id, diagnoser);
      });
    });
  },
  "minecraft:projectile": (name, component, context, diagnoser) => {
    diagnose_event_trigger(
      name,
      component.on_hit?.definition_event?.event_trigger,
      context.source["minecraft:entity"].description.identifier,
      diagnoser
    );
    if (typeof component.on_hit?.spawn_chance?.spawn_definition == "string") {
      behaviorpack_entityid_diagnose(component.on_hit.spawn_chance.spawn_definition, diagnoser);
    }
  },
  "minecraft:rail_sensor": (name, component, context, diagnoser) => {
    diagnose_event_trigger(
      name,
      component.on_activate,
      context.source["minecraft:entity"].description.identifier,
      diagnoser
    );
    diagnose_event_trigger(
      name,
      component.on_deactivate,
      context.source["minecraft:entity"].description.identifier,
      diagnoser
    );
  },
  "minecraft:ravager_blocked": (name, component, context, diagnoser) => {
    component.reaction_choices?.forEach((entry: any) => {
      minecraft_diagnose_filters(entry.value?.filters, diagnoser);
    });
  },
  "minecraft:rideable": (name, component, context, diagnoser) => {
    component.family_types?.forEach((family: string) => {
      minecraft_family_diagnose(family, diagnoser);
    });
    if (typeof component.on_rider_enter_event == "string")
      behaviorpack_entity_event_diagnose(
        component.on_rider_enter_event,
        component + "/" + component.event,
        Object.keys(context.source["minecraft:entity"].events || {}),
        diagnoser
      );
    if (typeof component.on_rider_exit_event == "string")
      behaviorpack_entity_event_diagnose(
        component.on_rider_exit_event,
        component + "/" + component.event,
        Object.keys(context.source["minecraft:entity"].events || {}),
        diagnoser
      );
  },
  "minecraft:scheduler": (name, component, context, diagnoser) => {
    component.scheduled_events?.forEach((entry: any) => {
      minecraft_diagnose_filters(entry.filters, diagnoser);
    });
  },
  "minecraft:shareables": (name, component, context, diagnoser) => {
    component.items?.forEach((entry: any) => {
      behaviorpack_item_diagnose(minecraft_get_item(entry.item, diagnoser.document), diagnoser);
      if (entry.craft_into)
        behaviorpack_item_diagnose(minecraft_get_item(entry.craft_into, diagnoser.document), diagnoser);
      // TODO: Check if entry.barter and then check for barter components
      // TODO: Check if entry.admire and then check for admire components
    });
  },
  "minecraft:shooter": (name, component, context, diagnoser) => {
    behaviorpack_entityid_diagnose(component.def, diagnoser);
    component.projectiles?.forEach((entry: any) => {
      behaviorpack_entityid_diagnose(entry.def, diagnoser);
    });
  },
  "minecraft:sittable": (name, component, context, diagnoser) => {
    diagnose_event_trigger(
      name,
      component.sit_event,
      context.source["minecraft:entity"].description.identifier,
      diagnoser
    );
    diagnose_event_trigger(
      name,
      component.stand_event,
      context.source["minecraft:entity"].description.identifier,
      diagnoser
    );
  },
  "minecraft:spawn_entity": (name, component, context, diagnoser) => {
    processEntries(component.entities, (entry) => {
      minecraft_diagnose_filters(entry.filters, diagnoser);
      minecraft_diagnose_filters(entry.spawn_item_event?.filters, diagnoser);
      if (entry.spawn_item)
        behaviorpack_item_diagnose(minecraft_get_item(entry.spawn_item, diagnoser.document), diagnoser);
      if (!entry.spawn_entity) return;
      behaviorpack_entityid_diagnose(entry.spawn_entity, diagnoser);

      const events = diagnoser.context
        .getProjectData()
        .projectData.behaviorPacks.entities.get(entry.spawn_entity)?.events;

      if (entry.spawn_event && !events?.defined.has(entry.spawn_event)) {
        diagnoser.add(
          name,
          `Trying to call event "${entry.spawn_event}" that does not exist on "${entry.spawn_entity}"`,
          DiagnosticSeverity.warning,
          `behaviorpack.entity.component.spawn_entity`
        );
      }
    });
  },
  "minecraft:tameable": (name, component, context, diagnoser) => {
    normalizeToArray(component.tame_items).forEach((item: string) => {
      behaviorpack_item_diagnose(minecraft_get_item(item, diagnoser.document), diagnoser);
    });
    diagnose_event_trigger(
      name,
      component.tame_event,
      context.source["minecraft:entity"].description.identifier,
      diagnoser
    );
  },
  "minecraft:tamemount": (name, component, context, diagnoser) => {
    component.auto_reject_items?.forEach((entry: any) => {
      behaviorpack_item_diagnose(minecraft_get_item(entry.item, diagnoser.document), diagnoser);
    });
    component.feed_items?.forEach((entry: any) => {
      behaviorpack_item_diagnose(minecraft_get_item(entry.item, diagnoser.document), diagnoser);
    });
    diagnose_event_trigger(
      name,
      component.tame_event,
      context.source["minecraft:entity"].description.identifier,
      diagnoser
    );
  },
  "minecraft:target_nearby_sensor": (name, component, context, diagnoser) => {
    const identifier = context.source["minecraft:entity"].description.identifier;
    diagnose_event_trigger(name, component.on_inside_range, identifier, diagnoser);
    diagnose_event_trigger(name, component.on_outside_range, identifier, diagnoser);
    diagnose_event_trigger(name, component.on_vision_lost_inside_range, identifier, diagnoser);
  },
  "minecraft:timer": (name, component, context, diagnoser) => {
    diagnose_event_trigger(
      name,
      component.time_down_event,
      context.source["minecraft:entity"].description.identifier,
      diagnoser
    );
    if (component.time && component.random_time_choices)
      diagnoser.add(
        name,
        `"time" & "random_time_choices" are incompatible with each other`,
        DiagnosticSeverity.error,
        `behaviorpack.entity.component.timer`
      );
  },
  "minecraft:trade_table": check_trade_table,
  "minecraft:trail": (name, component, context, diagnoser) => {
    if (component.block_type) is_block_defined(component.block_type, diagnoser);
    minecraft_diagnose_filters(component.spawn_filter, diagnoser);
  },
  "minecraft:transformation": (name, component, context, diagnoser) => {
    diagnose_resourcepack_sound(component.begin_transform_sound, diagnoser);
    diagnose_resourcepack_sound(component.transformation_sound, diagnoser);
    if (component.into) behaviorpack_entityid_diagnose(component.into, diagnoser);
  },
  "minecraft:trusting": (name, component, context, diagnoser) => {
    component?.trust_items?.forEach((item: string) => {
      behaviorpack_item_diagnose(minecraft_get_item(item, diagnoser.document), diagnoser);
    });
    diagnose_event_trigger(
      name,
      component.trust_event,
      context.source["minecraft:entity"].description.identifier,
      diagnoser
    );
  },
  "minecraft:equipment": check_loot_table,
  "minecraft:ignore_cannot_be_attacked": (name, component, context, diagnoser) => {
    minecraft_diagnose_filters(component.filters, diagnoser);
  },
  "minecraft:item_controllable": (name, component, context, diagnoser) => {
    normalizeToArray(component?.control_items).forEach((item: string) => {
      behaviorpack_item_diagnose(minecraft_get_item(item, diagnoser.document), diagnoser);
    });
  },
  "minecraft:loot": check_loot_table,
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
      if (FormatVersion.isGreaterThan(FormatVersion.parse(context.source.format_version), [1, 10, 0])) {
        diagnoser.add(
          name,
          `To use "minecraft:fall_damage", you need a "format_version" of 1.10.0 or lesser`,
          DiagnosticSeverity.error,
          "behaviorpack.entity.component.fall_damage"
        );
      }
       
    } catch (err) {
      // Leaving empty as the base diagnoser should flag an invalid format version
    }
  },
};

function can_only_be_used_by_specific_mob(
  name: string,
  context: Context<Internal.BehaviorPack.Entity>,
  diagnoser: DocumentDiagnosticsBuilder,
  ...id: string[]
) {
  const { identifier, runtime_identifier } = context.source["minecraft:entity"]?.description ?? {};
  if (id.includes(identifier) || id.includes(runtime_identifier)) return;

  const code = "behaviorpack.entity.components." + id.map((x) => x.slice(10)).join("_") + "_component";

  diagnoser.add(name, `This component can only be used by '${id}'`, DiagnosticSeverity.error, code);
}
function deprecated_component(replacement?: string) {
  const str = replacement ? ", replace with " + replacement : "";

  return component_error(
    `This component is no longer supported${str}. You are recommended to use the latest format version.`,
    "behaviorpack.entity.components.deprecated"
  );
}

function diagnose_event_trigger(
  componentName: string,
  component: any,
  entityId: string,
  diagnoser: DocumentDiagnosticsBuilder
) {
  if (!component) return;
  minecraft_diagnose_filters(component.filters, diagnoser);
  if (typeof component.event == "string") {
    behaviorpack_entity_event_diagnose(
      component.event,
      componentName + "/" + component.event,
      diagnoser.context.getProjectData().projectData.behaviorPacks.entities.get(entityId)?.events,
      diagnoser
    );
  }
}

function processEntries<T>(data: T | T[], callback: (entry: T) => void) {
  if (Array.isArray(data)) {
    data.forEach(callback);
  } else if (data) {
    callback(data);
  }
}

function findValue(obj: any, targetKey: string): any {
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

function normalizeToArray<T>(data: T[] | T | undefined): T[] {
  if (data === undefined) return [];
  if (Array.isArray(data)) return data;

  return [data];
}
