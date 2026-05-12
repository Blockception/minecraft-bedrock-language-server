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
exports.scrape = scrape;
exports.scrapeSource = scrapeSource;
const path = __importStar(require("path"));
const block_1 = require("./block");
const biome_1 = require("./biome");
const entity_1 = require("./entity");
const item_1 = require("./item");
const loot_table_1 = require("./loot-table");
const trading_1 = require("./trading");
const convert_1 = require("../static/convert");
/**
 * Scrape behavior pack data from multiple sources
 */
function scrape(sources, container) {
    for (const source of sources) {
        scrapeSource(source, container);
    }
}
/**
 * Scrape behavior pack data from a single source
 */
function scrapeSource(source, container) {
    console.log('Scraping BP: ' + source);
    (0, convert_1.fromFolderJson)(block_1.convertBlock, container.blocks, path.join(source, 'blocks'));
    (0, convert_1.fromFolderJson)(biome_1.convertBiome, container.biomes, path.join(source, 'biomes'));
    (0, convert_1.fromFolderJson)(entity_1.convertEntity, container.entities, path.join(source, 'entities'));
    (0, convert_1.fromFolderJson)(item_1.convertItem, container.items, path.join(source, 'items'));
    (0, convert_1.fromFolderFile)(loot_table_1.convertLootTable, container.lootTables, path.join(source, 'loot_tables'));
    (0, convert_1.fromFolderFile)(trading_1.convertTrading, container.trading, path.join(source, 'trading'));
}
//# sourceMappingURL=scraper.js.map