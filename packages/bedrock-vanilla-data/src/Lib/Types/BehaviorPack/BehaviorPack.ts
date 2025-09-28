import { Biome } from './Biome';
import { Block } from "./Block";
import { Entity } from "./Entity";
import { Feature } from "./Feature";
import { Item } from "./Item";
import { LootTable } from "./LootTable";
import { Trading } from "./Trading";

/**The interface that stores vanilla behavior pack data*/
export interface BehaviorPack {
  /**The collection of biomes*/
  readonly biomes: Biome[];

  /**The collection of blocks*/
  readonly blocks: Block[];

  /**The collection of entities*/
  readonly entities: Entity[];

  /**The collection of features*/
  readonly features: Feature[];

  /**The collection of items*/
  readonly items: Item[];

  /**The collection of loot tables*/
  readonly loot_tables: LootTable[];

  /**The collection of trading*/
  readonly trading: Trading[];
}
