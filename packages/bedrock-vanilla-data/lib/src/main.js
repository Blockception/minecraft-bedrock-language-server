"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MinecraftData = exports.Types = exports.Edu = exports.Vanilla = exports.MinecraftDataSet = void 0;
const MinecraftDataSet_1 = require("./Lib/Types/MinecraftDataSet");
Object.defineProperty(exports, "MinecraftDataSet", { enumerable: true, get: function () { return MinecraftDataSet_1.MinecraftDataSet; } });
const Lib_1 = require("./Lib/");
Object.defineProperty(exports, "Vanilla", { enumerable: true, get: function () { return Lib_1.Vanilla; } });
Object.defineProperty(exports, "Edu", { enumerable: true, get: function () { return Lib_1.Edu; } });
Object.defineProperty(exports, "Types", { enumerable: true, get: function () { return Lib_1.Types; } });
const Identifiable_1 = require("./Lib/Types/Identifiable");
/**The minecraft vanilla data of RP and BP data*/
var MinecraftData;
(function (MinecraftData) {
    /**The vanilla data set*/
    MinecraftData.vanilla = {
        BehaviorPack: {
            biomes: Lib_1.Vanilla.BehaviorPack.Biomes,
            blocks: Lib_1.Vanilla.BehaviorPack.Blocks,
            entities: Lib_1.Vanilla.BehaviorPack.Entities,
            features: Lib_1.Vanilla.BehaviorPack.Features,
            items: Lib_1.Vanilla.BehaviorPack.Items,
            loot_tables: Lib_1.Vanilla.BehaviorPack.LootTables,
            trading: Lib_1.Vanilla.BehaviorPack.Trading,
        },
        ResourcePack: {
            animation_controllers: Lib_1.Vanilla.ResourcePack.AnimationControllers,
            animations: Lib_1.Vanilla.ResourcePack.Animations,
            entities: Lib_1.Vanilla.ResourcePack.Entities,
            fogs: Lib_1.Vanilla.ResourcePack.Fogs,
            materials: Lib_1.Vanilla.ResourcePack.Materials,
            models: Lib_1.Vanilla.ResourcePack.Models,
            particles: Lib_1.Vanilla.ResourcePack.Particles,
            render_controllers: Lib_1.Vanilla.ResourcePack.RenderControllers,
            sounds: Lib_1.Vanilla.ResourcePack.Sounds,
            sound_files: Lib_1.Vanilla.ResourcePack.SoundFiles,
            textures: Lib_1.Vanilla.ResourcePack.Textures,
            texture_atlas_items: Lib_1.Vanilla.ResourcePack.TextureItems,
            texture_atlas_terrain: Lib_1.Vanilla.ResourcePack.TextureTerrain,
        },
    };
    /**The education data set*/
    MinecraftData.edu = {
        BehaviorPack: {
            biomes: [],
            blocks: Lib_1.Edu.BehaviorPack.Blocks,
            entities: Lib_1.Edu.BehaviorPack.Entities,
            features: Lib_1.Edu.BehaviorPack.Features,
            items: Lib_1.Edu.BehaviorPack.Items,
            loot_tables: Lib_1.Edu.BehaviorPack.LootTables,
            trading: Lib_1.Edu.BehaviorPack.Trading,
        },
        ResourcePack: {
            animation_controllers: Lib_1.Edu.ResourcePack.AnimationControllers,
            animations: Lib_1.Edu.ResourcePack.Animations,
            entities: Lib_1.Edu.ResourcePack.Entities,
            fogs: Lib_1.Edu.ResourcePack.Fogs,
            materials: Lib_1.Edu.ResourcePack.Materials,
            models: Lib_1.Edu.ResourcePack.Models,
            particles: Lib_1.Edu.ResourcePack.Particles,
            render_controllers: Lib_1.Edu.ResourcePack.RenderControllers,
            sounds: Lib_1.Edu.ResourcePack.Sounds,
            sound_files: Lib_1.Edu.ResourcePack.SoundFiles,
            textures: Lib_1.Edu.ResourcePack.Textures,
            texture_atlas_items: Lib_1.Vanilla.ResourcePack.TextureItems,
            texture_atlas_terrain: Lib_1.Vanilla.ResourcePack.TextureTerrain,
        },
    };
    /**The generalized data set for minecraft*/
    let General;
    (function (General) {
        /** A list of biomes */
        General.Biomes = Lib_1.General.Biomes;
        /** The summarized data set for blocks*/
        General.Blocks = Lib_1.General.BlockData;
        /** A list of camera presets */
        General.CameraPresets = Lib_1.General.CameraPresets;
        /** A list of cooldown categories */
        General.CooldownCategory = Lib_1.General.CooldownCategory;
        /** A list of dimensions */
        General.Dimensions = Lib_1.General.Dimensions;
        /** The summarized data set of effects*/
        General.Effects = Lib_1.General.Effects;
        /** The summarized data set for entities*/
        General.Entities = Lib_1.General.EntityData;
        /** A list of enchantments */
        General.Enchantments = Lib_1.General.Enchantments;
        /** Data for the potions */
        General.Potions = {
            Effects: Lib_1.General.PotionEffects,
            Types: Lib_1.General.PotionTypes,
            Modifiers: Lib_1.General.PotionModifiers,
        };
    })(General = MinecraftData.General || (MinecraftData.General = {}));
    /**Access to behaviorpack vanilla data*/
    let BehaviorPack;
    (function (BehaviorPack) {
        /**Gets the biome by the given identification
         * @param id The identification of the object to find
         * @param edu Whether or not to include education data
         * @returns A object with the specified id or undefined if nothing was found*/
        function getBiome(id, edu = false) {
            return get(id, edu, MinecraftData.vanilla.BehaviorPack.biomes, MinecraftData.edu.BehaviorPack.biomes);
        }
        BehaviorPack.getBiome = getBiome;
        /**Gets the block by the given identification
         * @param id The identification of the object to find
         * @param edu Whether or not to include education data
         * @returns A object with the specified id or undefined if nothing was found*/
        function getBlock(id, edu = false) {
            return get(id, edu, MinecraftData.vanilla.BehaviorPack.blocks, MinecraftData.edu.BehaviorPack.blocks);
        }
        BehaviorPack.getBlock = getBlock;
        /**Gets the block state by the given identification
         * @param id The block state id
         * @returns A object with the specified id or undefined if nothing was found*/
        function getBlockState(id) {
            return General.Blocks.block_states.find((item) => item.name === id);
        }
        BehaviorPack.getBlockState = getBlockState;
        /**Gets the entity by the given identification
         * @param id The identification of the object to find
         * @param edu Whether or not to include education data
         * @returns A object with the specified id or undefined if nothing was found*/
        function getEntity(id, edu = false) {
            return get(id, edu, MinecraftData.vanilla.BehaviorPack.entities, MinecraftData.edu.BehaviorPack.entities);
        }
        BehaviorPack.getEntity = getEntity;
        /**Gets the item by the given identification
         * @param id The identification of the object to find
         * @param edu Whether or not to include education data
         * @returns A object with the specified id or undefined if nothing was found*/
        function getItem(id, edu = false) {
            return get(id, edu, MinecraftData.vanilla.BehaviorPack.items, MinecraftData.edu.BehaviorPack.items);
        }
        BehaviorPack.getItem = getItem;
        /**Gets the loot table by the given identification
         * @param id The identification of the object to find
         * @param edu Whether or not to include education data
         * @returns A object with the specified id or undefined if nothing was found*/
        function getLootTable(id, edu = false) {
            return getStr(id, edu, MinecraftData.vanilla.BehaviorPack.loot_tables, MinecraftData.edu.BehaviorPack.loot_tables);
        }
        BehaviorPack.getLootTable = getLootTable;
        /**Gets the loot table by the given identification
         * @param id The identification of the object to find
         * @param edu Whether or not to include education data
         * @returns A object with the specified id or undefined if nothing was found*/
        function getFeature(id, edu = false) {
            return getStr(id, edu, MinecraftData.vanilla.BehaviorPack.features, MinecraftData.edu.BehaviorPack.features);
        }
        BehaviorPack.getFeature = getFeature;
        /**Gets the trading by the given identification
         * @param id The identification of the object to find
         * @param edu Whether or not to include education data
         * @returns A object with the specified id or undefined if nothing was found*/
        function getTrading(id, edu = false) {
            return getStr(id, edu, MinecraftData.vanilla.BehaviorPack.trading, MinecraftData.edu.BehaviorPack.trading);
        }
        BehaviorPack.getTrading = getTrading;
        /**Returns true or false if the given identification exists
         * @param id The identification of the object to find
         * @param edu Whether or not to include education data
         * @returns A object with the specified id or undefined if nothing was found*/
        function hasBiome(id, edu = false) {
            return getBiome(id, edu) !== undefined;
        }
        BehaviorPack.hasBiome = hasBiome;
        /**Returns true or false if the given identification exists
         * @param id The identification of the object to find
         * @param edu Whether or not to include education data
         * @returns A object with the specified id or undefined if nothing was found*/
        function hasBlock(id, edu = false) {
            return getBlock(id, edu) !== undefined;
        }
        BehaviorPack.hasBlock = hasBlock;
        /**Returns true or false if the given identification exists
         * @param id The identification of the object to find
         * @param edu Whether or not to include education data
         * @returns A object with the specified id or undefined if nothing was found*/
        function hasEntity(id, edu = false) {
            return getEntity(id, edu) !== undefined;
        }
        BehaviorPack.hasEntity = hasEntity;
        /**Returns true or false if the given identification exists
         * @param id The identification of the object to find
         * @param edu Whether or not to include education data
         * @returns A object with the specified id or undefined if nothing was found*/
        function hasItem(id, edu = false) {
            return getItem(id, edu) !== undefined;
        }
        BehaviorPack.hasItem = hasItem;
        /**Returns true or false if the given identification exists
         * @param id The identification of the object to find
         * @param edu Whether or not to include education data
         * @returns A object with the specified id or undefined if nothing was found*/
        function hasLootTable(id, edu = false) {
            return getLootTable(id, edu) !== undefined;
        }
        BehaviorPack.hasLootTable = hasLootTable;
        /**Returns true or false if the given identification exists
         * @param id The identification of the object to find
         * @param edu Whether or not to include education data
         * @returns A object with the specified id or undefined if nothing was found*/
        function hasTrading(id, edu = false) {
            return getTrading(id, edu) !== undefined;
        }
        BehaviorPack.hasTrading = hasTrading;
    })(BehaviorPack = MinecraftData.BehaviorPack || (MinecraftData.BehaviorPack = {}));
    /**Access to resourcepack vanilla data*/
    let ResourcePack;
    (function (ResourcePack) {
        /**Gets the animation controller by the given identification
         * @param id The identification of the object to find
         * @param edu Whether or not to include education data
         * @returns A object with the specified id or undefined if nothing was found*/
        function getAnimationController(id, edu = false) {
            return get(id, edu, MinecraftData.vanilla.ResourcePack.animation_controllers, MinecraftData.edu.ResourcePack.animation_controllers);
        }
        ResourcePack.getAnimationController = getAnimationController;
        /**Gets the animation by the given identification
         * @param id The identification of the object to find
         * @param edu Whether or not to include education data
         * @returns A object with the specified id or undefined if nothing was found*/
        function getAnimation(id, edu = false) {
            return get(id, edu, MinecraftData.vanilla.ResourcePack.animations, MinecraftData.edu.ResourcePack.animations);
        }
        ResourcePack.getAnimation = getAnimation;
        /**Gets the animation controller by the given identification
         * @param id The identification of the object to find
         * @param edu Whether or not to include education data
         * @returns A object with the specified id or undefined if nothing was found*/
        function getEntity(id, edu = false) {
            return get(id, edu, MinecraftData.vanilla.ResourcePack.entities, MinecraftData.edu.ResourcePack.entities);
        }
        ResourcePack.getEntity = getEntity;
        /**Gets the fog by the given identification
         * @param id The identification of the object to find
         * @param edu Whether or not to include education data
         * @returns A object with the specified id or undefined if nothing was found*/
        function getFog(id, edu = false) {
            return getStr(id, edu, MinecraftData.vanilla.ResourcePack.fogs, MinecraftData.edu.ResourcePack.fogs);
        }
        ResourcePack.getFog = getFog;
        /**Gets the material by the given identification
         * @param id The identification of the object to find
         * @param edu Whether or not to include education data
         * @returns A object with the specified id or undefined if nothing was found*/
        function getMaterial(id, edu = false) {
            return getStr(id, edu, MinecraftData.vanilla.ResourcePack.materials, MinecraftData.edu.ResourcePack.materials);
        }
        ResourcePack.getMaterial = getMaterial;
        /**Gets the model by the given identification
         * @param id The identification of the object to find
         * @param edu Whether or not to include education data
         * @returns A object with the specified id or undefined if nothing was found*/
        function getModel(id, edu = false) {
            return get(id, edu, MinecraftData.vanilla.ResourcePack.models, MinecraftData.edu.ResourcePack.models);
        }
        ResourcePack.getModel = getModel;
        /**Gets the particle by the given identification
         * @param id The identification of the object to find
         * @param edu Whether or not to include education data
         * @returns A object with the specified id or undefined if nothing was found*/
        function getParticle(id, edu = false) {
            return getStr(id, edu, MinecraftData.vanilla.ResourcePack.particles, MinecraftData.edu.ResourcePack.particles);
        }
        ResourcePack.getParticle = getParticle;
        /**Gets the render controller by the given identification
         * @param id The identification of the object to find
         * @param edu Whether or not to include education data
         * @returns A object with the specified id or undefined if nothing was found*/
        function getRenderController(id, edu = false) {
            return getStr(id, edu, MinecraftData.vanilla.ResourcePack.render_controllers, MinecraftData.edu.ResourcePack.render_controllers);
        }
        ResourcePack.getRenderController = getRenderController;
        /**Gets the sound by the given identification
         * @param id The identification of the object to find
         * @param edu Whether or not to include education data
         * @returns A object with the specified id or undefined if nothing was found*/
        function getSound(id, edu = false) {
            return getStr(id, edu, MinecraftData.vanilla.ResourcePack.sounds, MinecraftData.edu.ResourcePack.sounds);
        }
        ResourcePack.getSound = getSound;
        /**Gets the sound file by the given identification
         * @param file The filename of the object to find
         * @param edu Whether or not to include education data
         * @returns A object with the specified id or undefined if nothing was found*/
        function getSoundFile(file, edu = false) {
            return getStr(file, edu, MinecraftData.vanilla.ResourcePack.sound_files, MinecraftData.edu.ResourcePack.sound_files);
        }
        ResourcePack.getSoundFile = getSoundFile;
        /**Gets the texture by the given identification
         * @param id The identification of the object to find
         * @param edu Whether or not to include education data
         * @returns A object with the specified id or undefined if nothing was found*/
        function getTexture(id, edu = false) {
            return getStr(id, edu, MinecraftData.vanilla.ResourcePack.textures, MinecraftData.edu.ResourcePack.textures);
        }
        ResourcePack.getTexture = getTexture;
        /**Returns true or false if the given identification exists
         * @param id The identification of the object to find
         * @param edu Whether or not to include education data
         * @returns A object with the specified id or undefined if nothing was found*/
        function hasAnimationController(id, edu = false) {
            return getAnimationController(id, edu) !== undefined;
        }
        ResourcePack.hasAnimationController = hasAnimationController;
        /**Returns true or false if the given identification exists
         * @param id The identification of the object to find
         * @param edu Whether or not to include education data
         * @returns A object with the specified id or undefined if nothing was found*/
        function hasAnimation(id, edu = false) {
            return getAnimation(id, edu) !== undefined;
        }
        ResourcePack.hasAnimation = hasAnimation;
        /**Returns true or false if the given identification exists
         * @param id The identification of the object to find
         * @param edu Whether or not to include education data
         * @returns A object with the specified id or undefined if nothing was found*/
        function hasEntity(id, edu = false) {
            return getEntity(id, edu) !== undefined;
        }
        ResourcePack.hasEntity = hasEntity;
        /**Returns true or false if the given identification exists
         * @param id The identification of the object to find
         * @param edu Whether or not to include education data
         * @returns A object with the specified id or undefined if nothing was found*/
        function hasFog(id, edu = false) {
            return getFog(id, edu) !== undefined;
        }
        ResourcePack.hasFog = hasFog;
        /**Returns true or false if the given identification exists
         * @param id The identification of the object to find
         * @param edu Whether or not to include education data
         * @returns A object with the specified id or undefined if nothing was found*/
        function hasMaterial(id, edu = false) {
            return getMaterial(id, edu) !== undefined;
        }
        ResourcePack.hasMaterial = hasMaterial;
        /**Returns true or false if the given identification exists
         * @param id The identification of the object to find
         * @param edu Whether or not to include education data
         * @returns A object with the specified id or undefined if nothing was found*/
        function hasModel(id, edu = false) {
            return getModel(id, edu) !== undefined;
        }
        ResourcePack.hasModel = hasModel;
        /**Returns true or false if the given identification exists
         * @param id The identification of the object to find
         * @param edu Whether or not to include education data
         * @returns A object with the specified id or undefined if nothing was found*/
        function hasParticle(id, edu = false) {
            return getParticle(id, edu) !== undefined;
        }
        ResourcePack.hasParticle = hasParticle;
        /**Returns true or false if the given identification exists
         * @param id The identification of the object to find
         * @param edu Whether or not to include education data
         * @returns A object with the specified id or undefined if nothing was found*/
        function hasRenderController(id, edu = false) {
            return getRenderController(id, edu) !== undefined;
        }
        ResourcePack.hasRenderController = hasRenderController;
        /**Returns true or false if the given identification exists
         * @param id The identification of the object to find
         * @param edu Whether or not to include education data
         * @returns A object with the specified id or undefined if nothing was found*/
        function hasSound(id, edu = false) {
            return getSound(id, edu) !== undefined;
        }
        ResourcePack.hasSound = hasSound;
        /**Returns true or false if the given file exists
         * @param file The identification of the object to find
         * @param edu Whether or not to include education data
         * @returns A object with the specified id or undefined if nothing was found*/
        function hasSoundFile(file, edu = false) {
            return getSound(file, edu) !== undefined;
        }
        ResourcePack.hasSoundFile = hasSoundFile;
        /**Returns true or false if the given identification exists
         * @param id The identification of the object to find
         * @param edu Whether or not to include education data
         * @returns A object with the specified id or undefined if nothing was found*/
        function hasTexture(id, edu = false) {
            return getTexture(id, edu) !== undefined;
        }
        ResourcePack.hasTexture = hasTexture;
    })(ResourcePack = MinecraftData.ResourcePack || (MinecraftData.ResourcePack = {}));
})(MinecraftData || (exports.MinecraftData = MinecraftData = {}));
function get(id, includeEdu, vanilla, edu) {
    let out = Identifiable_1.Identifiable.get(vanilla, id);
    if (out)
        return out;
    if (includeEdu)
        out = Identifiable_1.Identifiable.get(edu, id);
    return out;
}
function getStr(id, includeEdu, vanilla, edu) {
    if (vanilla.includes(id))
        return id;
    if (includeEdu && edu.includes(id))
        return id;
    return undefined;
}
//# sourceMappingURL=main.js.map