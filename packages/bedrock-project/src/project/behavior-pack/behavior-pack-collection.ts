import { MCProject } from 'bc-minecraft-project';
import { Manifest } from '../../internal/types';
import { DataSetConnector, PackCollection } from '../../types';
import { BehaviorPack } from './behavior-pack';

import * as Animation from './animation';
import * as AnimationController from './animation-controller';
import * as Biome from './biome';
import * as Block from './block';
import * as Entity from './entity';
import * as Feature from './feature';
import * as FeatureRule from './feature_rule';
import * as Item from './item';
import * as ItemCatalog from './item_catalog';
import * as LootTable from './loot-table';
import * as Function from './mcfunction';
import * as Recipe from './recipe';
import * as Structure from './structure';
import * as Trading from './trading';

/** */
export class BehaviorPackCollection extends PackCollection<BehaviorPack> {
  /**The collection of animations*/
  readonly animations: DataSetConnector<Animation.Animation, BehaviorPack>;
  /**The collection of animations controllers*/
  readonly animationControllers: DataSetConnector<AnimationController.AnimationController, BehaviorPack>;
  /**The collection of blocks*/
  readonly blocks: DataSetConnector<Block.Block, BehaviorPack>;
  /**The collection of biomes*/
  readonly biomes: DataSetConnector<Biome.Biome, BehaviorPack>;
  /**The collection of entities*/
  readonly entities: DataSetConnector<Entity.Entity, BehaviorPack>;
  /**The collection of features*/
  readonly features: DataSetConnector<Feature.Feature, BehaviorPack>;
  /**The collection of features rules*/
  readonly featuresRules: DataSetConnector<FeatureRule.FeatureRule, BehaviorPack>;
  /**The collection of mcfunctions*/
  readonly functions: DataSetConnector<Function.Function, BehaviorPack>;
  /**The collection of items*/
  readonly items: DataSetConnector<Item.Item, BehaviorPack>;
  /**The collection of items*/
  readonly itemGroups: DataSetConnector<ItemCatalog.Group, BehaviorPack>;
  /**The collection of loot tables*/
  readonly lootTables: DataSetConnector<LootTable.LootTable, BehaviorPack>;
  /**The collection of recipes*/
  readonly recipes: DataSetConnector<Recipe.Recipe, BehaviorPack>;
  /**The collection of structures*/
  readonly structures: DataSetConnector<Structure.Structure, BehaviorPack>;
  /**The collection of trading tables*/
  readonly trading: DataSetConnector<Trading.Trading, BehaviorPack>;

  constructor() {
    super();

    //Connections
    this.animations = new DataSetConnector(this, (pack) => pack.animations);
    this.animationControllers = new DataSetConnector(this, (pack) => pack.animationControllers);
    this.blocks = new DataSetConnector(this, (pack) => pack.blocks);
    this.biomes = new DataSetConnector(this, (pack) => pack.biomes);
    this.entities = new DataSetConnector(this, (pack) => pack.entities);
    this.functions = new DataSetConnector(this, (pack) => pack.functions);
    this.items = new DataSetConnector(this, (pack) => pack.items);
    this.itemGroups = new DataSetConnector(this, (pack) => pack.itemGroups);
    this.lootTables = new DataSetConnector(this, (pack) => pack.lootTables);
    this.recipes = new DataSetConnector(this, (pack) => pack.recipes);
    this.structures = new DataSetConnector(this, (pack) => pack.structures);
    this.trading = new DataSetConnector(this, (pack) => pack.trading);
    this.features = new DataSetConnector(this, (pack) => pack.features);
    this.featuresRules = new DataSetConnector(this, (pack) => pack.featuresRules);
  }

  /**
   *
   * @param folder
   * @param context
   * @param manifest
   * @returns
   */
  add(folder: string, context: MCProject | string, manifest: Manifest): BehaviorPack {
    const out = new BehaviorPack(folder, context, manifest);
    this.packs.push(out);

    return out;
  }
}
