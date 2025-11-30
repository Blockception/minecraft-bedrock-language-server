import * as fs from 'fs';
import * as path from 'path';
import { cleanIdentifiers, cleanStrings } from '../static/identifier-extension';
import { loadEnsure } from '../static/json';
import { ensureProperties } from '../static/sanitize';
import { saveArray } from '../static/typescript';
import { Biome } from './biome';
import { Block, createBlock } from './block';
import { createEntity, Entity } from './entity';
import { createItem, Item } from './item';
import { createLootTable, LootTable } from './loot-table';
import { createTrading, Trading } from './trading';

/**
 * Container for behavior pack data
 */
export class Container {
  blocks: Block[] = [];
  biomes: Biome[] = [];
  features: string[] = [];
  entities: Entity[] = [];
  items: Item[] = [];
  lootTables: LootTable[] = [];
  trading: Trading[] = [];

  /**
   * Load container from a folder
   */
  static load(folder: string): Container {
    const out = new Container();
    out.blocks = loadEnsure<Block>(path.join(folder, 'blocks.json'));
    out.biomes = loadEnsure<Biome>(path.join(folder, 'biomes.json'));
    out.entities = loadEnsure<Entity>(path.join(folder, 'entities.json'));
    out.items = loadEnsure<Item>(path.join(folder, 'items.json'));
    out.lootTables = loadEnsure<LootTable>(path.join(folder, 'loot_tables.json'));
    out.trading = loadEnsure<Trading>(path.join(folder, 'trading.json'));
    return out;
  }

  /**
   * Save container to a folder
   */
  save(folder: string): void {
    fs.mkdirSync(folder, { recursive: true });

    saveArray('Block', '../../types/behaviorpack/block', 'Blocks', this.blocks, path.join(folder, 'blocks.ts'));
    saveArray('Biome', '../../types/behaviorpack/biome', 'Biomes', this.biomes, path.join(folder, 'biomes.ts'));
    saveArray('Entity', '../../types/behaviorpack/entity', 'Entities', this.entities, path.join(folder, 'entities.ts'));
    saveArray('Item', '../../types/behaviorpack/item', 'Items', this.items, path.join(folder, 'items.ts'));
    saveArray(
      'string',
      null,
      'LootTables',
      this.lootTables.map((lt) => lt.id),
      path.join(folder, 'loot_tables.ts'),
    );
    saveArray(
      'string',
      null,
      'Trading',
      this.trading.map((t) => t.id),
      path.join(folder, 'trading.ts'),
    );
    saveArray('string', null, 'Features', this.features, path.join(folder, 'features.ts'));
  }

  /**
   * Clean and deduplicate data
   */
  clean(): void {
    this.blocks = ensureProperties(cleanIdentifiers(this.blocks), createBlock);
    this.entities = ensureProperties(cleanIdentifiers(this.entities), createEntity);
    this.features = cleanStrings(this.features);
    this.items = ensureProperties(cleanIdentifiers(this.items), createItem);
    this.lootTables = ensureProperties(cleanIdentifiers(this.lootTables), createLootTable);
    this.trading = ensureProperties(cleanIdentifiers(this.trading), createTrading);
  }
}
