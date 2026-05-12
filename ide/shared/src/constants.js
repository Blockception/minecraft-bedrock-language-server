"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataSets = exports.RequestTypes = exports.Commands = exports.Identification = exports.Languages = exports.ToolIdentification = void 0;
//max 32
exports.ToolIdentification = 'blockception-minecraft-bedrock';
/** */
var Languages;
(function (Languages) {
    /** */
    Languages.McFunctionIdentifier = 'bc-mcfunction';
    /** */
    Languages.McOtherIdentifier = 'bc-minecraft-other';
    /** */
    Languages.McLanguageIdentifier = 'bc-minecraft-language';
    /** */
    Languages.McProjectIdentifier = 'bc-minecraft-project';
    /** */
    Languages.McMolangIdentifier = 'bc-minecraft-molang';
    /** */
    Languages.JsonIdentifier = 'json';
    /** */
    Languages.JsonCIdentifier = 'jsonc';
})(Languages || (exports.Languages = Languages = {}));
/** */
var Identification;
(function (Identification) {
    /** */
    Identification.SettingsConfigurationIdentifier = 'BC-MC';
})(Identification || (exports.Identification = Identification = {}));
/** */
var Commands;
(function (Commands) {
    /** */
    Commands.DiagnoseProject = 'bc.minecraft.diagnose.project';
    /** */
    Commands.AddLanguageFile = 'bc.minecraft.language.add';
    /** */
    Commands.ScanProjects = 'bc.minecraft.project.scan';
    /** */
    Commands.StoreProject = 'bc.minecraft.project.store';
    /** */
    Commands.ShowVanillaFile = 'bc.minecraft.vanilla.show';
    /** */
    Commands.ShowDocs = 'bc.minecraft.docs.show';
    /** */
    Commands.FillIdByName = 'bc.minecraft.id.fill';
    /** */
    let Files;
    (function (Files) {
        Files.Append = 'bc-files-append';
    })(Files = Commands.Files || (Commands.Files = {}));
    /**The namespace that stores all creation commands */
    let Create;
    (function (Create) {
        Create.Base = 'bc-create-';
        /**The namespace that stores all general creation commands */
        let General;
        (function (General) {
            /**The command to create entities files */
            General.Entity = Create.Base + 'entity';
            /**The command to create language files */
            General.Languages = Create.Base + 'language-all';
            /**The command to create all manifests */
            General.Manifests = Create.Base + 'manifest-all';
            /**The command to create all pack folders (behavior/resource) */
            General.PackFoldersAll = Create.Base + 'pack-folders-all';
            /**The command to create regular used pack folders (behavior/resource) */
            General.PackFoldersRegular = Create.Base + 'pack-folders-regular';
            /**The command to clean empty pack folders (behavior/resource) */
            General.PackFoldersClean = Create.Base + 'pack-folders-clean';
        })(General = Create.General || (Create.General = {}));
        /**
         *
         */
        let Project;
        (function (Project) {
            const PPBase = Create.Base + 'project-';
            /**The command to create world project */
            Project.WorldProject = PPBase + 'world';
            /**The command to create resource pack */
            Project.Resourcepack = PPBase + 'resource-pack';
            /**The command to create behavior pack */
            Project.Behaviorpack = PPBase + 'behavior-pack';
        })(Project = Create.Project || (Create.Project = {}));
        /**The namespace that stores all Behavior pack creation commands */
        let Behaviorpack;
        (function (Behaviorpack) {
            const BPBase = Create.Base + 'behavior-';
            /**The command to create animation controllers files */
            Behaviorpack.Animation_Controller = BPBase + 'animation_controllers';
            /**The command to create animations files */
            Behaviorpack.Animation = BPBase + 'animations';
            /**The command to create block file */
            Behaviorpack.Block = BPBase + 'block';
            /**The command to create entities files */
            Behaviorpack.Entity = BPBase + 'entity';
            /**The command to create entities files */
            Behaviorpack.Dialogue = BPBase + 'dialogue';
            /**The command to create item files */
            Behaviorpack.Item = BPBase + 'item';
            /**The command to create language files */
            Behaviorpack.Languages = BPBase + 'language';
            /**The command to create loot_table files */
            Behaviorpack.Loot_Table = BPBase + 'loot_table';
            /**The command to create all manifests*/
            Behaviorpack.Manifests = BPBase + 'manifest';
            /**The command to create recipe files */
            Behaviorpack.Recipe = BPBase + 'recipe';
            /**The command to create spawn_rule files */
            Behaviorpack.Spawn_Rule = BPBase + 'spawn_rule';
            /**The command to create trading files */
            Behaviorpack.Trading = BPBase + 'trading';
            /**The command to create volume files */
            Behaviorpack.Volume = BPBase + 'volume';
            /**The command to create item catalog files */
            Behaviorpack.Item_Catalog = BPBase + 'item_catalog';
            /**The command to create feature files */
            Behaviorpack.Feature = BPBase + 'feature';
            /**The command to create feature rule files */
            Behaviorpack.Feature_Rule = BPBase + 'feature_rule';
        })(Behaviorpack = Create.Behaviorpack || (Create.Behaviorpack = {}));
        /**The namespace that stores all resourcepack creation commands */
        let Resourcepack;
        (function (Resourcepack) {
            const RPBase = Create.Base + 'resource-';
            /**The command to create animation controllers files */
            Resourcepack.Animation_Controller = RPBase + 'animation_controllers';
            /**The command to create animations files */
            Resourcepack.Animation = RPBase + 'animations';
            /**The command to create animations files */
            Resourcepack.Attachable = RPBase + 'attachable';
            /**The command to create animations files */
            Resourcepack.Biomes_Client = RPBase + 'biomes_client';
            /**The command to create animations files */
            Resourcepack.Blocks = RPBase + 'blocks';
            /**The command to create block_culling rule files */
            Resourcepack.BlockCulling = RPBase + 'block_culling';
            /**The command to create entities files */
            Resourcepack.Entity = RPBase + 'entity';
            /**The command to create flipbook_textures files */
            Resourcepack.Flipbook_Textures = RPBase + 'flipbook_textures';
            /**The command to create fog files */
            Resourcepack.Fog = RPBase + 'fog';
            /**The command to create language files */
            Resourcepack.Languages = RPBase + 'language';
            /**The command to create item texture file */
            Resourcepack.Item_Texture = RPBase + 'item_texture';
            /**The command to create all manifests*/
            Resourcepack.Manifests = RPBase + 'manifest';
            /**The command to create model file */
            Resourcepack.Model = RPBase + 'model';
            /**The command to create the music definitions file */
            Resourcepack.Music_Definitions = RPBase + 'music_definitions';
            /**The command to create the particle file */
            Resourcepack.Particle = RPBase + 'particle';
            /**The command to create the particle file */
            Resourcepack.Render_Controller = RPBase + 'render_controller';
            /**The command to create the sounds file */
            Resourcepack.Sounds = RPBase + 'sounds';
            /**The command to create the sound definitions file */
            Resourcepack.Sound_Definitions = RPBase + 'sound_definitions';
            /**The command to create the terrain texture file */
            Resourcepack.Terrain_Texture = RPBase + 'terrain_texture';
            /**The command to create the terrain texture list file */
            Resourcepack.Texture_List = RPBase + 'texture_list';
        })(Resourcepack = Create.Resourcepack || (Create.Resourcepack = {}));
        /**The namespace that stores all World creation commands */
        let World;
        (function (World) {
            const WPBase = Create.Base + 'world-';
            /**The command to create language files */
            World.Languages = WPBase + 'language';
            /**The command to create all manifests*/
            World.Manifests = WPBase + 'manifest';
        })(World = Create.World || (Create.World = {}));
    })(Create = Commands.Create || (Commands.Create = {}));
    /** */
    let MCProject;
    (function (MCProject) {
        /** */
        MCProject.Create = 'bc.mcproject.create';
    })(MCProject = Commands.MCProject || (Commands.MCProject = {}));
    /** */
    let Export;
    (function (Export) {
        /** Export a single behavior pack or resource pack as a .mcpack file */
        Export.Pack = 'bc.minecraft.export.pack';
        /** Export the full add-on (all packs) as a .mcaddon file */
        Export.Addon = 'bc.minecraft.export.addon';
    })(Export = Commands.Export || (Commands.Export = {}));
    /** */
    let Errors;
    (function (Errors) {
        /** */
        Errors.OpenLastest = 'bc.errors.open_lastest';
    })(Errors = Commands.Errors || (Commands.Errors = {}));
})(Commands || (exports.Commands = Commands = {}));
/** Custom LSP request method identifiers */
var RequestTypes;
(function (RequestTypes) {
    /** The method for requesting a dataset from the server */
    RequestTypes.DataSet = 'bc/minecraft/dataset';
})(RequestTypes || (exports.RequestTypes = RequestTypes = {}));
/** Dataset identifiers for use with RequestTypes.DataSet */
var DataSets;
(function (DataSets) {
    /** Vanilla behavior pack datasets */
    let Vanilla;
    (function (Vanilla) {
        /** Vanilla behavior pack datasets */
        let BehaviorPack;
        (function (BehaviorPack) {
            /** Vanilla biome definitions */
            BehaviorPack.Biomes = 'vanilla/behavior_pack/biomes';
            /** Vanilla block definitions */
            BehaviorPack.Blocks = 'vanilla/behavior_pack/blocks';
            /** Vanilla entity definitions */
            BehaviorPack.Entities = 'vanilla/behavior_pack/entities';
            /** Vanilla feature definitions */
            BehaviorPack.Features = 'vanilla/behavior_pack/features';
            /** Vanilla item definitions */
            BehaviorPack.Items = 'vanilla/behavior_pack/items';
            /** Vanilla loot table definitions */
            BehaviorPack.LootTables = 'vanilla/behavior_pack/loot_tables';
            /** Vanilla trading definitions */
            BehaviorPack.Trading = 'vanilla/behavior_pack/trading';
        })(BehaviorPack = Vanilla.BehaviorPack || (Vanilla.BehaviorPack = {}));
        /** Vanilla resource pack datasets */
        let ResourcePack;
        (function (ResourcePack) {
            /** Vanilla animation controller definitions */
            ResourcePack.AnimationControllers = 'vanilla/resource_pack/animation_controllers';
            /** Vanilla animation definitions */
            ResourcePack.Animations = 'vanilla/resource_pack/animations';
            /** Vanilla resource pack entity definitions */
            ResourcePack.Entities = 'vanilla/resource_pack/entities';
            /** Vanilla fog definitions */
            ResourcePack.Fogs = 'vanilla/resource_pack/fogs';
            /** Vanilla material definitions */
            ResourcePack.Materials = 'vanilla/resource_pack/materials';
            /** Vanilla model definitions */
            ResourcePack.Models = 'vanilla/resource_pack/models';
            /** Vanilla particle definitions */
            ResourcePack.Particles = 'vanilla/resource_pack/particles';
            /** Vanilla render controller definitions */
            ResourcePack.RenderControllers = 'vanilla/resource_pack/render_controllers';
            /** Vanilla sound definitions */
            ResourcePack.Sounds = 'vanilla/resource_pack/sounds';
            /** Vanilla sound file paths */
            ResourcePack.SoundFiles = 'vanilla/resource_pack/sound_files';
            /** Vanilla texture definitions */
            ResourcePack.Textures = 'vanilla/resource_pack/textures';
            /** Vanilla item texture atlas definitions */
            ResourcePack.TextureAtlasItems = 'vanilla/resource_pack/texture_atlas_items';
            /** Vanilla terrain texture atlas definitions */
            ResourcePack.TextureAtlasTerrain = 'vanilla/resource_pack/texture_atlas_terrain';
        })(ResourcePack = Vanilla.ResourcePack || (Vanilla.ResourcePack = {}));
    })(Vanilla = DataSets.Vanilla || (DataSets.Vanilla = {}));
    /** Education edition datasets */
    let Edu;
    (function (Edu) {
        /** Education edition behavior pack datasets */
        let BehaviorPack;
        (function (BehaviorPack) {
            /** Education edition biome definitions */
            BehaviorPack.Biomes = 'edu/behavior_pack/biomes';
            /** Education edition block definitions */
            BehaviorPack.Blocks = 'edu/behavior_pack/blocks';
            /** Education edition entity definitions */
            BehaviorPack.Entities = 'edu/behavior_pack/entities';
            /** Education edition feature definitions */
            BehaviorPack.Features = 'edu/behavior_pack/features';
            /** Education edition item definitions */
            BehaviorPack.Items = 'edu/behavior_pack/items';
            /** Education edition loot table definitions */
            BehaviorPack.LootTables = 'edu/behavior_pack/loot_tables';
            /** Education edition trading definitions */
            BehaviorPack.Trading = 'edu/behavior_pack/trading';
        })(BehaviorPack = Edu.BehaviorPack || (Edu.BehaviorPack = {}));
        /** Education edition resource pack datasets */
        let ResourcePack;
        (function (ResourcePack) {
            /** Education edition animation controller definitions */
            ResourcePack.AnimationControllers = 'edu/resource_pack/animation_controllers';
            /** Education edition animation definitions */
            ResourcePack.Animations = 'edu/resource_pack/animations';
            /** Education edition resource pack entity definitions */
            ResourcePack.Entities = 'edu/resource_pack/entities';
            /** Education edition fog definitions */
            ResourcePack.Fogs = 'edu/resource_pack/fogs';
            /** Education edition material definitions */
            ResourcePack.Materials = 'edu/resource_pack/materials';
            /** Education edition model definitions */
            ResourcePack.Models = 'edu/resource_pack/models';
            /** Education edition particle definitions */
            ResourcePack.Particles = 'edu/resource_pack/particles';
            /** Education edition render controller definitions */
            ResourcePack.RenderControllers = 'edu/resource_pack/render_controllers';
            /** Education edition sound definitions */
            ResourcePack.Sounds = 'edu/resource_pack/sounds';
            /** Education edition sound file paths */
            ResourcePack.SoundFiles = 'edu/resource_pack/sound_files';
            /** Education edition texture definitions */
            ResourcePack.Textures = 'edu/resource_pack/textures';
            /** Education edition item texture atlas definitions */
            ResourcePack.TextureAtlasItems = 'edu/resource_pack/texture_atlas_items';
            /** Education edition terrain texture atlas definitions */
            ResourcePack.TextureAtlasTerrain = 'edu/resource_pack/texture_atlas_terrain';
        })(ResourcePack = Edu.ResourcePack || (Edu.ResourcePack = {}));
    })(Edu = DataSets.Edu || (DataSets.Edu = {}));
    /** General Minecraft datasets */
    let General;
    (function (General) {
        /** Summarized biome identifiers */
        General.Biomes = 'general/biomes';
        /** Summarized block data including block states */
        General.Blocks = 'general/blocks';
        /** Camera preset identifiers */
        General.CameraPresets = 'general/camera_presets';
        /** Item cooldown category identifiers */
        General.CooldownCategories = 'general/cooldown_categories';
        /** Dimension identifiers */
        General.Dimensions = 'general/dimensions';
        /** Status effect identifiers */
        General.Effects = 'general/effects';
        /** Enchantment identifiers */
        General.Enchantments = 'general/enchantments';
        /** Summarized entity data including events and families */
        General.Entities = 'general/entities';
        /** Potion effect identifiers */
        General.PotionEffects = 'general/potion_effects';
        /** Potion type identifiers */
        General.PotionTypes = 'general/potion_types';
        /** Potion modifier identifiers */
        General.PotionModifiers = 'general/potion_modifiers';
    })(General = DataSets.General || (DataSets.General = {}));
})(DataSets || (exports.DataSets = DataSets = {}));
//# sourceMappingURL=constants.js.map