import { MCProject } from "bc-minecraft-project";
import { Manifest } from "../../internal/types";
import { Container, DataSet, Pack, TextDocument } from "../../types";
import { PackType } from "../pack-type";
import { FileType } from "./file-type";

import * as Animation from "./animation";
import * as AnimationController from "./animation-controller";
import * as Biome from "./biome";
import * as Block from "./block";
import * as Entity from "./entity";
import * as Feature from "./feature";
import * as FeatureRule from "./feature_rule";
import * as Item from "./item";
import * as ItemCatalog from "./item_catalog";
import * as LootTable from "./loot-table";
import * as Function from "./mcfunction";
import * as Recipe from "./recipe";
import * as Structure from "./structure";
import * as Trading from "./trading";

type CollectFieldsOfType<T> = {
  [K in keyof T]: T[K] extends DataSet<infer U> ? U : never;
};
type CollectionFieldsDataSet<T> = {
  [K in keyof T]: T[K] extends DataSet<infer U> ? DataSet<U> : never;
};

type FieldKeysDataSet<T> = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  [K in keyof T]: T[K] extends DataSet<infer _U> ? K : never;
};

type ItemTypes = CollectFieldsOfType<BehaviorPack>[keyof BehaviorPack];
type DataSetTypes = CollectionFieldsDataSet<BehaviorPack>[keyof BehaviorPack];

export type BehaviorPackKeys = FieldKeysDataSet<BehaviorPack>[keyof BehaviorPack];

/** */
export class BehaviorPack implements Container, Pack {
  readonly type: PackType = PackType.behavior_pack;
  readonly folder: string;
  readonly context: MCProject;
  readonly manifest: Manifest;

  /**The collection of animations*/
  readonly animations: DataSet<Animation.Animation>;
  /**The collection of animations controllers*/
  readonly animation_controllers: DataSet<AnimationController.AnimationController>;
  /**The collection of biomes*/
  readonly biomes: DataSet<Biome.Biome>;
  /**The collection of blocks*/
  readonly blocks: DataSet<Block.Block>;
  /**The collection of entities*/
  readonly entities: DataSet<Entity.Entity>;
  /**The collection of features*/
  readonly features: DataSet<Feature.Feature>;
  /**The collection of features*/
  readonly features_rules: DataSet<FeatureRule.FeatureRule>;
  /**The collection of mcfunctions*/
  readonly functions: DataSet<Function.Function>;
  /**The collection of items*/
  readonly item_groups: DataSet<ItemCatalog.Group>;
  /**The collection of items*/
  readonly items: DataSet<Item.Item>;
  /**The collection of loot tables*/
  readonly loot_tables: DataSet<LootTable.LootTable>;
  /**The collection of recipes*/
  readonly recipes: DataSet<Recipe.Recipe>;
  /**The collection of structures*/
  readonly structures: DataSet<Structure.Structure>;
  /**The collection of trading tables*/
  readonly trading: DataSet<Trading.Trading>;

  /**
   * @param folder The folder of the behavior
   * @param context The Mcproject data or the filepath to read from.*/
  constructor(folder: string, context: MCProject | string, manifest: Manifest) {
    this.folder = folder;
    this.manifest = manifest;
    this.context = typeof context === "object" ? context : MCProject.loadSync(context);

    this.animations = new DataSet();
    this.animation_controllers = new DataSet();
    this.biomes = new DataSet();
    this.blocks = new DataSet();
    this.entities = new DataSet();
    this.functions = new DataSet();
    this.items = new DataSet();
    this.loot_tables = new DataSet();
    this.recipes = new DataSet();
    this.structures = new DataSet();
    this.trading = new DataSet();
    this.features = new DataSet();
    this.features_rules = new DataSet();
    this.item_groups = new DataSet();
  }

  /**
   *
   * @param doc
   */
  process(doc: TextDocument): DataSetTypes | undefined {
    this.deleteFile(doc.uri);
    const Type = FileType.detect(doc.uri);

    //If extended, also extend the delete
    switch (Type) {
      case FileType.animation:
        return this.animations.set(Animation.process(doc));

      case FileType.animation_controller:
        return this.animation_controllers.set(AnimationController.process(doc));

      case FileType.block:
        return this.blocks.set(Block.process(doc));

      case FileType.entity:
        return this.entities.set(Entity.process(doc));

      case FileType.function:
        return this.functions.set(Function.process(doc));

      case FileType.item:
        return this.items.set(Item.process(doc));

      case FileType.loot_table:
        return this.loot_tables.set(LootTable.process(doc));

      case FileType.structure:
        return this.structures.set(Structure.process(doc));

      case FileType.trading:
        return this.trading.set(Trading.process(doc));

      case FileType.feature:
        return this.features.set(Feature.process(doc));

      case FileType.feature_rule:
        return this.features_rules.set(FeatureRule.process(doc));

      case FileType.item_catalog:
        return this.item_groups.set(ItemCatalog.process(doc));

      case FileType.biome:
        return this.biomes.set(Biome.process(doc));

      case FileType.recipe:
        return this.recipes.set(Recipe.process(doc));
    }

    return undefined;
  }

  /**
   *
   * @param uri
   * @returns
   */
  getDataset(uri: string): DataSetTypes | undefined {
    const Type = FileType.detect(uri);

    switch (Type) {
      case FileType.animation:
        return this.animations;

      case FileType.animation_controller:
        return this.animation_controllers;

      case FileType.block:
        return this.blocks;

      case FileType.entity:
        return this.entities;

      case FileType.feature:
        return this.features;

      case FileType.feature_rule:
        return this.features_rules;

      case FileType.function:
        return this.functions;

      case FileType.item:
        return this.items;

      case FileType.item_catalog:
        return this.item_groups;

      case FileType.loot_table:
        return this.loot_tables;

      case FileType.structure:
        return this.structures;

      case FileType.trading:
        return this.trading;

      case FileType.biome:
        return this.biomes;

      case FileType.recipe:
        return this.recipes;

      default:
        return undefined;
    }
  }

  /**
   *
   * @param uri
   * @returns
   */
  deleteFile(uri: string): boolean {
    let out = false;

    out = this.animations.deleteFile(uri) || out;
    out = this.animation_controllers.deleteFile(uri) || out;
    out = this.biomes.deleteFile(uri) || out;
    out = this.blocks.deleteFile(uri) || out;
    out = this.entities.deleteFile(uri) || out;
    out = this.features.deleteFile(uri) || out;
    out = this.features_rules.deleteFile(uri) || out;
    out = this.functions.deleteFile(uri) || out;
    out = this.items.deleteFile(uri) || out;
    out = this.item_groups.deleteFile(uri) || out;
    out = this.loot_tables.deleteFile(uri) || out;
    out = this.recipes.deleteFile(uri) || out;
    out = this.structures.deleteFile(uri) || out;
    out = this.trading.deleteFile(uri) || out;

    return out;
  }

  /**
   *
   * @param uri
   */
  deleteFolder(uri: string): boolean {
    let out = false;

    out = this.animations.deleteFolder(uri) || out;
    out = this.animation_controllers.deleteFolder(uri) || out;
    out = this.biomes.deleteFolder(uri) || out;
    out = this.blocks.deleteFolder(uri) || out;
    out = this.entities.deleteFolder(uri) || out;
    out = this.features.deleteFolder(uri) || out;
    out = this.features_rules.deleteFolder(uri) || out;
    out = this.functions.deleteFolder(uri) || out;
    out = this.items.deleteFolder(uri) || out;
    out = this.item_groups.deleteFolder(uri) || out;
    out = this.loot_tables.deleteFolder(uri) || out;
    out = this.recipes.deleteFolder(uri) || out;
    out = this.structures.deleteFolder(uri) || out;
    out = this.trading.deleteFolder(uri) || out;

    return out;
  }

  /**
   *
   * @param predicate
   * @returns
   */
  find(predicate: (value: ItemTypes, key: string) => boolean): ItemTypes | undefined {
    let value = undefined;

    if ((value = this.animations.find(predicate))) return value;
    if ((value = this.animation_controllers.find(predicate))) return value;
    if ((value = this.biomes.find(predicate))) return value;
    if ((value = this.blocks.find(predicate))) return value;
    if ((value = this.entities.find(predicate))) return value;
    if ((value = this.features.find(predicate))) return value;
    if ((value = this.features_rules.find(predicate))) return value;
    if ((value = this.functions.find(predicate))) return value;
    if ((value = this.items.find(predicate))) return value;
    if ((value = this.item_groups.find(predicate))) return value;
    if ((value = this.loot_tables.find(predicate))) return value;
    if ((value = this.recipes.find(predicate))) return value;
    if ((value = this.structures.find(predicate))) return value;
    if ((value = this.trading.find(predicate))) return value;

    return value;
  }

  /**
   *
   * @param predicate
   * @returns
   */
  forEach(callbackfn: (value: ItemTypes) => void): void {
    this.animations.forEach(callbackfn);
    this.animation_controllers.forEach(callbackfn);
    this.biomes.forEach(callbackfn);
    this.blocks.forEach(callbackfn);
    this.entities.forEach(callbackfn);
    this.features.forEach(callbackfn);
    this.features_rules.forEach(callbackfn);
    this.functions.forEach(callbackfn);
    this.items.forEach(callbackfn);
    this.item_groups.forEach(callbackfn);
    this.loot_tables.forEach(callbackfn);
    this.recipes.forEach(callbackfn);
    this.structures.forEach(callbackfn);
    this.trading.forEach(callbackfn);
  }
}

/**
 *
 */
export namespace BehaviorPack {
  /**
   *
   * @param value
   * @returns
   */
  export function is(value: any): value is BehaviorPack {
    if (typeof value === "object") {
      const temp = <BehaviorPack>value;
      //Order is determined buy likely / unlikely it is that it missing
      if (typeof temp.functions !== "object") return false;
      if (typeof temp.items !== "object") return false;
      if (typeof temp.loot_tables !== "object") return false;
      if (typeof temp.structures !== "object") return false;
      if (typeof temp.trading !== "object") return false;

      if (typeof temp.animations !== "object") return false;
      if (typeof temp.animation_controllers !== "object") return false;
      if (typeof temp.blocks !== "object") return false;
      if (typeof temp.entities !== "object") return false;
      if (typeof temp.features !== "object") return false;
      if (typeof temp.features_rules !== "object") return false;
      if (typeof temp.item_groups !== "object") return false;
      if (typeof temp.biomes !== "object") return false;
      if (typeof temp.recipes !== "object") return false;

      if (typeof temp.context !== "object") return false;
      if (typeof temp.folder !== "string") return false;

      return true;
    }

    return false;
  }
}
