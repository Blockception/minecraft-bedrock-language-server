import { DataSets, RequestTypes } from '@blockception/ide-shared';
import { MinecraftData } from 'bc-minecraft-bedrock-vanilla-data';
import { Connection } from 'vscode-languageserver';
import { ExtensionContext } from '../extension';
import { IExtendedLogger } from '../logger/logger';
import { BaseService } from '../services/base';
import { IService } from '../services/service';

/** Parameters for a dataset request */
export interface DataSetRequestParams {
  /** The type of dataset to retrieve (e.g. 'vanilla/behavior_pack/blocks') */
  datatype: string;
  /** Optional identifier to filter results to a single entry within the dataset */
  id?: string;
}

/** The service that handles dataset requests from the client */
export class DataSetService extends BaseService implements IService {
  readonly name: string = 'dataset';

  constructor(logger: IExtendedLogger, extension: ExtensionContext) {
    super(logger.withPrefix('[dataset]'), extension);
  }

  setupHandlers(connection: Connection): void {
    this.addDisposable(
      connection.onRequest(RequestTypes.DataSet, (params: DataSetRequestParams) => {
        return this.onDataSetRequest(params);
      }),
    );
  }

  private onDataSetRequest(params: DataSetRequestParams): unknown {
    this.logger.debug('dataset request', params);
    const data = getDataSet(params.datatype);

    if (params.id === undefined || data === undefined) return data;
    return filterDataSet(data, params.id);
  }
}

/**
 * Filters a dataset to entries whose id matches the given value.
 * Works for arrays of strings and arrays of objects with an `id` property.
 * @param data The full dataset to filter
 * @param id The identifier to filter by
 */
function filterDataSet(data: unknown, id: string): unknown {
  if (!Array.isArray(data)) return data;

  return data.filter((item) => {
    if (typeof item === 'string') return item === id;
    if (typeof item === 'object' && item !== null && 'id' in item) return (item as { id: unknown }).id === id;
    return false;
  });
}

/**
 * Returns the dataset for the given datatype identifier, or undefined if not found.
 * @param datatype The dataset type identifier (e.g. 'vanilla/behavior_pack/blocks')
 */
function getDataSet(datatype: string): unknown {
  switch (datatype) {
    // Vanilla Behavior Pack
    case DataSets.Vanilla.BehaviorPack.Biomes:
      return MinecraftData.vanilla.BehaviorPack.biomes;
    case DataSets.Vanilla.BehaviorPack.Blocks:
      return MinecraftData.vanilla.BehaviorPack.blocks;
    case DataSets.Vanilla.BehaviorPack.Entities:
      return MinecraftData.vanilla.BehaviorPack.entities;
    case DataSets.Vanilla.BehaviorPack.Features:
      return MinecraftData.vanilla.BehaviorPack.features;
    case DataSets.Vanilla.BehaviorPack.Items:
      return MinecraftData.vanilla.BehaviorPack.items;
    case DataSets.Vanilla.BehaviorPack.LootTables:
      return MinecraftData.vanilla.BehaviorPack.loot_tables;
    case DataSets.Vanilla.BehaviorPack.Trading:
      return MinecraftData.vanilla.BehaviorPack.trading;

    // Vanilla Resource Pack
    case DataSets.Vanilla.ResourcePack.AnimationControllers:
      return MinecraftData.vanilla.ResourcePack.animation_controllers;
    case DataSets.Vanilla.ResourcePack.Animations:
      return MinecraftData.vanilla.ResourcePack.animations;
    case DataSets.Vanilla.ResourcePack.Entities:
      return MinecraftData.vanilla.ResourcePack.entities;
    case DataSets.Vanilla.ResourcePack.Fogs:
      return MinecraftData.vanilla.ResourcePack.fogs;
    case DataSets.Vanilla.ResourcePack.Materials:
      return MinecraftData.vanilla.ResourcePack.materials;
    case DataSets.Vanilla.ResourcePack.Models:
      return MinecraftData.vanilla.ResourcePack.models;
    case DataSets.Vanilla.ResourcePack.Particles:
      return MinecraftData.vanilla.ResourcePack.particles;
    case DataSets.Vanilla.ResourcePack.RenderControllers:
      return MinecraftData.vanilla.ResourcePack.render_controllers;
    case DataSets.Vanilla.ResourcePack.Sounds:
      return MinecraftData.vanilla.ResourcePack.sounds;
    case DataSets.Vanilla.ResourcePack.SoundFiles:
      return MinecraftData.vanilla.ResourcePack.sound_files;
    case DataSets.Vanilla.ResourcePack.Textures:
      return MinecraftData.vanilla.ResourcePack.textures;
    case DataSets.Vanilla.ResourcePack.TextureAtlasItems:
      return MinecraftData.vanilla.ResourcePack.texture_atlas_items;
    case DataSets.Vanilla.ResourcePack.TextureAtlasTerrain:
      return MinecraftData.vanilla.ResourcePack.texture_atlas_terrain;

    // Edu Behavior Pack
    case DataSets.Edu.BehaviorPack.Biomes:
      return MinecraftData.edu.BehaviorPack.biomes;
    case DataSets.Edu.BehaviorPack.Blocks:
      return MinecraftData.edu.BehaviorPack.blocks;
    case DataSets.Edu.BehaviorPack.Entities:
      return MinecraftData.edu.BehaviorPack.entities;
    case DataSets.Edu.BehaviorPack.Features:
      return MinecraftData.edu.BehaviorPack.features;
    case DataSets.Edu.BehaviorPack.Items:
      return MinecraftData.edu.BehaviorPack.items;
    case DataSets.Edu.BehaviorPack.LootTables:
      return MinecraftData.edu.BehaviorPack.loot_tables;
    case DataSets.Edu.BehaviorPack.Trading:
      return MinecraftData.edu.BehaviorPack.trading;

    // Edu Resource Pack
    case DataSets.Edu.ResourcePack.AnimationControllers:
      return MinecraftData.edu.ResourcePack.animation_controllers;
    case DataSets.Edu.ResourcePack.Animations:
      return MinecraftData.edu.ResourcePack.animations;
    case DataSets.Edu.ResourcePack.Entities:
      return MinecraftData.edu.ResourcePack.entities;
    case DataSets.Edu.ResourcePack.Fogs:
      return MinecraftData.edu.ResourcePack.fogs;
    case DataSets.Edu.ResourcePack.Materials:
      return MinecraftData.edu.ResourcePack.materials;
    case DataSets.Edu.ResourcePack.Models:
      return MinecraftData.edu.ResourcePack.models;
    case DataSets.Edu.ResourcePack.Particles:
      return MinecraftData.edu.ResourcePack.particles;
    case DataSets.Edu.ResourcePack.RenderControllers:
      return MinecraftData.edu.ResourcePack.render_controllers;
    case DataSets.Edu.ResourcePack.Sounds:
      return MinecraftData.edu.ResourcePack.sounds;
    case DataSets.Edu.ResourcePack.SoundFiles:
      return MinecraftData.edu.ResourcePack.sound_files;
    case DataSets.Edu.ResourcePack.Textures:
      return MinecraftData.edu.ResourcePack.textures;
    case DataSets.Edu.ResourcePack.TextureAtlasItems:
      return MinecraftData.edu.ResourcePack.texture_atlas_items;
    case DataSets.Edu.ResourcePack.TextureAtlasTerrain:
      return MinecraftData.edu.ResourcePack.texture_atlas_terrain;

    // General
    case DataSets.General.Biomes:
      return MinecraftData.General.Biomes;
    case DataSets.General.Blocks:
      return MinecraftData.General.Blocks;
    case DataSets.General.CameraPresets:
      return MinecraftData.General.CameraPresets;
    case DataSets.General.CooldownCategories:
      return MinecraftData.General.CooldownCategory;
    case DataSets.General.Dimensions:
      return MinecraftData.General.Dimensions;
    case DataSets.General.Effects:
      return MinecraftData.General.Effects;
    case DataSets.General.Enchantments:
      return MinecraftData.General.Enchantments;
    case DataSets.General.Entities:
      return MinecraftData.General.Entities;
    case DataSets.General.PotionEffects:
      return MinecraftData.General.Potions.Effects;
    case DataSets.General.PotionTypes:
      return MinecraftData.General.Potions.Types;
    case DataSets.General.PotionModifiers:
      return MinecraftData.General.Potions.Modifiers;

    default:
      return undefined;
  }
}
