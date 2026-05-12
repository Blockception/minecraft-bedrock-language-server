"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BehaviorPackCollection = void 0;
const types_1 = require("../../types");
const behavior_pack_1 = require("./behavior-pack");
/** */
class BehaviorPackCollection extends types_1.PackCollection {
    /**The collection of animations*/
    animations;
    /**The collection of animations controllers*/
    animationControllers;
    /**The collection of blocks*/
    blocks;
    /**The collection of biomes*/
    biomes;
    /**The collection of entities*/
    entities;
    /**The collection of features*/
    features;
    /**The collection of features rules*/
    featuresRules;
    /**The collection of mcfunctions*/
    functions;
    /**The collection of items*/
    items;
    /**The collection of items*/
    itemGroups;
    /**The collection of loot tables*/
    lootTables;
    /**The collection of recipes*/
    recipes;
    /**The collection of structures*/
    structures;
    /**The collection of trading tables*/
    trading;
    constructor() {
        super();
        //Connections
        this.animations = new types_1.DataSetConnector(this, (pack) => pack.animations);
        this.animationControllers = new types_1.DataSetConnector(this, (pack) => pack.animationControllers);
        this.blocks = new types_1.DataSetConnector(this, (pack) => pack.blocks);
        this.biomes = new types_1.DataSetConnector(this, (pack) => pack.biomes);
        this.entities = new types_1.DataSetConnector(this, (pack) => pack.entities);
        this.functions = new types_1.DataSetConnector(this, (pack) => pack.functions);
        this.items = new types_1.DataSetConnector(this, (pack) => pack.items);
        this.itemGroups = new types_1.DataSetConnector(this, (pack) => pack.itemGroups);
        this.lootTables = new types_1.DataSetConnector(this, (pack) => pack.lootTables);
        this.recipes = new types_1.DataSetConnector(this, (pack) => pack.recipes);
        this.structures = new types_1.DataSetConnector(this, (pack) => pack.structures);
        this.trading = new types_1.DataSetConnector(this, (pack) => pack.trading);
        this.features = new types_1.DataSetConnector(this, (pack) => pack.features);
        this.featuresRules = new types_1.DataSetConnector(this, (pack) => pack.featuresRules);
    }
    /**
     *
     * @param folder
     * @param context
     * @param manifest
     * @returns
     */
    add(folder, context, manifest) {
        const out = new behavior_pack_1.BehaviorPack(folder, context, manifest);
        this.packs.push(out);
        return out;
    }
}
exports.BehaviorPackCollection = BehaviorPackCollection;
//# sourceMappingURL=behavior-pack-collection.js.map