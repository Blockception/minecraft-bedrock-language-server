import * as path from 'path';
import { findJsonFiles, readJsonFile } from './utils.js';
import { Block, Biome, Entity, Item, LootTable, Trading, BehaviorPackContainer } from './types.js';

/**
 * Scrape behavior pack data
 */
export function scrapeBehaviorPack(sources: string[], container: BehaviorPackContainer): void {
  for (const source of sources) {
    scrapeBehaviorPackFolder(source, container);
  }
}

function scrapeBehaviorPackFolder(source: string, container: BehaviorPackContainer): void {
  console.log('Scraping BP: ' + source);

  scrapeBlocksFromFolder(container.blocks, path.join(source, 'blocks'));
  scrapeBiomesFromFolder(container.biomes, path.join(source, 'biomes'));
  scrapeEntitiesFromFolder(container.entities, path.join(source, 'entities'));
  scrapeItemsFromFolder(container.items, path.join(source, 'items'));
  scrapeLootTablesFromFolder(container.lootTables, path.join(source, 'loot_tables'));
  scrapeTradingFromFolder(container.trading, path.join(source, 'trading'));
}

function scrapeBlocksFromFolder(receiver: Block[], folder: string): void {
  console.log('::group::' + folder);
  const files = findJsonFiles(folder);

  for (const file of files) {
    try {
      const data = readJsonFile<any>(file);
      if (!data) continue;

      const blockDef = data['minecraft:block'];
      if (!blockDef) continue;

      const desc = blockDef.description;
      if (!desc) continue;

      const id = desc.identifier;
      if (!id) continue;

      const block: Block = { id };

      // Extract properties if present
      if (desc.properties) {
        block.properties = Object.keys(desc.properties);
      }

      receiver.push(block);
    } catch (error) {
      console.error(`Error processing ${file}:`, error);
    }
  }
  console.log('::endgroup::' + folder);
}

function scrapeBiomesFromFolder(receiver: Biome[], folder: string): void {
  console.log('::group::' + folder);
  const files = findJsonFiles(folder);

  for (const file of files) {
    try {
      const data = readJsonFile<any>(file);
      if (!data) continue;

      const biomeDef = data['minecraft:biome'];
      if (!biomeDef) continue;

      const desc = biomeDef.description;
      if (!desc) continue;

      const id = desc.identifier;
      if (id) {
        receiver.push({ id });
      }
    } catch (error) {
      console.error(`Error processing ${file}:`, error);
    }
  }
  console.log('::endgroup::' + folder);
}

function scrapeEntitiesFromFolder(receiver: Entity[], folder: string): void {
  console.log('::group::' + folder);
  const files = findJsonFiles(folder);

  for (const file of files) {
    try {
      const data = readJsonFile<any>(file);
      if (!data) continue;

      const entityDef = data['minecraft:entity'];
      if (!entityDef) continue;

      const desc = entityDef.description;
      if (!desc) continue;

      const id = desc.identifier;
      if (id) {
        receiver.push({ id });
      }
    } catch (error) {
      console.error(`Error processing ${file}:`, error);
    }
  }
  console.log('::endgroup::' + folder);
}

function scrapeItemsFromFolder(receiver: Item[], folder: string): void {
  console.log('::group::' + folder);
  const files = findJsonFiles(folder);

  for (const file of files) {
    try {
      const data = readJsonFile<any>(file);
      if (!data) continue;

      const itemDef = data['minecraft:item'];
      if (!itemDef) continue;

      const desc = itemDef.description;
      if (!desc) continue;

      const id = desc.identifier;
      if (id) {
        receiver.push({ id });
      }
    } catch (error) {
      console.error(`Error processing ${file}:`, error);
    }
  }
  console.log('::endgroup::' + folder);
}

function scrapeLootTablesFromFolder(receiver: LootTable[], folder: string): void {
  console.log('::group::' + folder);
  const files = findJsonFiles(folder);

  for (const file of files) {
    try {
      const data = readJsonFile<any>(file);
      if (!data) continue;

      // Loot tables use the file name as the identifier
      const filename = path.basename(file, '.json');
      const id = `loot_tables/${filename}`;
      receiver.push({ id });
    } catch (error) {
      console.error(`Error processing ${file}:`, error);
    }
  }
  console.log('::endgroup::' + folder);
}

function scrapeTradingFromFolder(receiver: Trading[], folder: string): void {
  console.log('::group::' + folder);
  const files = findJsonFiles(folder);

  for (const file of files) {
    try {
      const data = readJsonFile<any>(file);
      if (!data) continue;

      // Trading files use the file name as the identifier
      const filename = path.basename(file, '.json');
      const id = `trading/${filename}`;
      receiver.push({ id });
    } catch (error) {
      console.error(`Error processing ${file}:`, error);
    }
  }
  console.log('::endgroup::' + folder);
}
