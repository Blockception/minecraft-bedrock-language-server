/** Notice: Auto generated file, do not edit */

import { Entity } from '../../types/behaviorpack/entity';


export const Entities: Entity[] = [
  {
    "id": "minecraft:allay",
    "events": [
      "minecraft:entity_spawned",
      "pickup_item_delay_complete",
      "pickup_item_delay"
    ],
    "families": [
      "allay",
      "mob"
    ]
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
    "families": [
      "armadillo",
      "mob"
    ]
  },
  {
    "id": "minecraft:armor_stand",
    "events": [],
    "families": [
      "armor_stand",
      "inanimate",
      "mob"
    ]
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
    "families": [
      "aquatic",
      "axolotl",
      "mob"
    ]
  },
  {
    "id": "minecraft:bat",
    "events": [],
    "families": [
      "bat",
      "mob"
    ]
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
    "families": [
      "bee",
      "mob",
      "arthropod",
      "pacified"
    ]
  },
  {
    "id": "minecraft:blaze",
    "events": [
      "switch_to_melee",
      "minecraft:entity_spawned",
      "minecraft:on_hurt_event",
      "switch_to_ranged"
    ],
    "families": [
      "blaze",
      "monster",
      "mob"
    ]
  },
  {
    "id": "minecraft:boat",
    "events": [
      "minecraft:add_can_ride",
      "minecraft:entered_bubble_column_down",
      "minecraft:exited_bubble_column",
      "minecraft:entered_bubble_column_up",
      "minecraft:entity_spawned",
      "minecraft:sink"
    ],
    "families": [
      "boat",
      "inanimate"
    ]
  },
  {
    "id": "minecraft:bogged",
    "events": [
      "be_sheared",
      "minecraft:melee_mode",
      "minecraft:entity_spawned",
      "minecraft:ranged_mode"
    ],
    "families": [
      "bogged",
      "skeleton",
      "monster",
      "mob",
      "undead"
    ]
  },
  {
    "id": "minecraft:breeze",
    "events": [
      "minecraft:stop_playing_idle_ground_sound",
      "minecraft:start_playing_idle_ground_sound"
    ],
    "families": [
      "breeze",
      "monster",
      "mob"
    ]
  },
  {
    "id": "minecraft:breeze_wind_charge_projectile",
    "events": [],
    "families": [
      "wind_charge",
      "wind_charge_projectile"
    ]
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
    "families": [
      "camel",
      "mob"
    ]
  },
  {
    "id": "minecraft:camel_husk",
    "events": [
      "minecraft:entity_spawned",
      "minecraft:all_riders_dismounted",
      "minecraft:camel_husk_saddled",
      "minecraft:camel_husk_unsaddled",
      "minecraft:rider_mounted",
      "minecraft:stop_sitting",
      "minecraft:start_sitting",
      "minecraft:spawn_with_rider"
    ],
    "families": [
      "camel_husk",
      "mob",
      "undead"
    ]
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
      "minecraft:cat_gifted_owner",
      "minecraft:randomize_sound_variant"
    ],
    "families": [
      "cat",
      "mob"
    ]
  },
  {
    "id": "minecraft:cave_spider",
    "events": [
      "minecraft:become_angry",
      "minecraft:become_hostile",
      "minecraft:entity_spawned_with_biome_specific_jockey",
      "minecraft:become_neutral",
      "minecraft:entity_spawned",
      "minecraft:on_calm",
      "minecraft:entity_spawned_with_default_jockey"
    ],
    "families": [
      "cavespider",
      "monster",
      "arthropod",
      "mob"
    ]
  },
  {
    "id": "minecraft:chest_boat",
    "events": [
      "minecraft:add_can_ride",
      "minecraft:entered_bubble_column_down",
      "minecraft:exited_bubble_column",
      "minecraft:entered_bubble_column_up",
      "minecraft:entity_spawned",
      "minecraft:sink"
    ],
    "families": [
      "boat",
      "inanimate"
    ]
  },
  {
    "id": "minecraft:chest_minecart",
    "events": [],
    "families": [
      "minecart",
      "inanimate"
    ]
  },
  {
    "id": "minecraft:chicken",
    "events": [
      "minecraft:entity_spawned",
      "minecraft:entity_born",
      "minecraft:ageable_grow_up",
      "minecraft:spawn_adult",
      "minecraft:hatch_warm",
      "minecraft:hatch_cold",
      "minecraft:randomize_sound_variant"
    ],
    "families": [
      "chicken",
      "mob"
    ]
  },
  {
    "id": "minecraft:cod",
    "events": [],
    "families": [
      "aquatic",
      "cod",
      "fish"
    ]
  },
  {
    "id": "minecraft:command_block_minecart",
    "events": [
      "minecraft:command_block_activate",
      "minecraft:command_block_deactivate",
      "minecraft:entity_spawned"
    ],
    "families": [
      "minecart",
      "inanimate"
    ]
  },
  {
    "id": "minecraft:copper_golem",
    "events": [
      "minecraft:become_statue",
      "minecraft:begin_oxidizing",
      "minecraft:from_player_weathered",
      "minecraft:from_player_default",
      "minecraft:entity_spawned",
      "minecraft:from_player_exposed",
      "minecraft:transport_items.start_take_succeed",
      "minecraft:from_player_spawned",
      "minecraft:from_player_oxidized",
      "minecraft:transport_items.stop_interaction",
      "minecraft:from_serialized_entity",
      "minecraft:maximum_oxidation",
      "minecraft:on_sheared",
      "minecraft:on_take_flower",
      "minecraft:oxidize_copper",
      "minecraft:remove_oxidation_layer",
      "minecraft:transport_items.start_place_fail",
      "minecraft:restart_oxidation_timer",
      "minecraft:serialize_entity_succeeded",
      "minecraft:transport_items.start_take_fail",
      "minecraft:transport_items.start_place_succeed",
      "minecraft:wax_off",
      "minecraft:wax_on"
    ],
    "families": [
      "copper_golem",
      "mob"
    ]
  },
  {
    "id": "minecraft:cow",
    "events": [
      "minecraft:entity_spawned",
      "minecraft:entity_born",
      "minecraft:entity_transformed",
      "minecraft:ageable_grow_up",
      "minecraft:spawn_adult",
      "minecraft:randomize_sound_variant"
    ],
    "families": [
      "cow",
      "mob"
    ]
  },
  {
    "id": "minecraft:creaking",
    "events": [
      "minecraft:crumble",
      "minecraft:become_hostile",
      "minecraft:become_neutral",
      "minecraft:entity_spawned_by_creaking_heart",
      "minecraft:crumble_and_notify_creaking_heart",
      "minecraft:damaged_by_entity",
      "minecraft:damaged_by_player",
      "minecraft:entity_spawned",
      "minecraft:increment_swaying_ticks",
      "minecraft:on_target_start_looking",
      "minecraft:on_target_stop_looking",
      "minecraft:reset_swaying_ticks",
      "minecraft:start_twitching"
    ],
    "families": [
      "creaking",
      "monster",
      "mob"
    ]
  },
  {
    "id": "minecraft:creeper",
    "events": [
      "minecraft:become_charged",
      "minecraft:stop_exploding",
      "minecraft:start_exploding",
      "minecraft:start_exploding_forced"
    ],
    "families": [
      "creeper",
      "monster",
      "mob"
    ]
  },
  {
    "id": "minecraft:dolphin",
    "events": [
      "minecraft:entity_spawned",
      "minecraft:entity_born",
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
    "families": [
      "aquatic",
      "dolphin",
      "mob"
    ]
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
    "families": [
      "donkey",
      "mob"
    ]
  },
  {
    "id": "minecraft:dragon_fireball",
    "events": [],
    "families": []
  },
  {
    "id": "minecraft:drowned",
    "events": [
      "minecraft:entity_born",
      "minecraft:as_rider",
      "minecraft:as_adult",
      "minecraft:as_baby_jockey",
      "minecraft:as_baby",
      "minecraft:as_ranged_adult",
      "minecraft:as_ranged_baby_jockey",
      "minecraft:as_ranged_baby",
      "minecraft:entity_spawned",
      "minecraft:has_target",
      "minecraft:lost_target",
      "minecraft:switch_to_melee",
      "minecraft:switch_to_ranged"
    ],
    "families": [
      "drowned",
      "baby_undead",
      "zombie",
      "undead",
      "monster",
      "mob"
    ]
  },
  {
    "id": "minecraft:egg",
    "events": [
      "minecraft:spawn_cold",
      "minecraft:spawn_temperate",
      "minecraft:spawn_warm"
    ],
    "families": []
  },
  {
    "id": "minecraft:elder_guardian",
    "events": [],
    "families": [
      "aquatic",
      "guardian_elder",
      "monster",
      "mob"
    ]
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
      "minecraft:start_death",
      "minecraft:start_fly",
      "minecraft:start_land"
    ],
    "families": [
      "dragon",
      "mob"
    ]
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
    "families": [
      "enderman",
      "monster",
      "mob"
    ]
  },
  {
    "id": "minecraft:endermite",
    "events": [],
    "families": [
      "endermite",
      "arthropod",
      "monster",
      "lightweight",
      "mob"
    ]
  },
  {
    "id": "minecraft:evocation_illager",
    "events": [
      "minecraft:raid_expired",
      "minecraft:spawn_for_raid",
      "minecraft:stop_celebrating",
      "minecraft:start_celebrating"
    ],
    "families": [
      "evocation_illager",
      "monster",
      "illager",
      "mob"
    ]
  },
  {
    "id": "minecraft:eye_of_ender_signal",
    "events": [],
    "families": []
  },
  {
    "id": "minecraft:falling_block",
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
    "families": [
      "fox",
      "lightweight",
      "mob"
    ]
  },
  {
    "id": "minecraft:frog",
    "events": [
      "spawn_warm",
      "become_pregnant",
      "laid_egg",
      "spawn_temperate",
      "minecraft:entity_spawned",
      "spawn_cold",
      "minecraft:entity_transformed"
    ],
    "families": [
      "frog",
      "mob"
    ]
  },
  {
    "id": "minecraft:ghast",
    "events": [],
    "families": [
      "ghast",
      "monster",
      "mob"
    ]
  },
  {
    "id": "minecraft:glow_squid",
    "events": [
      "minecraft:entity_born",
      "minecraft:entity_spawned",
      "minecraft:ageable_grow_up"
    ],
    "families": [
      "aquatic",
      "squid",
      "mob"
    ]
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
    "families": [
      "goat",
      "animal"
    ]
  },
  {
    "id": "minecraft:guardian",
    "events": [
      "minecraft:target_far_enough",
      "minecraft:target_too_close"
    ],
    "families": [
      "aquatic",
      "guardian",
      "monster",
      "mob"
    ]
  },
  {
    "id": "minecraft:happy_ghast",
    "events": [
      "minecraft:entity_spawned",
      "minecraft:entity_born",
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
    "families": [
      "happy_ghast",
      "mob"
    ]
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
    "families": [
      "hoglin",
      "hoglin_baby",
      "mob",
      "hoglin_adult",
      "hoglin_huntable"
    ]
  },
  {
    "id": "minecraft:hopper_minecart",
    "events": [
      "minecraft:hopper_activate",
      "minecraft:entity_spawned",
      "minecraft:hopper_deactivate"
    ],
    "families": [
      "minecart",
      "inanimate"
    ]
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
    "families": [
      "horse",
      "mob"
    ]
  },
  {
    "id": "minecraft:husk",
    "events": [
      "minecraft:entity_born",
      "minecraft:spawn_as_rider",
      "minecraft:as_adult",
      "minecraft:stop_transforming",
      "minecraft:on_stop_riding_camel_husk",
      "minecraft:as_baby_jockey",
      "minecraft:as_baby",
      "minecraft:convert_to_zombie",
      "minecraft:entity_spawned",
      "minecraft:on_start_riding_camel_husk",
      "minecraft:start_transforming"
    ],
    "families": [
      "husk",
      "zombie",
      "undead",
      "monster",
      "mob",
      "baby_undead",
      "husk_rider"
    ]
  },
  {
    "id": "minecraft:iron_golem",
    "events": [
      "minecraft:from_player",
      "minecraft:from_village"
    ],
    "families": [
      "irongolem",
      "mob"
    ]
  },
  {
    "id": "minecraft:item",
    "events": [],
    "families": []
  },
  {
    "id": "minecraft:lightning_bolt",
    "events": [],
    "families": [
      "lightning"
    ]
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
    "families": [
      "llama",
      "mob"
    ]
  },
  {
    "id": "minecraft:llama_spit",
    "events": [],
    "families": []
  },
  {
    "id": "minecraft:magma_cube",
    "events": [
      "minecraft:become_aggressive",
      "minecraft:become_calm",
      "spawn_small",
      "spawn_large",
      "minecraft:entity_spawned",
      "spawn_medium"
    ],
    "families": [
      "magmacube",
      "monster",
      "mob"
    ]
  },
  {
    "id": "minecraft:minecart",
    "events": [],
    "families": [
      "minecart",
      "inanimate"
    ]
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
    "families": [
      "mushroomcow",
      "mob"
    ]
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
    "families": [
      "mule",
      "mob"
    ]
  },
  {
    "id": "minecraft:nautilus",
    "events": [
      "minecraft:entity_spawned",
      "minecraft:entity_born",
      "minecraft:spawn_wild_adult",
      "minecraft:spawn_tame_adult",
      "minecraft:spawn_wild_baby",
      "minecraft:spawn_tame_baby",
      "minecraft:ageable_grow_up",
      "minecraft:on_saddled",
      "minecraft:on_saddled_in_water",
      "minecraft:on_saddled_out_of_water",
      "minecraft:on_unsaddled",
      "minecraft:on_armor_equip",
      "minecraft:on_tame",
      "minecraft:on_unleashed",
      "minecraft:on_stop_tempting",
      "minecraft:on_mount",
      "minecraft:on_dismount",
      "minecraft:become_angry",
      "minecraft:on_calm",
      "minecraft:switch_to_player_controlled",
      "minecraft:switch_to_ai_controlled"
    ],
    "families": [
      "aquatic",
      "nautilus",
      "mob"
    ]
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
    "families": [
      "ocelot",
      "mob"
    ]
  },
  {
    "id": "minecraft:ominous_item_spawner",
    "events": [],
    "families": []
  },
  {
    "id": "minecraft:painting",
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
    "families": [
      "panda",
      "panda_aggressive",
      "mob"
    ]
  },
  {
    "id": "minecraft:parched",
    "events": [
      "minecraft:melee_mode",
      "minecraft:entity_spawned",
      "minecraft:ranged_mode"
    ],
    "families": [
      "parched",
      "skeleton",
      "monster",
      "mob",
      "undead"
    ]
  },
  {
    "id": "minecraft:parrot",
    "events": [
      "minecraft:entity_spawned",
      "minecraft:on_tame",
      "minecraft:on_not_riding_player",
      "minecraft:on_riding_player"
    ],
    "families": [
      "parrot_tame",
      "mob",
      "parrot_wild"
    ]
  },
  {
    "id": "minecraft:phantom",
    "events": [],
    "families": [
      "phantom",
      "undead",
      "monster",
      "mob"
    ]
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
      "minecraft:spawn_adult",
      "minecraft:randomize_sound_variant"
    ],
    "families": [
      "pig",
      "mob"
    ]
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
    "families": [
      "piglin",
      "baby_piglin",
      "monster",
      "mob",
      "piglin_hunter"
    ]
  },
  {
    "id": "minecraft:piglin_brute",
    "events": [
      "stop_zombification_event",
      "become_calm_event",
      "become_angry_event",
      "important_block_destroyed_event",
      "become_zombie_event",
      "go_back_to_spawn_failed",
      "minecraft:entity_spawned",
      "start_zombification_event"
    ],
    "families": [
      "piglin",
      "adult_piglin",
      "piglin_brute",
      "monster"
    ]
  },
  {
    "id": "minecraft:pillager",
    "events": [
      "minecraft:ranged_mode",
      "minecraft:calm",
      "minecraft:entity_spawned",
      "minecraft:raid_expired",
      "minecraft:melee_mode",
      "minecraft:promote_to_illager_captain",
      "minecraft:spawn_as_illager_captain",
      "minecraft:promote_to_patrol_captain",
      "minecraft:spawn_as_patrol_follower",
      "minecraft:spawn_for_raid",
      "minecraft:start_celebrating",
      "minecraft:stop_celebrating"
    ],
    "families": [
      "pillager",
      "monster",
      "illager",
      "mob"
    ]
  },
  {
    "id": "minecraft:player",
    "events": [
      "minecraft:clear_add_raid_omen",
      "minecraft:remove_raid_trigger",
      "minecraft:gain_raid_omen",
      "minecraft:trigger_raid"
    ],
    "families": [
      "player"
    ]
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
    "families": [
      "polarbear",
      "mob"
    ]
  },
  {
    "id": "minecraft:pufferfish",
    "events": [
      "minecraft:from_full_puff",
      "minecraft:entity_spawned",
      "minecraft:on_normal_puff",
      "minecraft:on_deflate",
      "minecraft:on_full_puff",
      "minecraft:on_half_puff",
      "minecraft:start_half_puff",
      "minecraft:start_full_puff",
      "minecraft:to_full_puff"
    ],
    "families": [
      "aquatic",
      "pufferfish",
      "fish"
    ]
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
    "families": [
      "rabbit",
      "lightweight",
      "mob"
    ]
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
    "families": [
      "monster",
      "ravager",
      "mob"
    ]
  },
  {
    "id": "minecraft:salmon",
    "events": [
      "minecraft:entity_spawned"
    ],
    "families": [
      "aquatic",
      "salmon",
      "fish"
    ]
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
    "families": [
      "sheep",
      "mob"
    ]
  },
  {
    "id": "minecraft:shulker",
    "events": [
      "minecraft:entity_spawned",
      "minecraft:turn_magenta",
      "minecraft:turn_green",
      "minecraft:turn_black",
      "minecraft:turn_blue",
      "minecraft:turn_pink",
      "minecraft:turn_brown",
      "minecraft:turn_gray",
      "minecraft:turn_cyan",
      "minecraft:turn_light_blue",
      "minecraft:turn_lime",
      "minecraft:turn_orange",
      "minecraft:turn_purple",
      "minecraft:turn_red",
      "minecraft:turn_silver",
      "minecraft:turn_white",
      "minecraft:turn_yellow"
    ],
    "families": [
      "shulker",
      "monster",
      "mob"
    ]
  },
  {
    "id": "minecraft:shulker_bullet",
    "events": [],
    "families": []
  },
  {
    "id": "minecraft:silverfish",
    "events": [
      "minecraft:become_angry",
      "minecraft:entity_spawned",
      "minecraft:on_calm"
    ],
    "families": [
      "silverfish",
      "monster",
      "lightweight",
      "mob",
      "arthropod"
    ]
  },
  {
    "id": "minecraft:skeleton",
    "events": [
      "become_stray_event",
      "got_in_powder_snow",
      "got_out_of_powder_snow",
      "minecraft:melee_mode",
      "minecraft:entity_spawned",
      "minecraft:ranged_mode",
      "minecraft:spring_trap"
    ],
    "families": [
      "skeleton",
      "undead",
      "monster",
      "mob"
    ]
  },
  {
    "id": "minecraft:skeleton_horse",
    "events": [
      "minecraft:entity_spawned",
      "minecraft:entity_born",
      "minecraft:set_trap",
      "minecraft:spring_trap"
    ],
    "families": [
      "skeletonhorse",
      "undead",
      "mob"
    ]
  },
  {
    "id": "minecraft:slime",
    "events": [
      "minecraft:become_aggressive",
      "minecraft:become_calm",
      "spawn_small",
      "spawn_large",
      "minecraft:entity_spawned",
      "spawn_medium"
    ],
    "families": [
      "slime",
      "monster",
      "mob"
    ]
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
    "families": [
      "sniffer",
      "mob"
    ]
  },
  {
    "id": "minecraft:snow_golem",
    "events": [
      "minecraft:on_sheared"
    ],
    "families": [
      "snowgolem",
      "mob"
    ]
  },
  {
    "id": "minecraft:snowball",
    "events": [],
    "families": []
  },
  {
    "id": "minecraft:spider",
    "events": [
      "minecraft:become_angry",
      "minecraft:entity_spawned_with_default_jockey",
      "minecraft:become_calm",
      "minecraft:become_hostile",
      "minecraft:entity_spawned_with_biome_specific_jockey",
      "minecraft:become_neutral",
      "minecraft:entity_spawned"
    ],
    "families": [
      "spider",
      "monster",
      "mob",
      "arthropod"
    ]
  },
  {
    "id": "minecraft:splash_potion",
    "events": [],
    "families": []
  },
  {
    "id": "minecraft:squid",
    "events": [
      "minecraft:entity_born",
      "minecraft:entity_spawned",
      "minecraft:ageable_grow_up"
    ],
    "families": [
      "aquatic",
      "squid",
      "mob"
    ]
  },
  {
    "id": "minecraft:stray",
    "events": [
      "change_to_skeleton",
      "minecraft:melee_mode",
      "minecraft:entity_spawned",
      "minecraft:ranged_mode"
    ],
    "families": [
      "stray",
      "skeleton",
      "monster",
      "mob",
      "undead"
    ]
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
    "families": [
      "strider",
      "mob",
      "strider_baby",
      "strider_adult"
    ]
  },
  {
    "id": "minecraft:tadpole",
    "events": [
      "ageable_grow_up"
    ],
    "families": [
      "aquatic",
      "tadpole",
      "mob"
    ]
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
    "families": [
      "tnt",
      "inanimate"
    ]
  },
  {
    "id": "minecraft:tnt_minecart",
    "events": [
      "minecraft:entity_spawned",
      "minecraft:on_instant_prime",
      "minecraft:on_prime"
    ],
    "families": [
      "minecart",
      "inanimate"
    ]
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
    "families": [
      "trader_llama",
      "llama",
      "mob"
    ]
  },
  {
    "id": "minecraft:tropicalfish",
    "events": [
      "minecraft:become_red_snapper",
      "minecraft:become_anenonme",
      "minecraft:become_cichlid",
      "minecraft:become_black_tang",
      "minecraft:become_blue_dory",
      "minecraft:become_dog_fish",
      "minecraft:become_triggerfish",
      "minecraft:become_butterfly_fish",
      "minecraft:become_cc_betta",
      "minecraft:become_clownfish",
      "minecraft:become_e_red_snapper",
      "minecraft:become_goat_fish",
      "minecraft:become_moorish_idol",
      "minecraft:become_ornate_butterfly",
      "minecraft:become_queen_angel_fish",
      "minecraft:become_parrot_fish",
      "minecraft:become_tomato_clown",
      "minecraft:become_red_cichlid",
      "minecraft:become_red_lipped_benny",
      "minecraft:become_threadfin",
      "minecraft:become_yellow_tail_parrot",
      "minecraft:become_yellow_tang",
      "minecraft:entity_spawned"
    ],
    "families": [
      "aquatic",
      "tropicalfish",
      "fish"
    ]
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
    "families": [
      "aquatic",
      "turtle",
      "baby_turtle",
      "mob"
    ]
  },
  {
    "id": "minecraft:vex",
    "events": [
      "minecraft:add_periodic_damage",
      "minecraft:add_damage_timer"
    ],
    "families": [
      "vex",
      "monster",
      "mob"
    ]
  },
  {
    "id": "minecraft:villager",
    "events": [
      "become_witch",
      "minecraft:entity_transformed",
      "become_zombie",
      "minecraft:ageable_grow_up",
      "minecraft:entity_spawned",
      "minecraft:become_cleric",
      "minecraft:entity_born",
      "minecraft:spawn_cleric",
      "minecraft:spawn_armorer",
      "minecraft:spawn_butcher",
      "minecraft:spawn_farmer",
      "minecraft:spawn_librarian",
      "minecraft:start_celebrating",
      "minecraft:stop_celebrating"
    ],
    "families": [
      "villager",
      "mob",
      "blacksmith",
      "armorer",
      "weaponsmith",
      "artisan",
      "butcher",
      "cartographer",
      "priest",
      "cleric",
      "peasant",
      "farmer",
      "fisherman",
      "fletcher",
      "leatherworker",
      "librarian",
      "shepherd",
      "toolsmith"
    ]
  },
  {
    "id": "minecraft:villager_v2",
    "events": [
      "become_witch",
      "become_zombie",
      "minecraft:stop_celebrating",
      "minecraft:schedule_work_fisher",
      "minecraft:become_farmer",
      "minecraft:start_celebrating",
      "minecraft:become_butcher",
      "minecraft:ageable_grow_up",
      "minecraft:schedule_work_pro_villager",
      "minecraft:become_cleric",
      "minecraft:become_armorer",
      "minecraft:become_cartographer",
      "minecraft:become_fletcher",
      "minecraft:become_fisherman",
      "minecraft:become_leatherworker",
      "minecraft:become_librarian",
      "minecraft:become_mason",
      "minecraft:entity_transformed",
      "minecraft:become_sheperd",
      "minecraft:schedule_play_villager",
      "minecraft:become_toolsmith",
      "minecraft:spawn_from_village",
      "minecraft:schedule_work_farmer",
      "minecraft:become_unskilled",
      "minecraft:become_weaponsmith",
      "minecraft:entity_born",
      "minecraft:entity_spawned",
      "minecraft:resupply_trades",
      "minecraft:schedule_home_villager",
      "minecraft:schedule_bed_villager",
      "minecraft:schedule_gather_villager",
      "minecraft:schedule_wander_villager",
      "minecraft:schedule_work_librarian",
      "minecraft:spawn_cleric",
      "minecraft:spawn_armorer",
      "minecraft:spawn_butcher",
      "minecraft:spawn_farmer",
      "minecraft:spawn_librarian"
    ],
    "families": [
      "villager",
      "mob",
      "blacksmith",
      "armorer",
      "cartographer",
      "weaponsmith",
      "artisan",
      "butcher",
      "priest",
      "cleric",
      "peasant",
      "farmer",
      "fisherman",
      "fletcher",
      "librarian",
      "leatherworker",
      "stone_mason",
      "nitwit",
      "unskilled",
      "shepherd",
      "toolsmith"
    ]
  },
  {
    "id": "minecraft:vindicator",
    "events": [
      "minecraft:spawn_for_raid",
      "minecraft:become_aggro",
      "minecraft:entity_spawned",
      "minecraft:raid_expired",
      "minecraft:promote_to_illager_captain",
      "minecraft:spawn_as_illager_captain",
      "minecraft:promote_to_patrol_captain",
      "minecraft:spawn_as_patrol_follower",
      "minecraft:stop_johnny",
      "minecraft:start_celebrating",
      "minecraft:start_johnny",
      "minecraft:stop_aggro",
      "minecraft:stop_celebrating"
    ],
    "families": [
      "vindicator",
      "monster",
      "illager",
      "mob"
    ]
  },
  {
    "id": "minecraft:wandering_trader",
    "events": [
      "minecraft:become_calm",
      "minecraft:become_scared",
      "minecraft:scheduled",
      "minecraft:start_despawn"
    ],
    "families": [
      "wandering_trader",
      "mob",
      "wandering_trader_despawning"
    ]
  },
  {
    "id": "minecraft:warden",
    "events": [
      "minecraft:emerged",
      "minecraft:spawn_emerging",
      "minecraft:entity_spawned",
      "on_digging_event"
    ],
    "families": [
      "warden",
      "monster",
      "mob"
    ]
  },
  {
    "id": "minecraft:wind_charge_projectile",
    "events": [],
    "families": [
      "wind_charge",
      "wind_charge_projectile"
    ]
  },
  {
    "id": "minecraft:witch",
    "events": [
      "minecraft:raid_expired",
      "minecraft:spawn_for_raid",
      "minecraft:stop_celebrating",
      "minecraft:start_celebrating"
    ],
    "families": [
      "witch",
      "monster",
      "mob"
    ]
  },
  {
    "id": "minecraft:wither",
    "events": [
      "minecraft:entity_spawned"
    ],
    "families": [
      "wither",
      "skeleton",
      "monster",
      "undead",
      "mob"
    ]
  },
  {
    "id": "minecraft:wither_skeleton",
    "events": [
      "minecraft:entity_spawned"
    ],
    "families": [
      "wither",
      "monster",
      "undead",
      "skeleton",
      "mob"
    ]
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
    "families": [
      "wolf",
      "mob"
    ]
  },
  {
    "id": "minecraft:xp_bottle",
    "events": [],
    "families": []
  },
  {
    "id": "minecraft:xp_orb",
    "events": [],
    "families": [
      "inanimate"
    ]
  },
  {
    "id": "minecraft:zoglin",
    "events": [
      "become_calm_event",
      "become_angry_event",
      "minecraft:entity_born",
      "minecraft:as_adult",
      "minecraft:as_baby",
      "minecraft:entity_spawned",
      "minecraft:entity_transformed"
    ],
    "families": [
      "zoglin",
      "zoglin_adult",
      "undead",
      "monster",
      "mob",
      "zoglin_baby"
    ]
  },
  {
    "id": "minecraft:zombie",
    "events": [
      "minecraft:entity_born",
      "minecraft:on_stop_riding_zombie_horse",
      "minecraft:spawn_as_rider",
      "minecraft:as_adult",
      "minecraft:as_baby_jockey",
      "minecraft:as_baby",
      "minecraft:convert_to_drowned",
      "minecraft:entity_spawned",
      "minecraft:on_start_riding_zombie_horse",
      "minecraft:start_transforming",
      "minecraft:stop_transforming"
    ],
    "families": [
      "zombie",
      "undead",
      "monster",
      "mob",
      "baby_undead",
      "zombie_rider"
    ]
  },
  {
    "id": "minecraft:zombie_horse",
    "events": [
      "minecraft:entity_spawned",
      "minecraft:spawn_adult",
      "minecraft:spawn_tame_adult",
      "minecraft:entity_born",
      "minecraft:spawn_adult_with_rider",
      "minecraft:on_tame",
      "minecraft:horse_saddled",
      "minecraft:horse_unsaddled",
      "minecraft:hostile_dismounted",
      "minecraft:hostile_mounted",
      "minecraft:upgrade_to_1_21_130"
    ],
    "families": [
      "zombiehorse",
      "undead",
      "mob"
    ]
  },
  {
    "id": "minecraft:zombie_nautilus",
    "events": [
      "minecraft:on_saddled_in_water",
      "minecraft:on_drowned_dismount",
      "minecraft:on_saddled",
      "minecraft:become_angry",
      "minecraft:on_armor_equip",
      "minecraft:entity_spawned",
      "minecraft:on_player_dismount",
      "minecraft:on_calm",
      "minecraft:on_unleashed",
      "minecraft:on_drowned_mount",
      "minecraft:on_player_mount",
      "minecraft:on_saddled_out_of_water",
      "minecraft:on_stop_tempting",
      "minecraft:on_tame",
      "minecraft:on_unsaddled",
      "minecraft:spawn_tame",
      "minecraft:spawn_wild",
      "minecraft:switch_to_ai_controlled",
      "minecraft:switch_to_player_controlled"
    ],
    "families": [
      "aquatic",
      "zombie_nautilus",
      "undead",
      "monster",
      "mob"
    ]
  },
  {
    "id": "minecraft:zombie_pigman",
    "events": [
      "minecraft:on_calm",
      "minecraft:as_baby",
      "minecraft:entity_born",
      "minecraft:become_angry",
      "minecraft:entity_spawned",
      "spawn_adult",
      "minecraft:entity_transformed",
      "minecraft:spawn_as_strider_jockey",
      "spawn_baby"
    ],
    "families": [
      "baby_undead",
      "baby_zombie_pigman",
      "undead",
      "monster",
      "mob",
      "zombie_pigman"
    ]
  },
  {
    "id": "minecraft:zombie_villager",
    "events": [
      "villager_converted",
      "from_village",
      "minecraft:entity_spawned",
      "minecraft:become_cleric",
      "minecraft:entity_transformed"
    ],
    "families": [
      "armorer",
      "zombie_villager",
      "zombie",
      "undead",
      "monster",
      "mob",
      "cartographer",
      "weaponsmith",
      "butcher",
      "cleric",
      "farmer",
      "fisherman",
      "fletcher",
      "leatherworker",
      "librarian",
      "shepherd",
      "toolsmith"
    ]
  },
  {
    "id": "minecraft:zombie_villager_v2",
    "events": [
      "from_village",
      "minecraft:entity_spawned",
      "minecraft:become_cleric",
      "minecraft:add_biome_and_skin",
      "minecraft:as_baby",
      "minecraft:entity_born",
      "minecraft:entity_transformed",
      "minecraft:spawn_skilled_adult",
      "villager_converted"
    ],
    "families": [
      "cartographer",
      "zombie_villager",
      "zombie",
      "undead",
      "monster",
      "mob",
      "armorer",
      "baby_undead",
      "weaponsmith",
      "butcher",
      "cleric",
      "farmer",
      "fisherman",
      "fletcher",
      "librarian",
      "leatherworker",
      "stone_mason",
      "nitwit",
      "unskilled",
      "shepherd",
      "toolsmith"
    ]
  }
];