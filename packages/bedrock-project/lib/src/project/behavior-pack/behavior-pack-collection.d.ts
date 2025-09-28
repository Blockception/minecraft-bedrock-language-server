import { MCProject } from "bc-minecraft-project";
import { Manifest } from "../../internal/types";
import { DataSetConnector, PackCollection } from "../../types";
import { BehaviorPack } from "./behavior-pack";
import * as Animation from "./animation";
import * as AnimationController from "./animation-controller";
import * as Biome from "./biome";
import * as Block from "./block";
import * as Entity from "./entity";
import * as Feature from "./feature";
import * as FeatureRule from "./feature_rule";
import * as Item from "./item";
import * as ItemCatalog from './item_catalog';
import * as LootTable from "./loot-table";
import * as Function from "./mcfunction";
import * as Recipe from "./recipe";
import * as Structure from "./structure";
import * as Trading from "./trading";
/** */
export declare class BehaviorPackCollection extends PackCollection<BehaviorPack> {
    /**The collection of animations*/
    readonly animations: DataSetConnector<Animation.Animation, BehaviorPack>;
    /**The collection of animations controllers*/
    readonly animation_controllers: DataSetConnector<AnimationController.AnimationController, BehaviorPack>;
    /**The collection of blocks*/
    readonly blocks: DataSetConnector<Block.Block, BehaviorPack>;
    /**The collection of biomes*/
    readonly biomes: DataSetConnector<Biome.Biome, BehaviorPack>;
    /**The collection of entities*/
    readonly entities: DataSetConnector<Entity.Entity, BehaviorPack>;
    /**The collection of features*/
    readonly features: DataSetConnector<Feature.Feature, BehaviorPack>;
    /**The collection of features rules*/
    readonly features_rules: DataSetConnector<FeatureRule.FeatureRule, BehaviorPack>;
    /**The collection of mcfunctions*/
    readonly functions: DataSetConnector<Function.Function, BehaviorPack>;
    /**The collection of items*/
    readonly items: DataSetConnector<Item.Item, BehaviorPack>;
    /**The collection of items*/
    readonly items_groups: DataSetConnector<ItemCatalog.Group, BehaviorPack>;
    /**The collection of loot tables*/
    readonly loot_tables: DataSetConnector<LootTable.LootTable, BehaviorPack>;
    /**The collection of recipes*/
    readonly recipes: DataSetConnector<Recipe.Recipe, BehaviorPack>;
    /**The collection of structures*/
    readonly structures: DataSetConnector<Structure.Structure, BehaviorPack>;
    /**The collection of trading tables*/
    readonly trading: DataSetConnector<Trading.Trading, BehaviorPack>;
    constructor();
    /**
     *
     * @param folder
     * @param context
     * @param manifest
     * @returns
     */
    add(folder: string, context: MCProject | string, manifest: Manifest): BehaviorPack;
}
