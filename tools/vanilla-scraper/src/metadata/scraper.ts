import * as path from 'path';
import { Container as BPContainer } from '../bp/container';
import { General } from '../classes/general';
import { convertVanillaModule, convertVanillaModuleFlat } from './vanilla-module';
import { NamedObject, convertNamedObjectToString, convertNamedObjectToEntity } from './named-object';
import { MetadataBlock, convertMetadataBlock } from './block';
import { MetadataItem, convertMetadataItem } from './item';

/**
 * Scrape metadata from multiple sources
 */
export function scrape(sources: string[], bpContainer: BPContainer, general: General): void {
  for (const source of sources) {
    scrapeSource(source, bpContainer, general);
  }
}

/**
 * Scrape metadata from a single source
 */
export function scrapeSource(source: string, bpContainer: BPContainer, general: General): void {
  console.log('Scraping Metadata: ' + source);
  const vanillaModules = path.join(source, 'vanilladata_modules');

  convertVanillaModule<NamedObject, string>(
    path.join(vanillaModules, 'mojang-biomes.json'),
    general.biomes,
    convertNamedObjectToString
  );
  convertVanillaModule(
    path.join(vanillaModules, 'mojang-blocks.json'),
    bpContainer.blocks,
    convertMetadataBlock
  );
  convertVanillaModule<NamedObject, string>(
    path.join(vanillaModules, 'mojang-camera-presets.json'),
    general.cameraPresets,
    convertNamedObjectToString
  );
  convertVanillaModule<NamedObject, string>(
    path.join(vanillaModules, 'mojang-cooldown-category.json'),
    general.cooldownCategory,
    convertNamedObjectToString
  );
  convertVanillaModule<NamedObject, string>(
    path.join(vanillaModules, 'mojang-dimensions.json'),
    general.dimensions,
    convertNamedObjectToString
  );
  convertVanillaModule<NamedObject, string>(
    path.join(vanillaModules, 'mojang-effects.json'),
    general.effects,
    convertNamedObjectToString
  );
  convertVanillaModule<NamedObject, string>(
    path.join(vanillaModules, 'mojang-enchantments.json'),
    general.enchantments,
    convertNamedObjectToString
  );
  convertVanillaModule(
    path.join(vanillaModules, 'mojang-entities.json'),
    bpContainer.entities,
    convertNamedObjectToEntity
  );
  convertVanillaModule<NamedObject, string>(
    path.join(vanillaModules, 'mojang-features.json'),
    general.features || [],
    convertNamedObjectToString
  );
  // Add features to BP container
  convertVanillaModule<NamedObject, string>(
    path.join(vanillaModules, 'mojang-features.json'),
    bpContainer.features,
    convertNamedObjectToString
  );
  convertVanillaModuleFlat<MetadataItem, { id: string; maxDamage: number }>(
    path.join(vanillaModules, 'mojang-items.json'),
    bpContainer.items,
    convertMetadataItem
  );
  convertVanillaModule<NamedObject, string>(
    path.join(vanillaModules, 'mojang-potion-effects.json'),
    general.potionEffects,
    convertNamedObjectToString
  );
  convertVanillaModule<NamedObject, string>(
    path.join(vanillaModules, 'mojang-potion-modifiers.json'),
    general.potionModifiers,
    convertNamedObjectToString
  );
  convertVanillaModule<NamedObject, string>(
    path.join(vanillaModules, 'mojang-potion-json'),
    general.potionTypes,
    convertNamedObjectToString
  );
}
