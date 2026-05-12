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
const animation_1 = require("./animation");
const animation_controller_1 = require("./animation-controller");
const entity_1 = require("./entity");
const fog_1 = require("./fog");
const material_1 = require("./material");
const model_1 = require("./model");
const particle_1 = require("./particle");
const render_controller_1 = require("./render-controller");
const sound_1 = require("./sound");
const texture_1 = require("./texture");
const texture_atlas_1 = require("./texture-atlas");
const convert_1 = require("../static/convert");
const lang_1 = require("./lang");
/**
 * Scrape resource pack data from multiple sources
 */
function scrape(sources, container) {
    for (const source of sources) {
        scrapeSource(source, container);
    }
}
/**
 * Scrape resource pack data from a single source
 */
function scrapeSource(source, container) {
    console.log('Scraping RP: ' + source);
    (0, convert_1.fromFolderJson)(animation_controller_1.convertAnimationController, container.animationControllers, path.join(source, 'animation_controllers'));
    (0, convert_1.fromFolderJson)(animation_1.convertAnimation, container.animations, path.join(source, 'animations'));
    (0, convert_1.fromFolderJson)(entity_1.convertEntity, container.entities, path.join(source, 'entity'));
    (0, convert_1.fromFolderJson)(fog_1.convertFog, container.fogs, path.join(source, 'fogs'));
    (0, convert_1.fromFolderJson)(model_1.convertModel, container.models, path.join(source, 'models'));
    (0, convert_1.fromFolderJson)(particle_1.convertParticle, container.particles, path.join(source, 'particles'));
    (0, convert_1.fromFolderJson)(render_controller_1.convertRenderController, container.renderControllers, path.join(source, 'render_controllers'));
    (0, material_1.convertMaterial)(source, container.materials);
    (0, sound_1.convertSound)(source, container.sounds, container.soundFiles);
    container.textures.push(...(0, texture_1.convertTexture)(source));
    container.textureItems.push(...(0, texture_atlas_1.convertTextureAtlas)(path.join(source, 'textures', 'item_texture.json')));
    container.textureTerrain.push(...(0, texture_atlas_1.convertTextureAtlas)(path.join(source, 'textures', 'terrain_texture.json')));
    container.langs.push(...(0, lang_1.convertLang)(path.join(source, 'texts', 'en_US.lang')));
}
//# sourceMappingURL=scraper.js.map