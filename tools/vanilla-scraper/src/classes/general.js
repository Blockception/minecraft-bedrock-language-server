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
exports.General = void 0;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const identifier_extension_1 = require("../static/identifier-extension");
const json_1 = require("../static/json");
const typescript_1 = require("../static/typescript");
const general_entity_1 = require("./general-entity");
/**
 * General data (combined from all sources)
 */
class General {
    entityData = new general_entity_1.GeneralEntity();
    biomes = [];
    cameraPresets = [];
    cooldownCategory = [];
    dimensions = [];
    effects = [];
    enchantments = [];
    potionEffects = [];
    potionModifiers = [];
    potionTypes = [];
    features;
    /**
     * Load general base data from a folder
     */
    static load(folder) {
        const out = new General();
        out.potionModifiers = (0, json_1.loadStringArray)(path.join(folder, 'potion_modifiers.json'));
        out.potionTypes = (0, json_1.loadStringArray)(path.join(folder, 'potion_types.json'));
        return out;
    }
    /**
     * Scrape from output
     */
    scrapeFromOutput(output) {
        this.scrapeFromSet(output.edu);
        this.scrapeFromSet(output.vanilla);
    }
    /**
     * Scrape from output set
     */
    scrapeFromSet(output) {
        this.scrapeFromBP(output.behaviorPack);
    }
    /**
     * Scrape from BP container
     */
    scrapeFromBP(data) {
        this.entityData.scrape(data);
    }
    /**
     * Clean and sort data
     */
    clean() {
        this.entityData.clean();
        this.biomes = (0, identifier_extension_1.cleanStrings)(this.biomes);
        this.cameraPresets = (0, identifier_extension_1.cleanStrings)(this.cameraPresets);
        this.cooldownCategory = (0, identifier_extension_1.cleanStrings)(this.cooldownCategory);
        this.dimensions = (0, identifier_extension_1.cleanStrings)(this.dimensions);
        this.effects = (0, identifier_extension_1.cleanStrings)((0, identifier_extension_1.duplicateWithoutNamespace)(this.effects));
        this.enchantments = (0, identifier_extension_1.cleanStrings)(this.enchantments);
        this.potionEffects = (0, identifier_extension_1.cleanStrings)((0, identifier_extension_1.duplicateWithoutNamespace)(this.potionEffects));
        this.potionModifiers = (0, identifier_extension_1.cleanStrings)(this.potionModifiers);
        this.potionTypes = (0, identifier_extension_1.cleanStrings)(this.potionTypes);
    }
    /**
     * Save general data to a folder
     */
    save(folder) {
        fs.mkdirSync(folder, { recursive: true });
        (0, typescript_1.saveSingle)('GeneralEntity', './format', 'EntityData', this.entityData, path.join(folder, 'entities.ts'));
        (0, typescript_1.saveArray)('string', null, 'Biomes', this.biomes, path.join(folder, 'biomes.ts'));
        (0, typescript_1.saveArray)('string', null, 'CameraPresets', this.cameraPresets, path.join(folder, 'camera_presets.ts'));
        (0, typescript_1.saveArray)('string', null, 'CooldownCategory', this.cooldownCategory, path.join(folder, 'cooldown_category.ts'));
        (0, typescript_1.saveArray)('string', null, 'Dimensions', this.dimensions, path.join(folder, 'dimensions.ts'));
        (0, typescript_1.saveArray)('string', null, 'Effects', this.effects, path.join(folder, 'effects.ts'));
        (0, typescript_1.saveArray)('string', null, 'Enchantments', this.enchantments, path.join(folder, 'enchantments.ts'));
        (0, typescript_1.saveArray)('string', null, 'PotionEffects', this.potionEffects, path.join(folder, 'potion_effects.ts'));
        (0, typescript_1.saveArray)('string', null, 'PotionModifiers', this.potionModifiers, path.join(folder, 'potion_modifiers.ts'));
        (0, typescript_1.saveArray)('string', null, 'PotionTypes', this.potionTypes, path.join(folder, 'potion_types.ts'));
    }
}
exports.General = General;
//# sourceMappingURL=general.js.map