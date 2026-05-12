"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataSetService = void 0;
const ide_shared_1 = require("@blockception/ide-shared");
const bc_minecraft_bedrock_vanilla_data_1 = require("bc-minecraft-bedrock-vanilla-data");
const base_1 = require("../services/base");
/** The service that handles dataset requests from the client */
class DataSetService extends base_1.BaseService {
    name = 'dataset';
    constructor(logger, extension) {
        super(logger.withPrefix('[dataset]'), extension);
    }
    setupHandlers(connection) {
        this.addDisposable(connection.onRequest(ide_shared_1.RequestTypes.DataSet, (params) => {
            return this.onDataSetRequest(params);
        }));
    }
    onDataSetRequest(params) {
        this.logger.debug('dataset request', params);
        const data = getDataSet(params.datatype);
        if (params.id === undefined || data === undefined)
            return data;
        return filterDataSet(data, params.id);
    }
}
exports.DataSetService = DataSetService;
/**
 * Filters a dataset to entries whose id matches the given value.
 * Works for arrays of strings and arrays of objects with an `id` property.
 * @param data The full dataset to filter
 * @param id The identifier to filter by
 */
function filterDataSet(data, id) {
    if (!Array.isArray(data))
        return data;
    return data.filter((item) => {
        if (typeof item === 'string')
            return item === id;
        if (typeof item === 'object' && item !== null && 'id' in item)
            return item.id === id;
        return false;
    });
}
/**
 * Returns the dataset for the given datatype identifier, or undefined if not found.
 * @param datatype The dataset type identifier (e.g. 'vanilla/behavior_pack/blocks')
 */
function getDataSet(datatype) {
    switch (datatype) {
        // Vanilla Behavior Pack
        case ide_shared_1.DataSets.Vanilla.BehaviorPack.Biomes:
            return bc_minecraft_bedrock_vanilla_data_1.MinecraftData.vanilla.BehaviorPack.biomes;
        case ide_shared_1.DataSets.Vanilla.BehaviorPack.Blocks:
            return bc_minecraft_bedrock_vanilla_data_1.MinecraftData.vanilla.BehaviorPack.blocks;
        case ide_shared_1.DataSets.Vanilla.BehaviorPack.Entities:
            return bc_minecraft_bedrock_vanilla_data_1.MinecraftData.vanilla.BehaviorPack.entities;
        case ide_shared_1.DataSets.Vanilla.BehaviorPack.Features:
            return bc_minecraft_bedrock_vanilla_data_1.MinecraftData.vanilla.BehaviorPack.features;
        case ide_shared_1.DataSets.Vanilla.BehaviorPack.Items:
            return bc_minecraft_bedrock_vanilla_data_1.MinecraftData.vanilla.BehaviorPack.items;
        case ide_shared_1.DataSets.Vanilla.BehaviorPack.LootTables:
            return bc_minecraft_bedrock_vanilla_data_1.MinecraftData.vanilla.BehaviorPack.lootTables;
        case ide_shared_1.DataSets.Vanilla.BehaviorPack.Trading:
            return bc_minecraft_bedrock_vanilla_data_1.MinecraftData.vanilla.BehaviorPack.trading;
        // Vanilla Resource Pack
        case ide_shared_1.DataSets.Vanilla.ResourcePack.AnimationControllers:
            return bc_minecraft_bedrock_vanilla_data_1.MinecraftData.vanilla.ResourcePack.animationControllers;
        case ide_shared_1.DataSets.Vanilla.ResourcePack.Animations:
            return bc_minecraft_bedrock_vanilla_data_1.MinecraftData.vanilla.ResourcePack.animations;
        case ide_shared_1.DataSets.Vanilla.ResourcePack.Entities:
            return bc_minecraft_bedrock_vanilla_data_1.MinecraftData.vanilla.ResourcePack.entities;
        case ide_shared_1.DataSets.Vanilla.ResourcePack.Fogs:
            return bc_minecraft_bedrock_vanilla_data_1.MinecraftData.vanilla.ResourcePack.fogs;
        case ide_shared_1.DataSets.Vanilla.ResourcePack.Materials:
            return bc_minecraft_bedrock_vanilla_data_1.MinecraftData.vanilla.ResourcePack.materials;
        case ide_shared_1.DataSets.Vanilla.ResourcePack.Models:
            return bc_minecraft_bedrock_vanilla_data_1.MinecraftData.vanilla.ResourcePack.models;
        case ide_shared_1.DataSets.Vanilla.ResourcePack.Particles:
            return bc_minecraft_bedrock_vanilla_data_1.MinecraftData.vanilla.ResourcePack.particles;
        case ide_shared_1.DataSets.Vanilla.ResourcePack.RenderControllers:
            return bc_minecraft_bedrock_vanilla_data_1.MinecraftData.vanilla.ResourcePack.renderControllers;
        case ide_shared_1.DataSets.Vanilla.ResourcePack.Sounds:
            return bc_minecraft_bedrock_vanilla_data_1.MinecraftData.vanilla.ResourcePack.sounds;
        case ide_shared_1.DataSets.Vanilla.ResourcePack.SoundFiles:
            return bc_minecraft_bedrock_vanilla_data_1.MinecraftData.vanilla.ResourcePack.soundFiles;
        case ide_shared_1.DataSets.Vanilla.ResourcePack.Textures:
            return bc_minecraft_bedrock_vanilla_data_1.MinecraftData.vanilla.ResourcePack.textures;
        case ide_shared_1.DataSets.Vanilla.ResourcePack.TextureAtlasItems:
            return bc_minecraft_bedrock_vanilla_data_1.MinecraftData.vanilla.ResourcePack.textureAtlasItems;
        case ide_shared_1.DataSets.Vanilla.ResourcePack.TextureAtlasTerrain:
            return bc_minecraft_bedrock_vanilla_data_1.MinecraftData.vanilla.ResourcePack.textureAtlasTerrain;
        // Edu Behavior Pack
        case ide_shared_1.DataSets.Edu.BehaviorPack.Biomes:
            return bc_minecraft_bedrock_vanilla_data_1.MinecraftData.edu.BehaviorPack.biomes;
        case ide_shared_1.DataSets.Edu.BehaviorPack.Blocks:
            return bc_minecraft_bedrock_vanilla_data_1.MinecraftData.edu.BehaviorPack.blocks;
        case ide_shared_1.DataSets.Edu.BehaviorPack.Entities:
            return bc_minecraft_bedrock_vanilla_data_1.MinecraftData.edu.BehaviorPack.entities;
        case ide_shared_1.DataSets.Edu.BehaviorPack.Features:
            return bc_minecraft_bedrock_vanilla_data_1.MinecraftData.edu.BehaviorPack.features;
        case ide_shared_1.DataSets.Edu.BehaviorPack.Items:
            return bc_minecraft_bedrock_vanilla_data_1.MinecraftData.edu.BehaviorPack.items;
        case ide_shared_1.DataSets.Edu.BehaviorPack.LootTables:
            return bc_minecraft_bedrock_vanilla_data_1.MinecraftData.edu.BehaviorPack.lootTables;
        case ide_shared_1.DataSets.Edu.BehaviorPack.Trading:
            return bc_minecraft_bedrock_vanilla_data_1.MinecraftData.edu.BehaviorPack.trading;
        // Edu Resource Pack
        case ide_shared_1.DataSets.Edu.ResourcePack.AnimationControllers:
            return bc_minecraft_bedrock_vanilla_data_1.MinecraftData.edu.ResourcePack.animationControllers;
        case ide_shared_1.DataSets.Edu.ResourcePack.Animations:
            return bc_minecraft_bedrock_vanilla_data_1.MinecraftData.edu.ResourcePack.animations;
        case ide_shared_1.DataSets.Edu.ResourcePack.Entities:
            return bc_minecraft_bedrock_vanilla_data_1.MinecraftData.edu.ResourcePack.entities;
        case ide_shared_1.DataSets.Edu.ResourcePack.Fogs:
            return bc_minecraft_bedrock_vanilla_data_1.MinecraftData.edu.ResourcePack.fogs;
        case ide_shared_1.DataSets.Edu.ResourcePack.Materials:
            return bc_minecraft_bedrock_vanilla_data_1.MinecraftData.edu.ResourcePack.materials;
        case ide_shared_1.DataSets.Edu.ResourcePack.Models:
            return bc_minecraft_bedrock_vanilla_data_1.MinecraftData.edu.ResourcePack.models;
        case ide_shared_1.DataSets.Edu.ResourcePack.Particles:
            return bc_minecraft_bedrock_vanilla_data_1.MinecraftData.edu.ResourcePack.particles;
        case ide_shared_1.DataSets.Edu.ResourcePack.RenderControllers:
            return bc_minecraft_bedrock_vanilla_data_1.MinecraftData.edu.ResourcePack.renderControllers;
        case ide_shared_1.DataSets.Edu.ResourcePack.Sounds:
            return bc_minecraft_bedrock_vanilla_data_1.MinecraftData.edu.ResourcePack.sounds;
        case ide_shared_1.DataSets.Edu.ResourcePack.SoundFiles:
            return bc_minecraft_bedrock_vanilla_data_1.MinecraftData.edu.ResourcePack.soundFiles;
        case ide_shared_1.DataSets.Edu.ResourcePack.Textures:
            return bc_minecraft_bedrock_vanilla_data_1.MinecraftData.edu.ResourcePack.textures;
        case ide_shared_1.DataSets.Edu.ResourcePack.TextureAtlasItems:
            return bc_minecraft_bedrock_vanilla_data_1.MinecraftData.edu.ResourcePack.textureAtlasItems;
        case ide_shared_1.DataSets.Edu.ResourcePack.TextureAtlasTerrain:
            return bc_minecraft_bedrock_vanilla_data_1.MinecraftData.edu.ResourcePack.textureAtlasTerrain;
        // General
        case ide_shared_1.DataSets.General.Biomes:
            return bc_minecraft_bedrock_vanilla_data_1.MinecraftData.General.Biomes;
        case ide_shared_1.DataSets.General.Blocks:
            return bc_minecraft_bedrock_vanilla_data_1.MinecraftData.General.Blocks;
        case ide_shared_1.DataSets.General.CameraPresets:
            return bc_minecraft_bedrock_vanilla_data_1.MinecraftData.General.CameraPresets;
        case ide_shared_1.DataSets.General.CooldownCategories:
            return bc_minecraft_bedrock_vanilla_data_1.MinecraftData.General.CooldownCategory;
        case ide_shared_1.DataSets.General.Dimensions:
            return bc_minecraft_bedrock_vanilla_data_1.MinecraftData.General.Dimensions;
        case ide_shared_1.DataSets.General.Effects:
            return bc_minecraft_bedrock_vanilla_data_1.MinecraftData.General.Effects;
        case ide_shared_1.DataSets.General.Enchantments:
            return bc_minecraft_bedrock_vanilla_data_1.MinecraftData.General.Enchantments;
        case ide_shared_1.DataSets.General.Entities:
            return bc_minecraft_bedrock_vanilla_data_1.MinecraftData.General.Entities;
        case ide_shared_1.DataSets.General.PotionEffects:
            return bc_minecraft_bedrock_vanilla_data_1.MinecraftData.General.Potions.Effects;
        case ide_shared_1.DataSets.General.PotionTypes:
            return bc_minecraft_bedrock_vanilla_data_1.MinecraftData.General.Potions.Types;
        case ide_shared_1.DataSets.General.PotionModifiers:
            return bc_minecraft_bedrock_vanilla_data_1.MinecraftData.General.Potions.Modifiers;
        default:
            return undefined;
    }
}
//# sourceMappingURL=service.js.map