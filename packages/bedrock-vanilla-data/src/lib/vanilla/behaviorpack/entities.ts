/** Notice: Auto generated file, do not edit */

import { Entity } from '../../types/behaviorpack/entity';


export const Entities: Entity[] = 
[
  {
    "id": "minecraft:allay",
    "events": [
      "pickup_item_delay",
      "pickup_item_delay_complete",
      "minecraft:entity_spawned"
    ],
    "families": []
  },
  {
    "id": "minecraft:area_effect_cloud",
    "events": [],
    "families": []
  },
  {
    "id": "minecraft:armadillo",
    "events": [
      "minecraft:entity_spawned",
      "minecraft:entity_born",
      "minecraft:spawn_adult",
      "minecraft:spawn_baby",
      "minecraft:ageable_grow_up",
      "minecraft:no_threat_detected",
      "minecraft:threat_detected",
      "minecraft:unroll",
      "minecraft:roll_up",
      "minecraft:start_peeking",
      "minecraft:stop_peeking",
      "minecraft:start_unrolling"
    ],
    "families": []
  },
  {
    "id": "minecraft:armor_stand",
    "events": [],
    "families": []
  },
  {
    "id": "minecraft:arrow",
    "events": [
      "minecraft:entity_spawned"
    ],
    "families": []
  },
  {
    "id": "minecraft:axolotl",
    "events": [
      "minecraft:entity_spawned",
      "attack_cooldown_complete_event",
      "killed_enemy_event",
      "minecraft:entity_born",
      "minecraft:ageable_grow_up",
      "stop_drying_out",
      "start_drying_out",
      "dried_out",
      "recover_after_dried_out",
      "enter_water"
    ],
    "families": []
  },
  {
    "id": "minecraft:bat",
    "events": [],
    "families": []
  },
  {
    "id": "minecraft:bee",
    "events": [
      "minecraft:entity_spawned",
      "minecraft:entity_born",
      "minecraft:spawn_adult",
      "minecraft:ageable_grow_up",
      "minecraft:exited_disturbed_hive",
      "hive_destroyed",
      "stop_panicking_after_fire",
      "minecraft:exited_hive_on_fire",
      "minecraft:exited_hive",
      "minecraft:hive_full",
      "attacked",
      "calmed_down",
      "collected_nectar",
      "find_hive_event",
      "find_hive_timeout",
      "find_flower_timeout",
      "seek_shelter",
      "abort_sheltering",
      "countdown_to_perish_event",
      "perish_event",
      "fed_open_eyeblossom",
      "on_poison_effect_added",
      "fed_wither_rose",
      "on_wither_effect_added"
    ],
    "families": []
  },
  {
    "id": "minecraft:blaze",
    "events": [
      "minecraft:entity_spawned",
      "switch_to_melee",
      "switch_to_ranged",
      "minecraft:on_hurt_event"
    ],
    "families": []
  },
  {
    "id": "minecraft:boat",
    "events": [
      "minecraft:entity_spawned",
      "minecraft:add_can_ride",
      "minecraft:entered_bubble_column_down",
      "minecraft:entered_bubble_column_up",
      "minecraft:exited_bubble_column",
      "minecraft:sink"
    ],
    "families": []
  },
  {
    "id": "minecraft:bogged",
    "events": [
      "minecraft:entity_spawned",
      "minecraft:melee_mode",
      "minecraft:ranged_mode",
      "be_sheared"
    ],
    "families": []
  },
  {
    "id": "minecraft:breeze",
    "events": [
      "minecraft:start_playing_idle_ground_sound",
      "minecraft:stop_playing_idle_ground_sound"
    ],
    "families": []
  },
  {
    "id": "minecraft:breeze_wind_charge_projectile",
    "events": [],
    "families": []
  },
  {
    "id": "minecraft:camel",
    "events": [
      "minecraft:entity_spawned",
      "minecraft:spawn_adult",
      "minecraft:entity_born",
      "minecraft:ageable_grow_up",
      "minecraft:camel_saddled",
      "minecraft:camel_unsaddled",
      "minecraft:start_sitting",
      "minecraft:stop_sitting"
    ],
    "families": []
  },
  {
    "id": "minecraft:cat",
    "events": [
      "minecraft:entity_spawned",
      "minecraft:spawn_from_village",
      "minecraft:spawn_midnight_cat",
      "minecraft:entity_born",
      "minecraft:spawn_wild_baby",
      "minecraft:spawn_wild_adult",
      "minecraft:spawn_tame_baby",
      "minecraft:spawn_tame_adult",
      "minecraft:ageable_grow_up",
      "minecraft:on_tame",
      "minecraft:pet_slept_with_owner",
      "minecraft:cat_gifted_owner"
    ],
    "families": []
  },
  {
    "id": "minecraft:cave_spider",
    "events": [
      "minecraft:entity_spawned",
      "minecraft:entity_spawned_with_default_jockey",
      "minecraft:entity_spawned_with_biome_specific_jockey",
      "minecraft:become_hostile",
      "minecraft:become_neutral",
      "minecraft:become_angry",
      "minecraft:on_calm"
    ],
    "families": []
  },
  {
    "id": "minecraft:chest_boat",
    "events": [
      "minecraft:entity_spawned",
      "minecraft:add_can_ride",
      "minecraft:entered_bubble_column_down",
      "minecraft:entered_bubble_column_up",
      "minecraft:exited_bubble_column",
      "minecraft:sink"
    ],
    "families": []
  },
  {
    "id": "minecraft:chest_minecart",
    "events": [],
    "families": []
  },
  {
    "id": "minecraft:chicken",
    "events": [
      "minecraft:entity_spawned",
      "minecraft:entity_born",
      "minecraft:ageable_grow_up",
      "minecraft:spawn_adult",
      "minecraft:hatch_warm",
      "minecraft:hatch_cold"
    ],
    "families": []
  },
  {
    "id": "minecraft:cod",
    "events": [],
    "families": []
  },
  {
    "id": "minecraft:command_block_minecart",
    "events": [
      "minecraft:entity_spawned",
      "minecraft:command_block_activate",
      "minecraft:command_block_deactivate"
    ],
    "families": []
  },
  {
    "id": "minecraft:copper_golem",
    "events": [
      "minecraft:entity_spawned",
      "minecraft:begin_oxidizing",
      "minecraft:from_player_spawned",
      "minecraft:from_player_default",
      "minecraft:from_player_exposed",
      "minecraft:from_player_weathered",
      "minecraft:from_player_oxidized",
      "minecraft:from_serialized_entity",
      "minecraft:wax_on",
      "minecraft:wax_off",
      "minecraft:restart_oxidation_timer",
      "minecraft:maximum_oxidation",
      "minecraft:oxidize_copper",
      "minecraft:remove_oxidation_layer",
      "minecraft:transport_items.start_take_succeed",
      "minecraft:transport_items.start_take_fail",
      "minecraft:transport_items.start_place_succeed",
      "minecraft:transport_items.start_place_fail",
      "minecraft:transport_items.stop_interaction",
      "minecraft:become_statue",
      "minecraft:serialize_entity_succeeded",
      "minecraft:on_take_flower",
      "minecraft:on_sheared"
    ],
    "families": []
  },
  {
    "id": "minecraft:cow",
    "events": [
      "minecraft:entity_spawned",
      "minecraft:entity_born",
      "minecraft:entity_transformed",
      "minecraft:ageable_grow_up",
      "minecraft:spawn_adult"
    ],
    "families": []
  },
  {
    "id": "minecraft:creaking",
    "events": [
      "minecraft:entity_spawned",
      "minecraft:entity_spawned_by_creaking_heart",
      "minecraft:become_hostile",
      "minecraft:become_neutral",
      "minecraft:on_target_start_looking",
      "minecraft:on_target_stop_looking",
      "minecraft:start_twitching",
      "minecraft:crumble",
      "minecraft:crumble_and_notify_creaking_heart",
      "minecraft:damaged_by_player",
      "minecraft:damaged_by_entity",
      "minecraft:increment_swaying_ticks",
      "minecraft:reset_swaying_ticks"
    ],
    "families": []
  },
  {
    "id": "minecraft:creeper",
    "events": [
      "minecraft:start_exploding_forced",
      "minecraft:start_exploding",
      "minecraft:stop_exploding",
      "minecraft:become_charged"
    ],
    "families": []
  },
  {
    "id": "minecraft:dolphin",
    "events": [
      "minecraft:entity_spawned",
      "ageable_grow_up",
      "become_angry",
      "on_calm",
      "stop_dryingout",
      "start_dryingout",
      "dried_out",
      "recover_after_dried_out",
      "navigation_on_land",
      "navigation_off_land"
    ],
    "families": []
  },
  {
    "id": "minecraft:donkey",
    "events": [
      "minecraft:entity_spawned",
      "minecraft:entity_born",
      "minecraft:spawn_adult",
      "minecraft:spawn_tame_adult",
      "minecraft:on_tame",
      "minecraft:ageable_grow_up",
      "minecraft:on_chest",
      "minecraft:donkey_saddled",
      "minecraft:donkey_unsaddled"
    ],
    "families": []
  },
  {
    "id": "minecraft:dragon_fireball",
    "events": [],
    "families": []
  },
  {
    "id": "minecraft:drowned",
    "events": [
      "minecraft:entity_spawned",
      "minecraft:as_baby",
      "minecraft:as_adult",
      "minecraft:switch_to_melee",
      "minecraft:switch_to_ranged",
      "minecraft:has_target",
      "minecraft:lost_target"
    ],
    "families": []
  },
  {
    "id": "minecraft:egg",
    "events": [
      "minecraft:spawn_temperate",
      "minecraft:spawn_cold",
      "minecraft:spawn_warm"
    ],
    "families": []
  },
  {
    "id": "minecraft:elder_guardian",
    "events": [],
    "families": []
  },
  {
    "id": "minecraft:ender_crystal",
    "events": [
      "minecraft:crystal_explode"
    ],
    "families": []
  },
  {
    "id": "minecraft:ender_dragon",
    "events": [
      "minecraft:entity_spawned",
      "minecraft:start_land",
      "minecraft:start_fly",
      "minecraft:start_death"
    ],
    "families": []
  },
  {
    "id": "minecraft:ender_pearl",
    "events": [
      "minecraft:entity_spawned"
    ],
    "families": []
  },
  {
    "id": "minecraft:enderman",
    "events": [
      "minecraft:entity_spawned",
      "minecraft:become_angry",
      "minecraft:on_calm",
      "minecraft:stopped_riding",
      "minecraft:started_riding"
    ],
    "families": []
  },
  {
    "id": "minecraft:endermite",
    "events": [],
    "families": []
  },
  {
    "id": "minecraft:evocation_illager",
    "events": [
      "minecraft:spawn_for_raid",
      "minecraft:start_celebrating",
      "minecraft:stop_celebrating",
      "minecraft:raid_expired"
    ],
    "families": []
  },
  {
    "id": "minecraft:eye_of_ender_signal",
    "events": [],
    "families": []
  },
  {
    "id": "minecraft:fireball",
    "events": [
      "minecraft:explode"
    ],
    "families": []
  },
  {
    "id": "minecraft:fireworks_rocket",
    "events": [],
    "families": []
  },
  {
    "id": "minecraft:fishing_hook",
    "events": [
      "minecraft:entity_spawned"
    ],
    "families": []
  },
  {
    "id": "minecraft:fox",
    "events": [
      "minecraft:entity_spawned",
      "minecraft:entity_born",
      "minecraft:ageable_grow_up",
      "minecraft:fox_configure_thunderstorm",
      "minecraft:fox_configure_day",
      "minecraft:fox_configure_night",
      "minecraft:ambient_normal",
      "minecraft:ambient_sleep",
      "minecraft:ambient_night",
      "minecraft:fox_configure_defending",
      "minecraft:fox_configure_docile_day",
      "minecraft:fox_configure_docile_night"
    ],
    "families": []
  },
  {
    "id": "minecraft:frog",
    "events": [
      "minecraft:entity_spawned",
      "spawn_temperate",
      "spawn_cold",
      "spawn_warm",
      "minecraft:entity_transformed",
      "become_pregnant",
      "laid_egg"
    ],
    "families": []
  },
  {
    "id": "minecraft:ghast",
    "events": [],
    "families": []
  },
  {
    "id": "minecraft:glow_squid",
    "events": [
      "minecraft:entity_spawned"
    ],
    "families": []
  },
  {
    "id": "minecraft:goat",
    "events": [
      "minecraft:entity_spawned",
      "minecraft:entity_born",
      "minecraft:born_default",
      "minecraft:born_screamer",
      "minecraft:ageable_grow_up",
      "start_event",
      "attack_cooldown_complete_event"
    ],
    "families": []
  },
  {
    "id": "minecraft:guardian",
    "events": [
      "minecraft:target_too_close",
      "minecraft:target_far_enough"
    ],
    "families": []
  },
  {
    "id": "minecraft:happy_ghast",
    "events": [
      "minecraft:entity_spawned",
      "minecraft:spawn_adult",
      "minecraft:spawn_baby",
      "minecraft:ageable_grow_up",
      "minecraft:become_immobile",
      "minecraft:become_mobile",
      "minecraft:on_harnessed",
      "minecraft:on_unharnessed",
      "minecraft:on_unleashed",
      "minecraft:on_passenger_mount",
      "minecraft:on_passenger_dismount",
      "minecraft:on_stop_tempting"
    ],
    "families": []
  },
  {
    "id": "minecraft:hoglin",
    "events": [
      "minecraft:entity_spawned",
      "minecraft:entity_born",
      "spawn_adult",
      "spawn_baby",
      "stop_zombification_event",
      "become_zombie_event",
      "start_zombification_event",
      "spawn_adult_unhuntable",
      "minecraft:ageable_grow_up",
      "become_angry_event",
      "become_calm_event",
      "escaped_event",
      "attack_cooldown_complete_event"
    ],
    "families": []
  },
  {
    "id": "minecraft:hopper_minecart",
    "events": [
      "minecraft:entity_spawned",
      "minecraft:hopper_activate",
      "minecraft:hopper_deactivate"
    ],
    "families": []
  },
  {
    "id": "minecraft:horse",
    "events": [
      "minecraft:entity_spawned",
      "minecraft:entity_born",
      "minecraft:spawn_adult",
      "minecraft:spawn_tame_adult",
      "minecraft:on_tame",
      "minecraft:ageable_grow_up",
      "minecraft:horse_saddled",
      "minecraft:horse_unsaddled",
      "minecraft:make_white",
      "minecraft:make_creamy",
      "minecraft:make_chestnut",
      "minecraft:make_brown",
      "minecraft:make_black",
      "minecraft:make_gray",
      "minecraft:make_darkbrown"
    ],
    "families": []
  },
  {
    "id": "minecraft:husk",
    "events": [
      "minecraft:entity_spawned",
      "minecraft:start_transforming",
      "minecraft:stop_transforming",
      "minecraft:convert_to_zombie"
    ],
    "families": []
  },
  {
    "id": "minecraft:iron_golem",
    "events": [
      "minecraft:from_player",
      "minecraft:from_village"
    ],
    "families": []
  },
  {
    "id": "minecraft:lightning_bolt",
    "events": [],
    "families": []
  },
  {
    "id": "minecraft:lingering_potion",
    "events": [],
    "families": []
  },
  {
    "id": "minecraft:llama",
    "events": [
      "minecraft:entity_spawned",
      "minecraft:entity_born",
      "minecraft:ageable_grow_up",
      "minecraft:on_tame",
      "minecraft:join_caravan",
      "minecraft:leave_caravan",
      "minecraft:mad_at_wolf",
      "minecraft:become_angry",
      "minecraft:on_calm",
      "minecraft:on_leash",
      "minecraft:on_unleash",
      "minecraft:on_chest",
      "minecraft:add_attributes",
      "minecraft:spawn_baby",
      "minecraft:spawn_adult",
      "minecraft:spawn_tame_adult"
    ],
    "families": []
  },
  {
    "id": "minecraft:llama_spit",
    "events": [],
    "families": []
  },
  {
    "id": "minecraft:magma_cube",
    "events": [
      "minecraft:entity_spawned",
      "spawn_small",
      "spawn_medium",
      "spawn_large",
      "minecraft:become_calm",
      "minecraft:become_aggressive"
    ],
    "families": []
  },
  {
    "id": "minecraft:minecart",
    "events": [],
    "families": []
  },
  {
    "id": "minecraft:mooshroom",
    "events": [
      "become_cow",
      "minecraft:entity_spawned",
      "minecraft:entity_born",
      "minecraft:ageable_grow_up",
      "minecraft:flowerless",
      "minecraft:ate_allium",
      "minecraft:ate_cornflower",
      "minecraft:ate_lily",
      "minecraft:ate_rose",
      "minecraft:ate_torchflower",
      "minecraft:ate_open_eyeblossom",
      "minecraft:ate_closed_eyeblossom",
      "minecraft:ate_orchid",
      "minecraft:ate_daisy",
      "minecraft:ate_tulip",
      "minecraft:ate_bluet",
      "minecraft:ate_poppy",
      "minecraft:ate_dandelion",
      "minecraft:become_red",
      "minecraft:become_brown",
      "minecraft:become_brown_adult",
      "minecraft:become_red_adult"
    ],
    "families": []
  },
  {
    "id": "minecraft:mule",
    "events": [
      "minecraft:entity_spawned",
      "minecraft:entity_born",
      "minecraft:spawn_adult",
      "minecraft:spawn_tame_adult",
      "minecraft:on_tame",
      "minecraft:ageable_grow_up",
      "minecraft:on_chest",
      "minecraft:mule_saddled",
      "minecraft:mule_unsaddled"
    ],
    "families": []
  },
  {
    "id": "minecraft:npc",
    "events": [],
    "families": []
  },
  {
    "id": "minecraft:ocelot",
    "events": [
      "minecraft:entity_spawned",
      "minecraft:entity_born",
      "minecraft:entity_born_wild",
      "minecraft:ageable_grow_up",
      "minecraft:on_trust",
      "minecraft:on_leash",
      "minecraft:on_unleash"
    ],
    "families": []
  },
  {
    "id": "minecraft:ominous_item_spawner",
    "events": [],
    "families": []
  },
  {
    "id": "minecraft:panda",
    "events": [
      "minecraft:entity_spawned",
      "minecraft:entity_born",
      "minecraft:ageable_grow_up",
      "minecraft:panda_lazy",
      "minecraft:panda_worried",
      "minecraft:panda_playful",
      "minecraft:panda_brown",
      "minecraft:panda_weak",
      "minecraft:panda_aggressive",
      "minecraft:on_scared",
      "minecraft:baby_on_calm",
      "minecraft:become_angry",
      "minecraft:on_calm"
    ],
    "families": []
  },
  {
    "id": "minecraft:parrot",
    "events": [
      "minecraft:entity_spawned",
      "minecraft:on_tame",
      "minecraft:on_riding_player",
      "minecraft:on_not_riding_player"
    ],
    "families": []
  },
  {
    "id": "minecraft:phantom",
    "events": [],
    "families": []
  },
  {
    "id": "minecraft:pig",
    "events": [
      "become_zombie",
      "minecraft:entity_spawned",
      "minecraft:entity_born",
      "minecraft:ageable_grow_up",
      "minecraft:on_saddled",
      "minecraft:on_unsaddled",
      "minecraft:spawn_adult"
    ],
    "families": []
  },
  {
    "id": "minecraft:piglin",
    "events": [
      "minecraft:entity_spawned",
      "minecraft:entity_born",
      "spawn_adult_no_hunting",
      "spawn_adult",
      "spawn_adult_ranged",
      "spawn_adult_ranged_no_hunting",
      "spawn_adult_melee",
      "spawn_adult_melee_no_hunting",
      "spawn_baby",
      "stop_zombification_event",
      "start_zombification_event",
      "become_angry_event",
      "become_calm_event",
      "attack_cooldown_complete_event",
      "become_zombie_event",
      "important_block_destroyed_event",
      "admire_item_started_event",
      "admire_item_stopped_event"
    ],
    "families": []
  },
  {
    "id": "minecraft:piglin_brute",
    "events": [
      "minecraft:entity_spawned",
      "stop_zombification_event",
      "start_zombification_event",
      "become_angry_event",
      "become_calm_event",
      "become_zombie_event",
      "important_block_destroyed_event",
      "go_back_to_spawn_failed"
    ],
    "families": []
  },
  {
    "id": "minecraft:pillager",
    "events": [
      "minecraft:entity_spawned",
      "minecraft:spawn_for_raid",
      "minecraft:spawn_as_patrol_follower",
      "minecraft:spawn_as_illager_captain",
      "minecraft:promote_to_illager_captain",
      "minecraft:promote_to_patrol_captain",
      "minecraft:melee_mode",
      "minecraft:ranged_mode",
      "minecraft:start_celebrating",
      "minecraft:stop_celebrating",
      "minecraft:raid_expired",
      "minecraft:calm"
    ],
    "families": []
  },
  {
    "id": "minecraft:player",
    "events": [
      "minecraft:gain_raid_omen",
      "minecraft:clear_add_raid_omen",
      "minecraft:trigger_raid",
      "minecraft:remove_raid_trigger"
    ],
    "families": []
  },
  {
    "id": "minecraft:polar_bear",
    "events": [
      "minecraft:entity_spawned",
      "minecraft:entity_born",
      "minecraft:ageable_grow_up",
      "minecraft:on_calm",
      "minecraft:on_anger",
      "minecraft:baby_on_calm",
      "minecraft:on_scared"
    ],
    "families": []
  },
  {
    "id": "minecraft:pufferfish",
    "events": [
      "minecraft:entity_spawned",
      "minecraft:to_full_puff",
      "minecraft:start_half_puff",
      "minecraft:on_half_puff",
      "minecraft:start_full_puff",
      "minecraft:on_full_puff",
      "minecraft:from_full_puff",
      "minecraft:on_deflate",
      "minecraft:on_normal_puff"
    ],
    "families": []
  },
  {
    "id": "minecraft:rabbit",
    "events": [
      "in_desert",
      "in_snow",
      "minecraft:entity_spawned",
      "minecraft:entity_born",
      "grow_up"
    ],
    "families": []
  },
  {
    "id": "minecraft:ravager",
    "events": [
      "minecraft:entity_spawned",
      "minecraft:spawn_for_raid",
      "minecraft:spawn_for_raid_with_evoker_rider",
      "minecraft:spawn_for_raid_with_pillager_rider",
      "minecraft:spawn_with_pillager_rider",
      "minecraft:spawn_with_pillager_captain_rider",
      "minecraft:spawn_with_vindicator_rider",
      "minecraft:spawn_with_vindicator_captain_rider",
      "minecraft:become_stunned",
      "minecraft:start_roar",
      "minecraft:end_roar",
      "minecraft:start_celebrating",
      "minecraft:stop_celebrating",
      "minecraft:raid_expired"
    ],
    "families": []
  },
  {
    "id": "minecraft:salmon",
    "events": [
      "minecraft:entity_spawned"
    ],
    "families": []
  },
  {
    "id": "minecraft:sheep",
    "events": [
      "minecraft:entity_spawned",
      "spawn_adult",
      "spawn_baby",
      "minecraft:entity_born",
      "minecraft:ageable_grow_up",
      "minecraft:on_sheared",
      "minecraft:on_eat_block",
      "wololo",
      "minecraft:temperate_color",
      "minecraft:cold_color",
      "minecraft:warm_color"
    ],
    "families": []
  },
  {
    "id": "minecraft:shulker",
    "events": [
      "minecraft:entity_spawned",
      "minecraft:turn_purple",
      "minecraft:turn_black",
      "minecraft:turn_blue",
      "minecraft:turn_brown",
      "minecraft:turn_cyan",
      "minecraft:turn_gray",
      "minecraft:turn_green",
      "minecraft:turn_light_blue",
      "minecraft:turn_lime",
      "minecraft:turn_magenta",
      "minecraft:turn_orange",
      "minecraft:turn_pink",
      "minecraft:turn_red",
      "minecraft:turn_silver",
      "minecraft:turn_white",
      "minecraft:turn_yellow"
    ],
    "families": []
  },
  {
    "id": "minecraft:shulker_bullet",
    "events": [],
    "families": []
  },
  {
    "id": "minecraft:silverfish",
    "events": [
      "minecraft:entity_spawned",
      "minecraft:become_angry",
      "minecraft:on_calm"
    ],
    "families": []
  },
  {
    "id": "minecraft:skeleton",
    "events": [
      "minecraft:entity_spawned",
      "become_stray_event",
      "got_in_powder_snow",
      "got_out_of_powder_snow",
      "minecraft:spring_trap",
      "minecraft:melee_mode",
      "minecraft:ranged_mode"
    ],
    "families": []
  },
  {
    "id": "minecraft:skeleton_horse",
    "events": [
      "minecraft:entity_spawned",
      "minecraft:set_trap",
      "minecraft:spring_trap"
    ],
    "families": []
  },
  {
    "id": "minecraft:slime",
    "events": [
      "minecraft:entity_spawned",
      "spawn_small",
      "spawn_medium",
      "spawn_large",
      "minecraft:become_calm",
      "minecraft:become_aggressive"
    ],
    "families": []
  },
  {
    "id": "minecraft:small_fireball",
    "events": [],
    "families": []
  },
  {
    "id": "minecraft:sniffer",
    "events": [
      "minecraft:entity_spawned",
      "minecraft:spawn_adult",
      "minecraft:entity_born",
      "on_pregnant",
      "on_egg_spawned",
      "minecraft:ageable_grow_up",
      "on_scenting_success",
      "on_digging_start",
      "on_item_found",
      "on_feeling_happy_end",
      "on_fail_during_searching",
      "on_fail_during_digging",
      "on_search_and_digging_success",
      "on_rising_end"
    ],
    "families": []
  },
  {
    "id": "minecraft:snow_golem",
    "events": [
      "minecraft:on_sheared"
    ],
    "families": []
  },
  {
    "id": "minecraft:snowball",
    "events": [],
    "families": []
  },
  {
    "id": "minecraft:spider",
    "events": [
      "minecraft:entity_spawned",
      "minecraft:entity_spawned_with_default_jockey",
      "minecraft:entity_spawned_with_biome_specific_jockey",
      "minecraft:become_hostile",
      "minecraft:become_neutral",
      "minecraft:become_angry",
      "minecraft:become_calm"
    ],
    "families": []
  },
  {
    "id": "minecraft:splash_potion",
    "events": [],
    "families": []
  },
  {
    "id": "minecraft:squid",
    "events": [
      "minecraft:entity_spawned"
    ],
    "families": []
  },
  {
    "id": "minecraft:stray",
    "events": [
      "minecraft:entity_spawned",
      "change_to_skeleton",
      "minecraft:melee_mode",
      "minecraft:ranged_mode"
    ],
    "families": []
  },
  {
    "id": "minecraft:strider",
    "events": [
      "minecraft:entity_spawned",
      "minecraft:entity_born",
      "spawn_adult",
      "spawn_adult_parent_jockey",
      "spawn_adult_piglin_jockey",
      "spawn_baby",
      "minecraft:spawn_baby_strider_jockey",
      "minecraft:ageable_grow_up",
      "minecraft:on_saddled",
      "minecraft:on_unsaddled",
      "start_suffocating",
      "stop_suffocating",
      "on_not_riding_parent"
    ],
    "families": []
  },
  {
    "id": "minecraft:tadpole",
    "events": [
      "ageable_grow_up"
    ],
    "families": []
  },
  {
    "id": "minecraft:thrown_trident",
    "events": [],
    "families": []
  },
  {
    "id": "minecraft:tnt",
    "events": [
      "from_explosion"
    ],
    "families": []
  },
  {
    "id": "minecraft:tnt_minecart",
    "events": [
      "minecraft:entity_spawned",
      "minecraft:on_prime",
      "minecraft:on_instant_prime"
    ],
    "families": []
  },
  {
    "id": "minecraft:trader_llama",
    "events": [
      "minecraft:entity_spawned",
      "minecraft:entity_born",
      "minecraft:from_wandering_trader",
      "minecraft:ageable_grow_up",
      "minecraft:on_tame",
      "minecraft:remove_persistence",
      "minecraft:join_caravan",
      "minecraft:leave_caravan",
      "minecraft:mad_at_wolf",
      "minecraft:defend_wandering_trader",
      "minecraft:become_angry",
      "minecraft:on_calm",
      "minecraft:on_leash",
      "minecraft:on_unleash",
      "minecraft:on_chest",
      "minecraft:add_attributes",
      "minecraft:spawn_baby",
      "minecraft:spawn_adult"
    ],
    "families": []
  },
  {
    "id": "minecraft:tripod_camera",
    "events": [],
    "families": []
  },
  {
    "id": "minecraft:tropicalfish",
    "events": [
      "minecraft:become_anenonme",
      "minecraft:become_black_tang",
      "minecraft:become_blue_dory",
      "minecraft:become_butterfly_fish",
      "minecraft:become_cichlid",
      "minecraft:become_clownfish",
      "minecraft:become_cc_betta",
      "minecraft:become_dog_fish",
      "minecraft:become_e_red_snapper",
      "minecraft:become_goat_fish",
      "minecraft:become_moorish_idol",
      "minecraft:become_ornate_butterfly",
      "minecraft:become_parrot_fish",
      "minecraft:become_queen_angel_fish",
      "minecraft:become_red_cichlid",
      "minecraft:become_red_lipped_benny",
      "minecraft:become_red_snapper",
      "minecraft:become_threadfin",
      "minecraft:become_tomato_clown",
      "minecraft:become_triggerfish",
      "minecraft:become_yellow_tang",
      "minecraft:become_yellow_tail_parrot",
      "minecraft:entity_spawned"
    ],
    "families": []
  },
  {
    "id": "minecraft:turtle",
    "events": [
      "minecraft:entity_spawned",
      "minecraft:entity_born",
      "minecraft:ageable_grow_up",
      "minecraft:become_pregnant",
      "minecraft:go_lay_egg",
      "minecraft:laid_egg"
    ],
    "families": []
  },
  {
    "id": "minecraft:vex",
    "events": [
      "minecraft:add_damage_timer",
      "minecraft:add_periodic_damage"
    ],
    "families": []
  },
  {
    "id": "minecraft:villager",
    "events": [
      "become_witch",
      "become_zombie",
      "minecraft:entity_spawned",
      "minecraft:entity_transformed",
      "minecraft:entity_born",
      "minecraft:spawn_farmer",
      "minecraft:spawn_librarian",
      "minecraft:spawn_cleric",
      "minecraft:spawn_armorer",
      "minecraft:spawn_butcher",
      "minecraft:ageable_grow_up",
      "minecraft:become_cleric",
      "minecraft:start_celebrating",
      "minecraft:stop_celebrating"
    ],
    "families": []
  },
  {
    "id": "minecraft:villager_v2",
    "events": [
      "become_witch",
      "become_zombie",
      "minecraft:entity_spawned",
      "minecraft:spawn_from_village",
      "minecraft:entity_transformed",
      "minecraft:entity_born",
      "minecraft:spawn_farmer",
      "minecraft:spawn_librarian",
      "minecraft:spawn_cleric",
      "minecraft:spawn_armorer",
      "minecraft:spawn_butcher",
      "minecraft:ageable_grow_up",
      "minecraft:become_unskilled",
      "minecraft:become_cleric",
      "minecraft:become_farmer",
      "minecraft:become_fisherman",
      "minecraft:become_fletcher",
      "minecraft:become_librarian",
      "minecraft:become_cartographer",
      "minecraft:become_armorer",
      "minecraft:become_weaponsmith",
      "minecraft:become_toolsmith",
      "minecraft:become_butcher",
      "minecraft:become_leatherworker",
      "minecraft:become_sheperd",
      "minecraft:become_mason",
      "minecraft:schedule_wander_villager",
      "minecraft:schedule_gather_villager",
      "minecraft:schedule_home_villager",
      "minecraft:schedule_bed_villager",
      "minecraft:schedule_play_villager",
      "minecraft:schedule_work_pro_villager",
      "minecraft:schedule_work_farmer",
      "minecraft:schedule_work_fisher",
      "minecraft:schedule_work_librarian",
      "minecraft:resupply_trades",
      "minecraft:start_celebrating",
      "minecraft:stop_celebrating"
    ],
    "families": []
  },
  {
    "id": "minecraft:vindicator",
    "events": [
      "minecraft:entity_spawned",
      "minecraft:spawn_as_patrol_follower",
      "minecraft:become_aggro",
      "minecraft:stop_aggro",
      "minecraft:start_johnny",
      "minecraft:stop_johnny",
      "minecraft:spawn_for_raid",
      "minecraft:spawn_as_illager_captain",
      "minecraft:promote_to_illager_captain",
      "minecraft:promote_to_patrol_captain",
      "minecraft:start_celebrating",
      "minecraft:stop_celebrating",
      "minecraft:raid_expired"
    ],
    "families": []
  },
  {
    "id": "minecraft:wandering_trader",
    "events": [
      "minecraft:scheduled",
      "minecraft:start_despawn",
      "minecraft:become_scared",
      "minecraft:become_calm"
    ],
    "families": []
  },
  {
    "id": "minecraft:warden",
    "events": [
      "minecraft:spawn_emerging",
      "minecraft:emerged",
      "minecraft:entity_spawned",
      "on_digging_event"
    ],
    "families": []
  },
  {
    "id": "minecraft:wind_charge_projectile",
    "events": [],
    "families": []
  },
  {
    "id": "minecraft:witch",
    "events": [
      "minecraft:spawn_for_raid",
      "minecraft:start_celebrating",
      "minecraft:stop_celebrating",
      "minecraft:raid_expired"
    ],
    "families": []
  },
  {
    "id": "minecraft:wither",
    "events": [
      "minecraft:entity_spawned"
    ],
    "families": []
  },
  {
    "id": "minecraft:wither_skeleton",
    "events": [
      "minecraft:entity_spawned"
    ],
    "families": []
  },
  {
    "id": "minecraft:wither_skull",
    "events": [
      "minecraft:explode"
    ],
    "families": []
  },
  {
    "id": "minecraft:wither_skull_dangerous",
    "events": [
      "minecraft:explode"
    ],
    "families": []
  },
  {
    "id": "minecraft:wolf",
    "events": [
      "minecraft:entity_spawned",
      "minecraft:entity_born",
      "minecraft:spawn_wild_pale",
      "minecraft:spawn_wild_ashen",
      "minecraft:spawn_wild_black",
      "minecraft:spawn_wild_chestnut",
      "minecraft:spawn_wild_rusty",
      "minecraft:spawn_wild_snowy",
      "minecraft:spawn_wild_spotted",
      "minecraft:spawn_wild_striped",
      "minecraft:spawn_wild_woods",
      "minecraft:spawn_wild_baby_or_adult",
      "minecraft:spawn_wild_baby",
      "minecraft:spawn_wild_adult",
      "minecraft:spawn_tame_baby",
      "minecraft:spawn_tame_adult",
      "minecraft:ageable_grow_up",
      "minecraft:ageable_set_baby",
      "minecraft:on_tame",
      "minecraft:increase_max_health",
      "minecraft:become_angry",
      "minecraft:on_calm",
      "minecraft:become_armorable",
      "minecraft:upgrade_to_1_21_100",
      "minecraft:randomize_sound_variant"
    ],
    "families": []
  },
  {
    "id": "minecraft:xp_bottle",
    "events": [],
    "families": []
  },
  {
    "id": "minecraft:xp_orb",
    "events": [],
    "families": []
  },
  {
    "id": "minecraft:zoglin",
    "events": [
      "become_angry_event",
      "become_calm_event",
      "minecraft:entity_transformed",
      "minecraft:entity_spawned",
      "minecraft:as_adult",
      "minecraft:as_baby"
    ],
    "families": []
  },
  {
    "id": "minecraft:zombie",
    "events": [
      "minecraft:entity_spawned",
      "minecraft:as_adult",
      "minecraft:as_baby",
      "minecraft:start_transforming",
      "minecraft:stop_transforming",
      "minecraft:convert_to_drowned"
    ],
    "families": []
  },
  {
    "id": "minecraft:zombie_horse",
    "events": [
      "minecraft:entity_spawned",
      "minecraft:ageable_grow_up"
    ],
    "families": []
  },
  {
    "id": "minecraft:zombie_pigman",
    "events": [
      "minecraft:entity_transformed",
      "minecraft:entity_spawned",
      "minecraft:on_calm",
      "minecraft:become_angry",
      "minecraft:spawn_as_strider_jockey"
    ],
    "families": []
  },
  {
    "id": "minecraft:zombie_villager",
    "events": [
      "villager_converted",
      "minecraft:entity_spawned",
      "minecraft:entity_transformed",
      "minecraft:become_cleric",
      "from_village"
    ],
    "families": []
  },
  {
    "id": "minecraft:zombie_villager_v2",
    "events": [
      "villager_converted",
      "minecraft:entity_spawned",
      "minecraft:spawn_skilled_adult",
      "minecraft:entity_transformed",
      "minecraft:become_cleric",
      "from_village",
      "minecraft:add_biome_and_skin"
    ],
    "families": []
  }
]