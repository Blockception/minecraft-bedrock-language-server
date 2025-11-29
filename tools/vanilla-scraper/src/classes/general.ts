import * as path from 'path';
import * as fs from 'fs';
import { Container as BPContainer } from '../bp/container';
import { Output } from './output';
import { OutputSet } from './output-set';
import { GeneralEntity } from './general-entity';
import { cleanStrings, duplicateWithoutNamespace } from '../static/identifier-extension';
import { saveArray, saveSingle } from '../static/typescript';

/**
 * General data (combined from all sources)
 */
export class General {
  entityData: GeneralEntity = new GeneralEntity();
  biomes: string[] = [];
  cameraPresets: string[] = [];
  cooldownCategory: string[] = [];
  dimensions: string[] = [];
  effects: string[] = [];
  enchantments: string[] = [];
  potionEffects: string[] = [];
  potionModifiers: string[] = [];
  potionTypes: string[] = [];
  features?: string[];

  /**
   * Scrape from output
   */
  scrapeFromOutput(output: Output): void {
    this.scrapeFromSet(output.edu);
    this.scrapeFromSet(output.vanilla);
  }

  /**
   * Scrape from output set
   */
  scrapeFromSet(output: OutputSet): void {
    this.scrapeFromBP(output.behaviorPack);
  }

  /**
   * Scrape from BP container
   */
  scrapeFromBP(data: BPContainer): void {
    this.entityData.scrape(data);
  }

  /**
   * Clean and sort data
   */
  clean(): void {
    this.entityData.clean();
    this.biomes = cleanStrings(this.biomes);
    this.cameraPresets = cleanStrings(this.cameraPresets);
    this.cooldownCategory = cleanStrings(this.cooldownCategory);
    this.dimensions = cleanStrings(this.dimensions);
    this.effects = cleanStrings(duplicateWithoutNamespace(this.effects));
    this.enchantments = cleanStrings(this.enchantments);
    this.potionEffects = cleanStrings(duplicateWithoutNamespace(this.potionEffects));
    this.potionModifiers = cleanStrings(this.potionModifiers);
    this.potionTypes = cleanStrings(this.potionTypes);
  }

  /**
   * Save general data to a folder
   */
  save(folder: string): void {
    fs.mkdirSync(folder, { recursive: true });

    saveSingle('GeneralEntity', './format', 'EntityData', this.entityData, path.join(folder, 'entities.ts'));
    saveArray('string', null, 'Biomes', this.biomes, path.join(folder, 'biomes.ts'));
    saveArray('string', null, 'CameraPresets', this.cameraPresets, path.join(folder, 'camera_presets.ts'));
    saveArray('string', null, 'CooldownCategory', this.cooldownCategory, path.join(folder, 'cooldown_category.ts'));
    saveArray('string', null, 'Dimensions', this.dimensions, path.join(folder, 'dimensions.ts'));
    saveArray('string', null, 'Effects', this.effects, path.join(folder, 'effects.ts'));
    saveArray('string', null, 'Enchantments', this.enchantments, path.join(folder, 'enchantments.ts'));
    saveArray('string', null, 'PotionEffects', this.potionEffects, path.join(folder, 'potion_effects.ts'));
    saveArray('string', null, 'PotionModifiers', this.potionModifiers, path.join(folder, 'potion_modifiers.ts'));
    saveArray('string', null, 'PotionTypes', this.potionTypes, path.join(folder, 'potion_types.ts'));
  }
}
