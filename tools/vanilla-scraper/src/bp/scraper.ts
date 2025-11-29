import * as path from 'path';
import { Container } from './container';
import { convertBlock } from './block';
import { convertBiome } from './biome';
import { convertEntity } from './entity';
import { convertItem } from './item';
import { convertLootTable } from './loot-table';
import { convertTrading } from './trading';
import { fromFolderJson, fromFolderFile } from '../static/convert';

/**
 * Scrape behavior pack data from multiple sources
 */
export function scrape(sources: string[], container: Container): void {
  for (const source of sources) {
    scrapeSource(source, container);
  }
}

/**
 * Scrape behavior pack data from a single source
 */
export function scrapeSource(source: string, container: Container): void {
  console.log('Scraping BP: ' + source);

  fromFolderJson(convertBlock, container.blocks, path.join(source, 'blocks'));
  fromFolderJson(convertBiome, container.biomes, path.join(source, 'biomes'));
  fromFolderJson(convertEntity, container.entities, path.join(source, 'entities'));
  fromFolderJson(convertItem, container.items, path.join(source, 'items'));
  fromFolderFile(convertLootTable, container.lootTables, path.join(source, 'loot_tables'));
  fromFolderFile(convertTrading, container.trading, path.join(source, 'trading'));
}
