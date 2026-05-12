"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.feature_rule = exports.feature = exports.item_catalog = exports.volume = exports.trading = exports.spawn_rule = exports.recipe = exports.manifest = exports.loot_table = exports.item = exports.dialogue = exports.entity = exports.block = exports.animation = exports.animation_controller = void 0;
exports.animation_controller = `{
  "format_version": "1.20.41",
  "animation_controllers" : {
    "controller.animation.$\{{id}}" : {
      "initial_state" : "default",
      "states" : {
        "default" : {
          "animations" : [ "default_animation" ],
          "transitions" : [
            { "state_1" : "query.is_baby" }
          ]
        },
        "state_1" : {
          "animations" : [ "state_animation" ],
          "on_entry": ["@s example:foo"],
          "on_exit": ["/tp @s ~ ~2 ~"],
          "transitions" : [
            { "default" : "!query.is_baby" }
          ]
        }
      }
    }
  }
}`;
exports.animation = `{
  "format_version": "1.20.41",
  "animations": {
    "animation.$\{{id}}": {
      "loop": false,
      "timeline": {
        "0.0": [],
        "1.36": ["/tp @s ~ -40 ~", "/kill @s"]
      },
      "animation_length": 1.5
    }
  }
}`;
exports.block = `{
  "format_version": "1.20.41",
  "minecraft:block": {
    "description": {
      "identifier": "$\{{id}}",
      "register_to_creative_menu": true
    },
    "components": {
    }
  }
}`;
exports.entity = `{
  "format_version": "1.20.41",
  "minecraft:entity": {
    "description": {
      "identifier": "$\{{id}}",
      "is_spawnable": true,
      "is_summonable": true
    },
    "component_groups": {
    },
    "components": {
      "minecraft:type_family": { "family": ["$\{{id.safe.nonamespace}}"] },
      "minecraft:health": { "value": 10, "max": 10 },
      "minecraft:damage_sensor": {
        "triggers": { "cause": "all", "deals_damage": false }
      }
    },
    "events": {
    }
  }
}`;
exports.dialogue = `{
  "format_version": "1.20.41",
  "minecraft:npc_dialogue": {
    "scenes": [
      {
        "scene_tag": "$\{{id.safe.nonamespace}}",
        "npc_name": { "rawtext": [{ "translate": "dialogue.$\{{id.safe.nonamespace}}.name" }] },
        "text": { "rawtext": [{ "translate": "dialogue.$\{{id.safe.nonamespace}}.body", "with": ["\\n"] }] },
        "buttons": []
      }
    ]
  }
}`;
exports.item = `{
  "format_version": "1.20.41",
  "minecraft:item": {
    "description": {
      "identifier": "$\{{id}}"
    },
    "components": {
    }
  }
}`;
exports.loot_table = `{
  "pools": [
    {
      "rolls": 1,
      "entries": [
        {
          "type": "item",
          "name": "minecraft:potato",
          "weight": 1
        }
      ]
    }
  ]
}`;
exports.manifest = `{
  "format_version": 2,
  "header": {
    "name": "pack.name",
    "description": "pack.description",
    "uuid": "$\{{uuid}}",
    "version": [1, 0, 0],
    "min_engine_version": [1, 19, 0]
  },
  "modules": [
    {
      "type": "data",
      "uuid": "$\{{uuid}}",
      "version": [1, 0, 0]
    }
  ],
  "metadata": {
    "authors": [ "$\{{project.attributes:author}}" ],
    "generated_with": {
      "$\{{tool}}": [
        "$\{{tool.version}}"
      ]
    }
  }
}`;
exports.recipe = `{
  "format_version": "1.20.41",
  "minecraft:<type>": {
    "description": {
      "identifier": "$\{{id}}"
    },

    "result": {
      "item": "minecraft:brewing_stand"
    }
  }
}`;
exports.spawn_rule = `{
  "format_version": "1.20.41",
  "minecraft:spawn_rules": {
    "description": {
      "identifier": "$\{{id}}",
      "population_control": "animal"
    },
    "conditions": [
      {
        
      }
    ]
  }
}`;
exports.trading = `{
  "tiers": [
    {
      "trades": [
        {
          "wants": [
            {
              "item": "minecraft:wheat",
              "quantity": {
                "min": 18,
                "max": 22
              }
            }
          ],
          "gives": [
            { "item": "minecraft:emerald" }
          ]
        }
      ]
    }
  ]
}`;
exports.volume = `{
  "format_version": "1.20.41",
  "minecraft:volume": {
    "description": {
      "identifier": "$\{{id}}"
    },
    "components": {
      "minecraft:bounds": {
        "min": [-50, 0, -50],
        "max": [50, 256, 50]
      },
      "minecraft:fog": {
        "fog_identifier": "minecraft:fog_savanna",
        "priority": 1
      }
    }
  }
}
`;
exports.item_catalog = `{
  "format_version": "1.21.100",
  "minecraft:crafting_items_catalog": {
    "categories": [
      {
        "category_name": "equipment",
        "groups": [
          {
            "group_identifier": {
              "icon": "minecraft:diamond_sword",
              "name": "minecraft:itemGroup.name.swords"
            },
            "items": ["minecraft:diamond_sword", "minecraft:iron_sword"]
          }
        ]
      }
    ]
  }
}
`;
exports.feature = `{
  "format_version": "1.16.0",
  "minecraft:single_block_feature": {
    "description": {
      "identifier": "$\{{id}}"
    },
    "places_block": "minecraft:stone",
    "enforce_survivability_rules": false,
    "enforce_placement_rules": false
  }
}`;
exports.feature_rule = `{
  "format_version": "1.13.0",
  "minecraft:feature_rules": {
    "description": {
      "identifier": "$\{{id}}",
      "places_feature": "namespace:feature_name"
    },
    "conditions": {
      "placement_pass": "surface_pass",
      "minecraft:biome_filter": [
        {
          "test": "has_biome_tag",
          "operator": "==",
          "value": "overworld"
        }
      ]
    },
    "distribution": {
      "iterations": 1,
      "x": { "extent": [0, 15] },
      "y": { "extent": [0, 64] },
      "z": { "extent": [0, 15] },
      "scatter_chance": 100
    }
  }
}`;
//# sourceMappingURL=behavior-pack.js.map