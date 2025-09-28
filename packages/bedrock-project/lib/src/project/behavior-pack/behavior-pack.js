"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.BehaviorPack = void 0;
const bc_minecraft_project_1 = require("bc-minecraft-project");
const types_1 = require("../../types");
const pack_type_1 = require("../pack-type");
const file_type_1 = require("./file-type");
const Animation = __importStar(require("./animation"));
const AnimationController = __importStar(require("./animation-controller"));
const Biome = __importStar(require("./biome"));
const Block = __importStar(require("./block"));
const Entity = __importStar(require("./entity"));
const Feature = __importStar(require("./feature"));
const FeatureRule = __importStar(require("./feature_rule"));
const Item = __importStar(require("./item"));
const ItemCatalog = __importStar(require("./item_catalog"));
const LootTable = __importStar(require("./loot-table"));
const Function = __importStar(require("./mcfunction"));
const Recipe = __importStar(require("./recipe"));
const Structure = __importStar(require("./structure"));
const Trading = __importStar(require("./trading"));
/** */
class BehaviorPack {
    /**
     * @param folder The folder of the behavior
     * @param context The Mcproject data or the filepath to read from.*/
    constructor(folder, context, manifest) {
        this.type = pack_type_1.PackType.behavior_pack;
        this.folder = folder;
        this.manifest = manifest;
        this.context = typeof context === "object" ? context : bc_minecraft_project_1.MCProject.loadSync(context);
        this.animations = new types_1.DataSet();
        this.animation_controllers = new types_1.DataSet();
        this.biomes = new types_1.DataSet();
        this.blocks = new types_1.DataSet();
        this.entities = new types_1.DataSet();
        this.functions = new types_1.DataSet();
        this.items = new types_1.DataSet();
        this.loot_tables = new types_1.DataSet();
        this.recipes = new types_1.DataSet();
        this.structures = new types_1.DataSet();
        this.trading = new types_1.DataSet();
        this.features = new types_1.DataSet();
        this.features_rules = new types_1.DataSet();
        this.item_groups = new types_1.DataSet();
    }
    /**
     *
     * @param doc
     */
    process(doc) {
        this.deleteFile(doc.uri);
        const Type = file_type_1.FileType.detect(doc.uri);
        //If extended, also extend the delete
        switch (Type) {
            case file_type_1.FileType.animation:
                return this.animations.set(Animation.process(doc));
            case file_type_1.FileType.animation_controller:
                return this.animation_controllers.set(AnimationController.process(doc));
            case file_type_1.FileType.block:
                return this.blocks.set(Block.process(doc));
            case file_type_1.FileType.entity:
                return this.entities.set(Entity.process(doc));
            case file_type_1.FileType.function:
                return this.functions.set(Function.process(doc));
            case file_type_1.FileType.item:
                return this.items.set(Item.process(doc));
            case file_type_1.FileType.loot_table:
                return this.loot_tables.set(LootTable.process(doc));
            case file_type_1.FileType.structure:
                return this.structures.set(Structure.process(doc));
            case file_type_1.FileType.trading:
                return this.trading.set(Trading.process(doc));
            case file_type_1.FileType.feature:
                return this.features.set(Feature.process(doc));
            case file_type_1.FileType.feature_rule:
                return this.features_rules.set(FeatureRule.process(doc));
            case file_type_1.FileType.item_catalog:
                return this.item_groups.set(ItemCatalog.process(doc));
            case file_type_1.FileType.biome:
                return this.biomes.set(Biome.process(doc));
            case file_type_1.FileType.recipe:
                return this.recipes.set(Recipe.process(doc));
        }
        return undefined;
    }
    /**
     *
     * @param uri
     * @returns
     */
    getDataset(uri) {
        const Type = file_type_1.FileType.detect(uri);
        switch (Type) {
            case file_type_1.FileType.animation:
                return this.animations;
            case file_type_1.FileType.animation_controller:
                return this.animation_controllers;
            case file_type_1.FileType.block:
                return this.blocks;
            case file_type_1.FileType.entity:
                return this.entities;
            case file_type_1.FileType.feature:
                return this.features;
            case file_type_1.FileType.feature_rule:
                return this.features_rules;
            case file_type_1.FileType.function:
                return this.functions;
            case file_type_1.FileType.item:
                return this.items;
            case file_type_1.FileType.item_catalog:
                return this.item_groups;
            case file_type_1.FileType.loot_table:
                return this.loot_tables;
            case file_type_1.FileType.structure:
                return this.structures;
            case file_type_1.FileType.trading:
                return this.trading;
            case file_type_1.FileType.biome:
                return this.biomes;
            case file_type_1.FileType.recipe:
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
    deleteFile(uri) {
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
    deleteFolder(uri) {
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
    find(predicate) {
        let value = undefined;
        if ((value = this.animations.find(predicate)))
            return value;
        if ((value = this.animation_controllers.find(predicate)))
            return value;
        if ((value = this.biomes.find(predicate)))
            return value;
        if ((value = this.blocks.find(predicate)))
            return value;
        if ((value = this.entities.find(predicate)))
            return value;
        if ((value = this.features.find(predicate)))
            return value;
        if ((value = this.features_rules.find(predicate)))
            return value;
        if ((value = this.functions.find(predicate)))
            return value;
        if ((value = this.items.find(predicate)))
            return value;
        if ((value = this.item_groups.find(predicate)))
            return value;
        if ((value = this.loot_tables.find(predicate)))
            return value;
        if ((value = this.recipes.find(predicate)))
            return value;
        if ((value = this.structures.find(predicate)))
            return value;
        if ((value = this.trading.find(predicate)))
            return value;
        return value;
    }
    /**
     *
     * @param predicate
     * @returns
     */
    forEach(callbackfn) {
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
exports.BehaviorPack = BehaviorPack;
/**
 *
 */
(function (BehaviorPack) {
    /**
     *
     * @param value
     * @returns
     */
    function is(value) {
        if (typeof value === "object") {
            const temp = value;
            //Order is determined buy likely / unlikely it is that it missing
            if (typeof temp.functions !== "object")
                return false;
            if (typeof temp.items !== "object")
                return false;
            if (typeof temp.loot_tables !== "object")
                return false;
            if (typeof temp.structures !== "object")
                return false;
            if (typeof temp.trading !== "object")
                return false;
            if (typeof temp.animations !== "object")
                return false;
            if (typeof temp.animation_controllers !== "object")
                return false;
            if (typeof temp.blocks !== "object")
                return false;
            if (typeof temp.entities !== "object")
                return false;
            if (typeof temp.features !== "object")
                return false;
            if (typeof temp.features_rules !== "object")
                return false;
            if (typeof temp.item_groups !== "object")
                return false;
            if (typeof temp.biomes !== "object")
                return false;
            if (typeof temp.recipes !== "object")
                return false;
            if (typeof temp.context !== "object")
                return false;
            if (typeof temp.folder !== "string")
                return false;
            return true;
        }
        return false;
    }
    BehaviorPack.is = is;
})(BehaviorPack || (exports.BehaviorPack = BehaviorPack = {}));
//# sourceMappingURL=behavior-pack.js.map