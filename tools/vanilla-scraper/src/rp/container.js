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
const lang_1 = require("./lang");
/**
 * Container for resource pack data
 */
class Container {
    animationControllers = [];
    animations = [];
    entities = [];
    fogs = [];
    materials = [];
    models = [];
    particles = [];
    renderControllers = [];
    sounds = [];
    textures = [];
    textureItems = [];
    textureTerrain = [];
    soundFiles = [];
    langs = [];
    /**
     * Load container from a folder
     */
    static load(folder) {
        const out = new Container();
        out.animationControllers = (0, json_1.loadEnsure)(path.join(folder, 'animation_controllers.json'));
        out.animations = (0, json_1.loadEnsure)(path.join(folder, 'animations.json'));
        out.entities = (0, json_1.loadEnsure)(path.join(folder, 'entities.json'));
        out.fogs = (0, json_1.loadEnsure)(path.join(folder, 'fogs.json'));
        out.materials = (0, json_1.loadEnsure)(path.join(folder, 'materials.json'));
        out.models = (0, json_1.loadEnsure)(path.join(folder, 'models.json'));
        out.particles = (0, json_1.loadEnsure)(path.join(folder, 'particles.json'));
        out.renderControllers = (0, json_1.loadEnsure)(path.join(folder, 'render_controllers.json'));
        out.sounds = (0, json_1.loadEnsure)(path.join(folder, 'sounds.json'));
        out.textureItems = (0, json_1.loadEnsure)(path.join(folder, 'texture-atlas-item.json'));
        out.textures = (0, json_1.loadEnsure)(path.join(folder, 'textures.json'));
        out.textureTerrain = (0, json_1.loadEnsure)(path.join(folder, 'texture-atlas-terrain.json'));
        out.langs = (0, json_1.loadEnsure)(path.join(folder, 'lang.json'));
        return out;
    }
    /**
     * Save container to a folder
     */
    save(folder) {
        fs.mkdirSync(folder, { recursive: true });
        (0, typescript_1.saveArray)('Animation', '../../types/resourcepack/animation', 'Animations', this.animations, path.join(folder, 'animations.ts'));
        (0, typescript_1.saveArray)('AnimationController', '../../types/resourcepack/animation_controller', 'AnimationControllers', this.animationControllers, path.join(folder, 'animation_controllers.ts'));
        (0, typescript_1.saveArray)('Entity', '../../types/resourcepack/entity', 'Entities', this.entities, path.join(folder, 'entities.ts'));
        (0, typescript_1.saveArray)('Model', '../../types/resourcepack/model', 'Models', this.models, path.join(folder, 'models.ts'));
        (0, typescript_1.saveArray)('string', null, 'Fogs', this.fogs.map((f) => f.id), path.join(folder, 'fogs.ts'));
        (0, typescript_1.saveArray)('string', null, 'Materials', this.materials.map((m) => m.id), path.join(folder, 'materials.ts'));
        (0, typescript_1.saveArray)('string', null, 'Particles', this.particles.map((p) => p.id), path.join(folder, 'particles.ts'));
        (0, typescript_1.saveArray)('string', null, 'RenderControllers', this.renderControllers.map((rc) => rc.id), path.join(folder, 'render_controllers.ts'));
        (0, typescript_1.saveArray)('string', null, 'SoundFiles', this.soundFiles, path.join(folder, 'sounds_files.ts'));
        (0, typescript_1.saveArray)('string', null, 'Sounds', this.sounds.map((s) => s.id), path.join(folder, 'sounds.ts'));
        (0, typescript_1.saveArray)('string', null, 'TextureItems', this.textureItems.map((ti) => ti.id), path.join(folder, 'texture-atlas-item.ts'));
        (0, typescript_1.saveArray)('string', null, 'Textures', this.textures.map((t) => t.id), path.join(folder, 'textures.ts'));
        (0, typescript_1.saveArray)('string', null, 'TextureTerrain', this.textureTerrain.map((tt) => tt.id), path.join(folder, 'texture-atlas-terrain.ts'));
        (0, typescript_1.saveArray)('Lang', '../../types/resourcepack/lang', 'Langs', this.langs, path.join(folder, 'lang.ts'));
    }
    /**
     * Clean and deduplicate data
     */
    clean() {
        this.animationControllers = (0, sanitize_1.ensureProperties)((0, identifier_extension_1.cleanIdentifiers)(this.animationControllers), animation_controller_1.createAnimationController);
        this.animations = (0, sanitize_1.ensureProperties)((0, identifier_extension_1.cleanIdentifiers)(this.animations), animation_1.createAnimation);
        this.entities = (0, sanitize_1.ensureProperties)((0, identifier_extension_1.cleanIdentifiers)(this.entities), entity_1.createEntity);
        this.fogs = (0, sanitize_1.ensureProperties)((0, identifier_extension_1.cleanIdentifiers)(this.fogs), fog_1.createFog);
        this.materials = (0, sanitize_1.ensureProperties)((0, identifier_extension_1.cleanIdentifiers)(this.materials), material_1.createMaterial);
        this.models = (0, sanitize_1.ensureProperties)((0, identifier_extension_1.cleanIdentifiers)(this.models), model_1.createModel);
        this.particles = (0, sanitize_1.ensureProperties)((0, identifier_extension_1.cleanIdentifiers)(this.particles), particle_1.createParticle);
        this.renderControllers = (0, sanitize_1.ensureProperties)((0, identifier_extension_1.cleanIdentifiers)(this.renderControllers), render_controller_1.createRenderController);
        this.sounds = (0, sanitize_1.ensureProperties)((0, identifier_extension_1.cleanIdentifiers)(this.sounds), sound_1.createSound);
        this.textures = (0, sanitize_1.ensureProperties)((0, identifier_extension_1.cleanIdentifiers)(this.textures), texture_1.createTexture);
        this.textureItems = (0, sanitize_1.ensureProperties)((0, identifier_extension_1.cleanIdentifiers)(this.textureItems), texture_atlas_1.createTextureAtlas);
        this.textureTerrain = (0, sanitize_1.ensureProperties)((0, identifier_extension_1.cleanIdentifiers)(this.textureTerrain), texture_atlas_1.createTextureAtlas);
        this.soundFiles.sort();
        this.langs = (0, sanitize_1.ensureProperties)((0, identifier_extension_1.cleanIdentifiers)(this.langs), lang_1.createLang);
    }
}
exports.Container = Container;
//# sourceMappingURL=container.js.map