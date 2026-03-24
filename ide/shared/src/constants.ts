//max 32
export const ToolIdentification = 'blockception-minecraft-bedrock';

/** */
export namespace Languages {
  /** */
  export const McFunctionIdentifier: string = 'bc-mcfunction';
  /** */
  export const McOtherIdentifier: string = 'bc-minecraft-other';
  /** */
  export const McLanguageIdentifier: string = 'bc-minecraft-language';
  /** */
  export const McProjectIdentifier: string = 'bc-minecraft-project';
  /** */
  export const McMolangIdentifier: string = 'bc-minecraft-molang';
  /** */
  export const JsonIdentifier: string = 'json';
  /** */
  export const JsonCIdentifier: string = 'jsonc';
}

/** */
export namespace Identification {
  /** */
  export const SettingsConfigurationIdentifier: string = 'BC-MC';
}

/** */
export namespace Commands {
  /** */
  export const DiagnoseProject: string = 'bc.minecraft.diagnose.project';
  /** */
  export const AddLanguageFile: string = 'bc.minecraft.language.add';
  /** */
  export const ScanProjects: string = 'bc.minecraft.project.scan';

  /** */
  export const StoreProject: string = 'bc.minecraft.project.store';

  /** */
  export const ShowVanillaFile: string = 'bc.minecraft.vanilla.show';

  /** */
  export const ShowDocs: string = 'bc.minecraft.docs.show';

  /** */
  export const FillIdByName: string = 'bc.minecraft.id.fill';

  /** */
  export namespace Files {
    export const Append = 'bc-files-append';
  }

  /**The namespace that stores all creation commands */
  export namespace Create {
    export const Base = 'bc-create-';

    /**The namespace that stores all general creation commands */
    export namespace General {
      /**The command to create entities files */
      export const Entity: string = Base + 'entity';
      /**The command to create language files */
      export const Languages: string = Base + 'language-all';
      /**The command to create all manifests */
      export const Manifests: string = Base + 'manifest-all';
      /**The command to create all pack folders (behavior/resource) */
      export const PackFoldersAll: string = Base + 'pack-folders-all';
      /**The command to create regular used pack folders (behavior/resource) */
      export const PackFoldersRegular: string = Base + 'pack-folders-regular';
      /**The command to clean empty pack folders (behavior/resource) */
      export const PackFoldersClean: string = Base + 'pack-folders-clean';
    }

    /**
     *
     */
    export namespace Project {
      const PPBase = Base + 'project-';

      /**The command to create world project */
      export const WorldProject: string = PPBase + 'world';
      /**The command to create resource pack */
      export const Resourcepack: string = PPBase + 'resource-pack';
      /**The command to create behavior pack */
      export const Behaviorpack: string = PPBase + 'behavior-pack';
    }

    /**The namespace that stores all Behavior pack creation commands */
    export namespace Behaviorpack {
      const BPBase = Base + 'behavior-';

      /**The command to create animation controllers files */
      export const Animation_Controller: string = BPBase + 'animation_controllers';
      /**The command to create animations files */
      export const Animation: string = BPBase + 'animations';
      /**The command to create block file */
      export const Block: string = BPBase + 'block';
      /**The command to create entities files */
      export const Entity: string = BPBase + 'entity';
      /**The command to create entities files */
      export const Dialogue: string = BPBase + 'dialogue';
      /**The command to create item files */
      export const Item: string = BPBase + 'item';
      /**The command to create language files */
      export const Languages: string = BPBase + 'language';
      /**The command to create loot_table files */
      export const Loot_Table: string = BPBase + 'loot_table';
      /**The command to create all manifests*/
      export const Manifests: string = BPBase + 'manifest';
      /**The command to create recipe files */
      export const Recipe: string = BPBase + 'recipe';
      /**The command to create spawn_rule files */
      export const Spawn_Rule: string = BPBase + 'spawn_rule';
      /**The command to create trading files */
      export const Trading: string = BPBase + 'trading';
      /**The command to create volume files */
      export const Volume: string = BPBase + 'volume';
      /**The command to create item catalog files */
      export const Item_Catalog: string = BPBase + 'item_catalog';
    }

    /**The namespace that stores all resourcepack creation commands */
    export namespace Resourcepack {
      const RPBase = Base + 'resource-';

      /**The command to create animation controllers files */
      export const Animation_Controller: string = RPBase + 'animation_controllers';
      /**The command to create animations files */
      export const Animation: string = RPBase + 'animations';
      /**The command to create animations files */
      export const Attachable: string = RPBase + 'attachable';
      /**The command to create animations files */
      export const Biomes_Client: string = RPBase + 'biomes_client';
      /**The command to create animations files */
      export const Blocks: string = RPBase + 'blocks';
      /**The command to create block_culling rule files */
      export const BlockCulling: string = RPBase + 'block_culling';
      /**The command to create entities files */
      export const Entity: string = RPBase + 'entity';
      /**The command to create flipbook_textures files */
      export const Flipbook_Textures: string = RPBase + 'flipbook_textures';
      /**The command to create fog files */
      export const Fog: string = RPBase + 'fog';
      /**The command to create language files */
      export const Languages: string = RPBase + 'language';
      /**The command to create item texture file */
      export const Item_Texture: string = RPBase + 'item_texture';
      /**The command to create all manifests*/
      export const Manifests: string = RPBase + 'manifest';
      /**The command to create model file */
      export const Model: string = RPBase + 'model';
      /**The command to create the music definitions file */
      export const Music_Definitions: string = RPBase + 'music_definitions';
      /**The command to create the particle file */
      export const Particle: string = RPBase + 'particle';
      /**The command to create the particle file */
      export const Render_Controller: string = RPBase + 'render_controller';
      /**The command to create the sounds file */
      export const Sounds: string = RPBase + 'sounds';
      /**The command to create the sound definitions file */
      export const Sound_Definitions: string = RPBase + 'sound_definitions';
      /**The command to create the terrain texture file */
      export const Terrain_Texture: string = RPBase + 'terrain_texture';
      /**The command to create the terrain texture list file */
      export const Texture_List: string = RPBase + 'texture_list';
    }

    /**The namespace that stores all World creation commands */
    export namespace World {
      const WPBase = Base + 'world-';

      /**The command to create language files */
      export const Languages: string = WPBase + 'language';
      /**The command to create all manifests*/
      export const Manifests: string = WPBase + 'manifest';
    }
  }

  /** */
  export namespace MCProject {
    /** */
    export const Create: string = 'bc.mcproject.create';
  }

  /** */
  export namespace Export {
    /** Export a single behavior pack or resource pack as a .mcpack file */
    export const Pack: string = 'bc.minecraft.export.pack';
    /** Export the full add-on (all packs) as a .mcaddon file */
    export const Addon: string = 'bc.minecraft.export.addon';
  }

  /** */
  export namespace Errors {
    /** */
    export const OpenLastest = 'bc.errors.open_lastest';
  }
}

/** Custom LSP request method identifiers */
export namespace RequestTypes {
  /** The method for requesting a dataset from the server */
  export const DataSet: string = 'bc/minecraft/dataset';
}

/** Dataset identifiers for use with RequestTypes.DataSet */
export namespace DataSets {
  /** Vanilla behavior pack datasets */
  export namespace Vanilla {
    /** Vanilla behavior pack datasets */
    export namespace BehaviorPack {
      /** Vanilla biome definitions */
      export const Biomes: string = 'vanilla/behavior_pack/biomes';
      /** Vanilla block definitions */
      export const Blocks: string = 'vanilla/behavior_pack/blocks';
      /** Vanilla entity definitions */
      export const Entities: string = 'vanilla/behavior_pack/entities';
      /** Vanilla feature definitions */
      export const Features: string = 'vanilla/behavior_pack/features';
      /** Vanilla item definitions */
      export const Items: string = 'vanilla/behavior_pack/items';
      /** Vanilla loot table definitions */
      export const LootTables: string = 'vanilla/behavior_pack/loot_tables';
      /** Vanilla trading definitions */
      export const Trading: string = 'vanilla/behavior_pack/trading';
    }

    /** Vanilla resource pack datasets */
    export namespace ResourcePack {
      /** Vanilla animation controller definitions */
      export const AnimationControllers: string = 'vanilla/resource_pack/animation_controllers';
      /** Vanilla animation definitions */
      export const Animations: string = 'vanilla/resource_pack/animations';
      /** Vanilla resource pack entity definitions */
      export const Entities: string = 'vanilla/resource_pack/entities';
      /** Vanilla fog definitions */
      export const Fogs: string = 'vanilla/resource_pack/fogs';
      /** Vanilla material definitions */
      export const Materials: string = 'vanilla/resource_pack/materials';
      /** Vanilla model definitions */
      export const Models: string = 'vanilla/resource_pack/models';
      /** Vanilla particle definitions */
      export const Particles: string = 'vanilla/resource_pack/particles';
      /** Vanilla render controller definitions */
      export const RenderControllers: string = 'vanilla/resource_pack/render_controllers';
      /** Vanilla sound definitions */
      export const Sounds: string = 'vanilla/resource_pack/sounds';
      /** Vanilla sound file paths */
      export const SoundFiles: string = 'vanilla/resource_pack/sound_files';
      /** Vanilla texture definitions */
      export const Textures: string = 'vanilla/resource_pack/textures';
      /** Vanilla item texture atlas definitions */
      export const TextureAtlasItems: string = 'vanilla/resource_pack/texture_atlas_items';
      /** Vanilla terrain texture atlas definitions */
      export const TextureAtlasTerrain: string = 'vanilla/resource_pack/texture_atlas_terrain';
    }
  }

  /** Education edition datasets */
  export namespace Edu {
    /** Education edition behavior pack datasets */
    export namespace BehaviorPack {
      /** Education edition biome definitions */
      export const Biomes: string = 'edu/behavior_pack/biomes';
      /** Education edition block definitions */
      export const Blocks: string = 'edu/behavior_pack/blocks';
      /** Education edition entity definitions */
      export const Entities: string = 'edu/behavior_pack/entities';
      /** Education edition feature definitions */
      export const Features: string = 'edu/behavior_pack/features';
      /** Education edition item definitions */
      export const Items: string = 'edu/behavior_pack/items';
      /** Education edition loot table definitions */
      export const LootTables: string = 'edu/behavior_pack/loot_tables';
      /** Education edition trading definitions */
      export const Trading: string = 'edu/behavior_pack/trading';
    }

    /** Education edition resource pack datasets */
    export namespace ResourcePack {
      /** Education edition animation controller definitions */
      export const AnimationControllers: string = 'edu/resource_pack/animation_controllers';
      /** Education edition animation definitions */
      export const Animations: string = 'edu/resource_pack/animations';
      /** Education edition resource pack entity definitions */
      export const Entities: string = 'edu/resource_pack/entities';
      /** Education edition fog definitions */
      export const Fogs: string = 'edu/resource_pack/fogs';
      /** Education edition material definitions */
      export const Materials: string = 'edu/resource_pack/materials';
      /** Education edition model definitions */
      export const Models: string = 'edu/resource_pack/models';
      /** Education edition particle definitions */
      export const Particles: string = 'edu/resource_pack/particles';
      /** Education edition render controller definitions */
      export const RenderControllers: string = 'edu/resource_pack/render_controllers';
      /** Education edition sound definitions */
      export const Sounds: string = 'edu/resource_pack/sounds';
      /** Education edition sound file paths */
      export const SoundFiles: string = 'edu/resource_pack/sound_files';
      /** Education edition texture definitions */
      export const Textures: string = 'edu/resource_pack/textures';
      /** Education edition item texture atlas definitions */
      export const TextureAtlasItems: string = 'edu/resource_pack/texture_atlas_items';
      /** Education edition terrain texture atlas definitions */
      export const TextureAtlasTerrain: string = 'edu/resource_pack/texture_atlas_terrain';
    }
  }

  /** General Minecraft datasets */
  export namespace General {
    /** Summarized biome identifiers */
    export const Biomes: string = 'general/biomes';
    /** Summarized block data including block states */
    export const Blocks: string = 'general/blocks';
    /** Camera preset identifiers */
    export const CameraPresets: string = 'general/camera_presets';
    /** Item cooldown category identifiers */
    export const CooldownCategories: string = 'general/cooldown_categories';
    /** Dimension identifiers */
    export const Dimensions: string = 'general/dimensions';
    /** Status effect identifiers */
    export const Effects: string = 'general/effects';
    /** Enchantment identifiers */
    export const Enchantments: string = 'general/enchantments';
    /** Summarized entity data including events and families */
    export const Entities: string = 'general/entities';
    /** Potion effect identifiers */
    export const PotionEffects: string = 'general/potion_effects';
    /** Potion type identifiers */
    export const PotionTypes: string = 'general/potion_types';
    /** Potion modifier identifiers */
    export const PotionModifiers: string = 'general/potion_modifiers';
  }
}
