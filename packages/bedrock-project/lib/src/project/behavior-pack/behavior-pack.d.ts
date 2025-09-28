import { MCProject } from "bc-minecraft-project";
import { Manifest } from "../../internal/types";
import { Container, DataSet, Pack, TextDocument } from "../../types";
import { PackType } from "../pack-type";
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
    [K in keyof T]: T[K] extends DataSet<infer _U> ? K : never;
};
type ItemTypes = CollectFieldsOfType<BehaviorPack>[keyof BehaviorPack];
type DataSetTypes = CollectionFieldsDataSet<BehaviorPack>[keyof BehaviorPack];
export type BehaviorPackKeys = FieldKeysDataSet<BehaviorPack>[keyof BehaviorPack];
/** */
export declare class BehaviorPack implements Container, Pack {
    readonly type: PackType;
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
    constructor(folder: string, context: MCProject | string, manifest: Manifest);
    /**
     *
     * @param doc
     */
    process(doc: TextDocument): DataSetTypes | undefined;
    /**
     *
     * @param uri
     * @returns
     */
    getDataset(uri: string): DataSetTypes | undefined;
    /**
     *
     * @param uri
     * @returns
     */
    deleteFile(uri: string): boolean;
    /**
     *
     * @param uri
     */
    deleteFolder(uri: string): boolean;
    /**
     *
     * @param predicate
     * @returns
     */
    find(predicate: (value: ItemTypes, key: string) => boolean): ItemTypes | undefined;
    /**
     *
     * @param predicate
     * @returns
     */
    forEach(callbackfn: (value: ItemTypes) => void): void;
}
/**
 *
 */
export declare namespace BehaviorPack {
    /**
     *
     * @param value
     * @returns
     */
    function is(value: any): value is BehaviorPack;
}
export {};
