"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.terrain_texture = exports.sound_definitions = exports.sounds = exports.render_controller = exports.particle = exports.music_definitions = exports.model = exports.manifest = exports.item_texture = exports.flipbook_textures = exports.fog = exports.entity = exports.biomes_client = exports.block_culling = exports.blocks = exports.attachable = exports.animation = exports.animation_controller = void 0;
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
      "animation_length": 5,
      "bones": {}
    }
  }
}`;
exports.attachable = `{
  "format_version": "1.20.41",
  "minecraft:attachable": {
    "description": {
      "identifier": "$\{{id}}",
      "materials": {
        "default": "armor",
        "enchanted": "armor_enchanted"
      },
      "textures": {
        "default": "textures/example",
        "enchanted": "textures/misc/enchanted_item_glint"
      },
      "geometry": {
        "default": "geometry.example"
      },
      "scripts": {},
      "render_controllers": [ "controller.render.example" ]
    }
  }
}`;
exports.blocks = `{
  "Example": {
    "textures": "example",
    "sound": "obsidian"
  }
}`;
exports.block_culling = `{
  "format_version": "1.20.60",
  "minecraft:block_culling_rules": {
    "description": {
      "identifier": "$\{{id}}"
    },
    "rules": [
      {
        "part": {
          "bone": "",
          "cube": 0,
          "face": ""
        }
      }
    ]
  }
}`;
exports.biomes_client = `{
  "biomes" : {

  }
}`;
exports.entity = `{
  "format_version": "1.20.41",
  "minecraft:client_entity": {
    "description": {
      "identifier": "$\{{id}}",
      "min_engine_version": "1.8.0",
      "materials": { "default": "entity", "alpha": "entity_alphatest" },
      "textures": { "default": "textures/entity/$\{{id.safe.nonamespace}}/$\{{id.safe.nonamespace}}" },
      "render_controllers": ["controller.render.default"],
      "geometry": { "default": "geometry.$\{{id.safe.nonamespace}}" },
      "animations": {
        "default_pose": "animation.$\{{id.safe.nonamespace}}.default_pose",
        "controller.pose": "controller.animation.$\{{id.safe.nonamespace}}.pose"
      },
      "scripts": {
        "initialize": [
          "variable.example.a = 0;",
          "variable.example.b = 0;"
        ],
        "animate": [
          "controller.pose"
        ]
      }
    }
  }
}`;
exports.fog = `{
  "format_version": "1.20.41",
  "minecraft:fog_settings": {
    "description": {
      "identifier": "$\{{id}}"
    },
    "distance": {
      "air": {
        "fog_color": "#402347",
        "fog_start": 10,
        "fog_end": 100,
        "render_distance_type": "fixed"
      }
    }
  }
}`;
exports.flipbook_textures = `[
  {
    "flipbook_texture": "textures/example",
    "atlas_tile": "example",
    "ticks_per_frame": 15
  }
]`;
exports.item_texture = `{
  "resource_pack_name": "vanilla",
  "texture_data": {
    "example": {
      "textures": "textures/items/example"
    }
  }
}`;
exports.manifest = `{
  "format_version": 2,
  "header": {
    "name": "pack.name",
    "description": "pack.description",
    "uuid": "$\{{uuid}}",
    "version": [1, 0, 0],
    "min_engine_version": [1, 18, 0]
  },
  "modules": [
    {
      "type": "resources",
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
exports.model = `{
  "format_version": "1.20.41",
  "minecraft:geometry": [
    {
      "description": {
        "identifier": "$\{{id}}",
        "texture_width": 16,
        "texture_height": 16,
        "visible_bounds_width": 2,
        "visible_bounds_height": 3,
        "visible_bounds_offset": [0, 0.5, 0]
      },
      "bones": [
        {
          "name": "body",
          "pivot": [0, 0, 0],
          "cubes": [
          ]
        }
      ]
    }
  ]
}`;
exports.music_definitions = `{
  "creative" : {
     "event_name" : "music.game.creative",
     "max_delay" : 180,
     "min_delay" : 60
  },
  "credits" : {
     "event_name" : "music.game.credits",
     "max_delay" : 0,
     "min_delay" : 0
  },
  "crimson_forest" : {
     "event_name" : "music.game.crimson_forest",
     "max_delay" : 180,
     "min_delay" : 60
  },
  "end" : {
     "event_name" : "music.game.end",
     "max_delay" : 180,
     "min_delay" : 60
  },
  "endboss" : {
     "event_name" : "music.game.endboss",
     "max_delay" : 180,
     "min_delay" : 60
  },
  "game" : {
     "event_name" : "music.game",
     "max_delay" : 1200,
     "min_delay" : 600
  },
  "hell" : {
     "event_name" : "music.game.nether_wastes",
     "max_delay" : 180,
     "min_delay" : 60
  },
  "menu" : {
     "event_name" : "music.menu",
     "max_delay" : 30,
     "min_delay" : 0
  },
  "nether" : {
     "event_name" : "music.game.nether",
     "max_delay" : 180,
     "min_delay" : 60
  },
  "soulsand_valley" : {
     "event_name" : "music.game.soulsand_valley",
     "max_delay" : 180,
     "min_delay" : 60
  },
  "water" : {
     "event_name" : "music.game.water",
     "max_delay" : 20,
     "min_delay" : 10
  }
}`;
exports.particle = `{
  "format_version": "1.20.41",
  "particle_effect": {
    "description": {
      "identifier": "$\{{id}}",
      "basic_render_parameters": {
        "material": "particles_alpha",
        "texture": "textures/particle/particles"
      }
    },
    "components": {
    }
  }
}`;
exports.render_controller = `{
  "format_version": "1.20.41",
  "render_controllers": {
    "controller.render.$\{{id}}": {
      "geometry": "Geometry.default",
      "materials": [
        { "*": "Material.default" },
        { "Alpha*": "Material.alpha" }
      ],
      "textures": ["Texture.default"]
    }
  }
}`;
exports.sounds = `{
  "block_sounds" : {
  },
  "entity_sounds" : {
     "defaults" : {
     },
     "entities" : {
     }
  },
  "individual_event_sounds" : {
     "events" : {
     }
  },
  "interactive_sounds" : {
     "block_sounds" : {
     },
     "entity_sounds" : {
     }
  }
}`;
exports.sound_definitions = `{
  "format_version": "1.20.41",
  "sound_definitions" : {
     "example" : {
        "category" : "ambient",
        "sounds" : [
           "sounds/example/fx1",
           "sounds/example/fx2",
           "sounds/example/fx3",
           "sounds/example/fx4"
        ]
     }
  }
}`;
exports.terrain_texture = `{
  "num_mip_levels": 4,
  "padding": 8,
  "resource_pack_name": "vanilla",
  "texture_data": {
    "example": {
      "textures": "textures/blocks/example"
    }
  }
}`;
//# sourceMappingURL=resource-pack.js.map