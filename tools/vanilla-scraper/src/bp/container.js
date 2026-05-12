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
exports.Container = void 0;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const identifier_extension_1 = require("../static/identifier-extension");
const json_1 = require("../static/json");
const sanitize_1 = require("../static/sanitize");
const typescript_1 = require("../static/typescript");
const block_1 = require("./block");
const entity_1 = require("./entity");
const item_1 = require("./item");
const loot_table_1 = require("./loot-table");
const trading_1 = require("./trading");
/**
 * Container for behavior pack data
 */
class Container {
    blocks = [];
    biomes = [];
    features = [];
    entities = [];
    items = [];
    lootTables = [];
    trading = [];
    /**
     * Load container from a folder
     */
    static load(folder) {
        const out = new Container();
        out.blocks = (0, json_1.loadEnsure)(path.join(folder, 'blocks.json'));
        out.biomes = (0, json_1.loadEnsure)(path.join(folder, 'biomes.json'));
        out.entities = (0, json_1.loadEnsure)(path.join(folder, 'entities.json'));
        out.items = (0, json_1.loadEnsure)(path.join(folder, 'items.json'));
        out.lootTables = (0, json_1.loadEnsure)(path.join(folder, 'loot_tables.json'));
        out.trading = (0, json_1.loadEnsure)(path.join(folder, 'trading.json'));
        return out;
    }
    /**
     * Save container to a folder
     */
    save(folder) {
        fs.mkdirSync(folder, { recursive: true });
        (0, typescript_1.saveArray)('Block', '../../types/behaviorpack/block', 'Blocks', this.blocks, path.join(folder, 'blocks.ts'));
        (0, typescript_1.saveArray)('Biome', '../../types/behaviorpack/biome', 'Biomes', this.biomes, path.join(folder, 'biomes.ts'));
        (0, typescript_1.saveArray)('Entity', '../../types/behaviorpack/entity', 'Entities', this.entities, path.join(folder, 'entities.ts'));
        (0, typescript_1.saveArray)('Item', '../../types/behaviorpack/item', 'Items', this.items, path.join(folder, 'items.ts'));
        (0, typescript_1.saveArray)('string', null, 'LootTables', this.lootTables.map((lt) => lt.id), path.join(folder, 'loot_tables.ts'));
        (0, typescript_1.saveArray)('string', null, 'Trading', this.trading.map((t) => t.id), path.join(folder, 'trading.ts'));
        (0, typescript_1.saveArray)('string', null, 'Features', this.features, path.join(folder, 'features.ts'));
    }
    /**
     * Clean and deduplicate data
     */
    clean() {
        this.blocks = (0, sanitize_1.ensureProperties)((0, identifier_extension_1.cleanIdentifiers)(this.blocks), block_1.createBlock);
        this.entities = (0, sanitize_1.ensureProperties)((0, identifier_extension_1.cleanIdentifiers)(this.entities), entity_1.createEntity);
        this.features = (0, identifier_extension_1.cleanStrings)(this.features);
        this.items = (0, sanitize_1.ensureProperties)((0, identifier_extension_1.cleanIdentifiers)(this.items), item_1.createItem);
        this.lootTables = (0, sanitize_1.ensureProperties)((0, identifier_extension_1.cleanIdentifiers)(this.lootTables), loot_table_1.createLootTable);
        this.trading = (0, sanitize_1.ensureProperties)((0, identifier_extension_1.cleanIdentifiers)(this.trading), trading_1.createTrading);
    }
}
exports.Container = Container;
//# sourceMappingURL=container.js.map