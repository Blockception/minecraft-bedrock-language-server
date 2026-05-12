export declare const ToolIdentification = "blockception-minecraft-bedrock";
/** */
export declare namespace Languages {
    /** */
    const McFunctionIdentifier: string;
    /** */
    const McOtherIdentifier: string;
    /** */
    const McLanguageIdentifier: string;
    /** */
    const McProjectIdentifier: string;
    /** */
    const McMolangIdentifier: string;
    /** */
    const JsonIdentifier: string;
    /** */
    const JsonCIdentifier: string;
}
/** */
export declare namespace Identification {
    /** */
    const SettingsConfigurationIdentifier: string;
}
/** */
export declare namespace Commands {
    /** */
    const DiagnoseProject: string;
    /** */
    const AddLanguageFile: string;
    /** */
    const ScanProjects: string;
    /** */
    const StoreProject: string;
    /** */
    const ShowVanillaFile: string;
    /** */
    const ShowDocs: string;
    /** */
    const FillIdByName: string;
    /** */
    namespace Files {
        const Append = "bc-files-append";
    }
    /**The namespace that stores all creation commands */
    namespace Create {
        const Base = "bc-create-";
        /**The namespace that stores all general creation commands */
        namespace General {
            /**The command to create entities files */
            const Entity: string;
            /**The command to create language files */
            const Languages: string;
            /**The command to create all manifests */
            const Manifests: string;
            /**The command to create all pack folders (behavior/resource) */
            const PackFoldersAll: string;
            /**The command to create regular used pack folders (behavior/resource) */
            const PackFoldersRegular: string;
            /**The command to clean empty pack folders (behavior/resource) */
            const PackFoldersClean: string;
        }
        /**
         *
         */
        namespace Project {
            /**The command to create world project */
            const WorldProject: string;
            /**The command to create resource pack */
            const Resourcepack: string;
            /**The command to create behavior pack */
            const Behaviorpack: string;
        }
        /**The namespace that stores all Behavior pack creation commands */
        namespace Behaviorpack {
            /**The command to create animation controllers files */
            const Animation_Controller: string;
            /**The command to create animations files */
            const Animation: string;
            /**The command to create block file */
            const Block: string;
            /**The command to create entities files */
            const Entity: string;
            /**The command to create entities files */
            const Dialogue: string;
            /**The command to create item files */
            const Item: string;
            /**The command to create language files */
            const Languages: string;
            /**The command to create loot_table files */
            const Loot_Table: string;
            /**The command to create all manifests*/
            const Manifests: string;
            /**The command to create recipe files */
            const Recipe: string;
            /**The command to create spawn_rule files */
            const Spawn_Rule: string;
            /**The command to create trading files */
            const Trading: string;
            /**The command to create volume files */
            const Volume: string;
            /**The command to create item catalog files */
            const Item_Catalog: string;
            /**The command to create feature files */
            const Feature: string;
            /**The command to create feature rule files */
            const Feature_Rule: string;
        }
        /**The namespace that stores all resourcepack creation commands */
        namespace Resourcepack {
            /**The command to create animation controllers files */
            const Animation_Controller: string;
            /**The command to create animations files */
            const Animation: string;
            /**The command to create animations files */
            const Attachable: string;
            /**The command to create animations files */
            const Biomes_Client: string;
            /**The command to create animations files */
            const Blocks: string;
            /**The command to create block_culling rule files */
            const BlockCulling: string;
            /**The command to create entities files */
            const Entity: string;
            /**The command to create flipbook_textures files */
            const Flipbook_Textures: string;
            /**The command to create fog files */
            const Fog: string;
            /**The command to create language files */
            const Languages: string;
            /**The command to create item texture file */
            const Item_Texture: string;
            /**The command to create all manifests*/
            const Manifests: string;
            /**The command to create model file */
            const Model: string;
            /**The command to create the music definitions file */
            const Music_Definitions: string;
            /**The command to create the particle file */
            const Particle: string;
            /**The command to create the particle file */
            const Render_Controller: string;
            /**The command to create the sounds file */
            const Sounds: string;
            /**The command to create the sound definitions file */
            const Sound_Definitions: string;
            /**The command to create the terrain texture file */
            const Terrain_Texture: string;
            /**The command to create the terrain texture list file */
            const Texture_List: string;
        }
        /**The namespace that stores all World creation commands */
        namespace World {
            /**The command to create language files */
            const Languages: string;
            /**The command to create all manifests*/
            const Manifests: string;
        }
    }
    /** */
    namespace MCProject {
        /** */
        const Create: string;
    }
    /** */
    namespace Export {
        /** Export a single behavior pack or resource pack as a .mcpack file */
        const Pack: string;
        /** Export the full add-on (all packs) as a .mcaddon file */
        const Addon: string;
    }
    /** */
    namespace Errors {
        /** */
        const OpenLastest = "bc.errors.open_lastest";
    }
}
/** Custom LSP request method identifiers */
export declare namespace RequestTypes {
    /** The method for requesting a dataset from the server */
    const DataSet: string;
}
/** Dataset identifiers for use with RequestTypes.DataSet */
export declare namespace DataSets {
    /** Vanilla behavior pack datasets */
    namespace Vanilla {
        /** Vanilla behavior pack datasets */
        namespace BehaviorPack {
            /** Vanilla biome definitions */
            const Biomes: string;
            /** Vanilla block definitions */
            const Blocks: string;
            /** Vanilla entity definitions */
            const Entities: string;
            /** Vanilla feature definitions */
            const Features: string;
            /** Vanilla item definitions */
            const Items: string;
            /** Vanilla loot table definitions */
            const LootTables: string;
            /** Vanilla trading definitions */
            const Trading: string;
        }
        /** Vanilla resource pack datasets */
        namespace ResourcePack {
            /** Vanilla animation controller definitions */
            const AnimationControllers: string;
            /** Vanilla animation definitions */
            const Animations: string;
            /** Vanilla resource pack entity definitions */
            const Entities: string;
            /** Vanilla fog definitions */
            const Fogs: string;
            /** Vanilla material definitions */
            const Materials: string;
            /** Vanilla model definitions */
            const Models: string;
            /** Vanilla particle definitions */
            const Particles: string;
            /** Vanilla render controller definitions */
            const RenderControllers: string;
            /** Vanilla sound definitions */
            const Sounds: string;
            /** Vanilla sound file paths */
            const SoundFiles: string;
            /** Vanilla texture definitions */
            const Textures: string;
            /** Vanilla item texture atlas definitions */
            const TextureAtlasItems: string;
            /** Vanilla terrain texture atlas definitions */
            const TextureAtlasTerrain: string;
        }
    }
    /** Education edition datasets */
    namespace Edu {
        /** Education edition behavior pack datasets */
        namespace BehaviorPack {
            /** Education edition biome definitions */
            const Biomes: string;
            /** Education edition block definitions */
            const Blocks: string;
            /** Education edition entity definitions */
            const Entities: string;
            /** Education edition feature definitions */
            const Features: string;
            /** Education edition item definitions */
            const Items: string;
            /** Education edition loot table definitions */
            const LootTables: string;
            /** Education edition trading definitions */
            const Trading: string;
        }
        /** Education edition resource pack datasets */
        namespace ResourcePack {
            /** Education edition animation controller definitions */
            const AnimationControllers: string;
            /** Education edition animation definitions */
            const Animations: string;
            /** Education edition resource pack entity definitions */
            const Entities: string;
            /** Education edition fog definitions */
            const Fogs: string;
            /** Education edition material definitions */
            const Materials: string;
            /** Education edition model definitions */
            const Models: string;
            /** Education edition particle definitions */
            const Particles: string;
            /** Education edition render controller definitions */
            const RenderControllers: string;
            /** Education edition sound definitions */
            const Sounds: string;
            /** Education edition sound file paths */
            const SoundFiles: string;
            /** Education edition texture definitions */
            const Textures: string;
            /** Education edition item texture atlas definitions */
            const TextureAtlasItems: string;
            /** Education edition terrain texture atlas definitions */
            const TextureAtlasTerrain: string;
        }
    }
    /** General Minecraft datasets */
    namespace General {
        /** Summarized biome identifiers */
        const Biomes: string;
        /** Summarized block data including block states */
        const Blocks: string;
        /** Camera preset identifiers */
        const CameraPresets: string;
        /** Item cooldown category identifiers */
        const CooldownCategories: string;
        /** Dimension identifiers */
        const Dimensions: string;
        /** Status effect identifiers */
        const Effects: string;
        /** Enchantment identifiers */
        const Enchantments: string;
        /** Summarized entity data including events and families */
        const Entities: string;
        /** Potion effect identifiers */
        const PotionEffects: string;
        /** Potion type identifiers */
        const PotionTypes: string;
        /** Potion modifier identifiers */
        const PotionModifiers: string;
    }
}
//# sourceMappingURL=constants.d.ts.map