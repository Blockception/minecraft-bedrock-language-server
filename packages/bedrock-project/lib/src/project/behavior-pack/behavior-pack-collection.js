"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BehaviorPackCollection = void 0;
const types_1 = require("../../types");
const behavior_pack_1 = require("./behavior-pack");
/** */
class BehaviorPackCollection extends types_1.PackCollection {
    constructor() {
        super();
        //Connections
        this.animations = new types_1.DataSetConnector(this, (pack) => pack.animations);
        this.animation_controllers = new types_1.DataSetConnector(this, (pack) => pack.animation_controllers);
        this.blocks = new types_1.DataSetConnector(this, (pack) => pack.blocks);
        this.biomes = new types_1.DataSetConnector(this, (pack) => pack.biomes);
        this.entities = new types_1.DataSetConnector(this, (pack) => pack.entities);
        this.functions = new types_1.DataSetConnector(this, (pack) => pack.functions);
        this.items = new types_1.DataSetConnector(this, (pack) => pack.items);
        this.items_groups = new types_1.DataSetConnector(this, (pack) => pack.item_groups);
        this.loot_tables = new types_1.DataSetConnector(this, (pack) => pack.loot_tables);
        this.recipes = new types_1.DataSetConnector(this, (pack) => pack.recipes);
        this.structures = new types_1.DataSetConnector(this, (pack) => pack.structures);
        this.trading = new types_1.DataSetConnector(this, (pack) => pack.trading);
        this.features = new types_1.DataSetConnector(this, (pack) => pack.features);
        this.features_rules = new types_1.DataSetConnector(this, (pack) => pack.features_rules);
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