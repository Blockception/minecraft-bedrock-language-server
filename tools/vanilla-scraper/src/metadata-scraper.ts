import * as path from 'path';
import { readJsonFile } from './utils.js';
import { Block, Entity, Item, BehaviorPackContainer, General } from './types.js';

/**
 * Scrape metadata from vanilladata_modules
 */
export function scrapeMetadata(
  sources: string[],
  bpContainer: BehaviorPackContainer,
  general: General
): void {
  for (const source of sources) {
    scrapeMetadataFolder(source, bpContainer, general);
  }
}

function scrapeMetadataFolder(
  source: string,
  bpContainer: BehaviorPackContainer,
  general: General
): void {
  console.log('Scraping Metadata: ' + source);
  const vanillaModules = path.join(source, 'vanilladata_modules');

  // Scrape various metadata files
  scrapeBiomes(general.biomes, path.join(vanillaModules, 'mojang-biomes.json'));
  scrapeBlocks(bpContainer.blocks, path.join(vanillaModules, 'mojang-blocks.json'));
  scrapeCameraPresets(general.cameraPresets, path.join(vanillaModules, 'mojang-camera-presets.json'));
  scrapeCooldownCategory(general.cooldownCategory, path.join(vanillaModules, 'mojang-cooldown-category.json'));
  scrapeDimensions(general.dimensions, path.join(vanillaModules, 'mojang-dimensions.json'));
  scrapeEffects(general.effects, path.join(vanillaModules, 'mojang-effects.json'));
  scrapeEnchantments(general.enchantments, path.join(vanillaModules, 'mojang-enchantments.json'));
  scrapeEntities(bpContainer.entities, path.join(vanillaModules, 'mojang-entities.json'));
  scrapeFeatures(bpContainer.features, path.join(vanillaModules, 'mojang-features.json'));
  scrapeItems(bpContainer.items, path.join(vanillaModules, 'mojang-items.json'));
  scrapePotionEffects(general.potionEffects, path.join(vanillaModules, 'mojang-potion-effects.json'));
  scrapePotionModifiers(general.potionModifiers, path.join(vanillaModules, 'mojang-potion-modifiers.json'));
  scrapePotionTypes(general.potionTypes, path.join(vanillaModules, 'mojang-potion-types.json'));
}

function scrapeBiomes(receiver: string[], filepath: string): void {
  const data = readJsonFile<any>(filepath);
  if (!data) return;

  const module = data.module?.items;
  if (!module) return;

  for (const item of module) {
    if (item.name) {
      receiver.push(item.name);
    }
  }
}

function scrapeBlocks(receiver: Block[], filepath: string): void {
  const data = readJsonFile<any>(filepath);
  if (!data) return;

  const module = data.module?.items;
  if (!module) return;

  for (const item of module) {
    if (item.name) {
      const block: Block = { id: item.name };
      
      if (item.properties && Array.isArray(item.properties)) {
        block.properties = item.properties.map((p: any) => p.name || p).filter((n: any) => n);
      }
      
      receiver.push(block);
    }
  }
}

function scrapeCameraPresets(receiver: string[], filepath: string): void {
  scrapeNamedObjects(receiver, filepath);
}

function scrapeCooldownCategory(receiver: string[], filepath: string): void {
  scrapeNamedObjects(receiver, filepath);
}

function scrapeDimensions(receiver: string[], filepath: string): void {
  scrapeNamedObjects(receiver, filepath);
}

function scrapeEffects(receiver: string[], filepath: string): void {
  scrapeNamedObjects(receiver, filepath);
}

function scrapeEnchantments(receiver: string[], filepath: string): void {
  scrapeNamedObjects(receiver, filepath);
}

function scrapeEntities(receiver: Entity[], filepath: string): void {
  const data = readJsonFile<any>(filepath);
  if (!data) return;

  const module = data.module?.items;
  if (!module) return;

  for (const item of module) {
    if (item.name) {
      receiver.push({ id: item.name });
    }
  }
}

function scrapeFeatures(receiver: string[], filepath: string): void {
  scrapeNamedObjects(receiver, filepath);
}

function scrapeItems(receiver: Item[], filepath: string): void {
  const data = readJsonFile<any>(filepath);
  if (!data) return;

  const module = data.module?.items;
  if (!module) return;

  for (const item of module) {
    if (item.name) {
      receiver.push({ id: item.name });
    }
  }
}

function scrapePotionEffects(receiver: string[], filepath: string): void {
  scrapeNamedObjects(receiver, filepath);
}

function scrapePotionModifiers(receiver: string[], filepath: string): void {
  scrapeNamedObjects(receiver, filepath);
}

function scrapePotionTypes(receiver: string[], filepath: string): void {
  scrapeNamedObjects(receiver, filepath);
}

/**
 * Generic function to scrape named objects
 */
function scrapeNamedObjects(receiver: string[], filepath: string): void {
  const data = readJsonFile<any>(filepath);
  if (!data) return;

  const module = data.module?.items;
  if (!module) return;

  for (const item of module) {
    if (item.name) {
      receiver.push(item.name);
    }
  }
}
