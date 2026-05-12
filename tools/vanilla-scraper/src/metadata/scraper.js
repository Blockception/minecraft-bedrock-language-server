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
const vanilla_module_1 = require("./vanilla-module");
const named_object_1 = require("./named-object");
const block_1 = require("./block");
const item_1 = require("./item");
/**
 * Scrape metadata from multiple sources
 */
function scrape(sources, bpContainer, general) {
    for (const source of sources) {
        scrapeSource(source, bpContainer, general);
    }
}
/**
 * Scrape metadata from a single source
 */
function scrapeSource(source, bpContainer, general) {
    console.log('Scraping Metadata: ' + source);
    const vanillaModules = path.join(source, 'vanilladata_modules');
    (0, vanilla_module_1.convertVanillaModule)(path.join(vanillaModules, 'mojang-biomes.json'), general.biomes, named_object_1.convertNamedObjectToString);
    (0, vanilla_module_1.convertVanillaModule)(path.join(vanillaModules, 'mojang-blocks.json'), bpContainer.blocks, block_1.convertMetadataBlock);
    (0, vanilla_module_1.convertVanillaModule)(path.join(vanillaModules, 'mojang-camera-presets.json'), general.cameraPresets, named_object_1.convertNamedObjectToString);
    (0, vanilla_module_1.convertVanillaModule)(path.join(vanillaModules, 'mojang-cooldown-category.json'), general.cooldownCategory, named_object_1.convertNamedObjectToString);
    (0, vanilla_module_1.convertVanillaModule)(path.join(vanillaModules, 'mojang-dimensions.json'), general.dimensions, named_object_1.convertNamedObjectToString);
    (0, vanilla_module_1.convertVanillaModule)(path.join(vanillaModules, 'mojang-effects.json'), general.effects, named_object_1.convertNamedObjectToString);
    (0, vanilla_module_1.convertVanillaModule)(path.join(vanillaModules, 'mojang-enchantments.json'), general.enchantments, named_object_1.convertNamedObjectToString);
    (0, vanilla_module_1.convertVanillaModule)(path.join(vanillaModules, 'mojang-entities.json'), bpContainer.entities, named_object_1.convertNamedObjectToEntity);
    (0, vanilla_module_1.convertVanillaModule)(path.join(vanillaModules, 'mojang-features.json'), general.features || [], named_object_1.convertNamedObjectToString);
    // Add features to BP container
    (0, vanilla_module_1.convertVanillaModule)(path.join(vanillaModules, 'mojang-features.json'), bpContainer.features, named_object_1.convertNamedObjectToString);
    (0, vanilla_module_1.convertVanillaModuleFlat)(path.join(vanillaModules, 'mojang-items.json'), bpContainer.items, item_1.convertMetadataItem);
    (0, vanilla_module_1.convertVanillaModule)(path.join(vanillaModules, 'mojang-potion-effects.json'), general.potionEffects, named_object_1.convertNamedObjectToString);
    (0, vanilla_module_1.convertVanillaModule)(path.join(vanillaModules, 'mojang-potion-modifiers.json'), general.potionModifiers, named_object_1.convertNamedObjectToString);
    (0, vanilla_module_1.convertVanillaModule)(path.join(vanillaModules, 'mojang-potion-json'), general.potionTypes, named_object_1.convertNamedObjectToString);
}
//# sourceMappingURL=scraper.js.map