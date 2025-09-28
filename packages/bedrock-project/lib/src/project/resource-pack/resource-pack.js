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
exports.ResourcePack = void 0;
const bc_minecraft_project_1 = require("bc-minecraft-project");
const types_1 = require("../../types");
const pack_type_1 = require("../pack-type");
const file_type_1 = require("./file-type");
const Animation = __importStar(require("./animation"));
const AnimationController = __importStar(require("./animation-controller"));
const Attachable = __importStar(require("./attachable"));
const BlockCulling = __importStar(require("./block-culling"));
const Entity = __importStar(require("./entity"));
const Fog = __importStar(require("./fog"));
const Material = __importStar(require("./material"));
const Model = __importStar(require("./model"));
const Particle = __importStar(require("./particle"));
const RenderController = __importStar(require("./render-controller"));
const Sound = __importStar(require("./sound"));
const Texture = __importStar(require("./texture"));
/** */
class ResourcePack {
    /**
     * Creates a new instance of ResourcePack
     * @param folder The folder of the behavior
     * @param Context The Mcproject data or the filepath to read from*/
    constructor(folder, Context, manifest) {
        this.type = pack_type_1.PackType.resource_pack;
        this.manifest = manifest;
        this.folder = folder;
        this.context = typeof Context === "object" ? Context : bc_minecraft_project_1.MCProject.loadSync(Context);
        this.animation_controllers = new types_1.DataSet();
        this.animations = new types_1.DataSet();
        this.attachables = new types_1.DataSet();
        this.block_culling_rules = new types_1.DataSet();
        this.entities = new types_1.DataSet();
        this.fogs = new types_1.DataSet();
        this.materials = new types_1.DataSet();
        this.models = new types_1.DataSet();
        this.particles = new types_1.DataSet();
        this.render_controllers = new types_1.DataSet();
        this.sounds = new types_1.DataSet();
        this.textures = new types_1.DataSet();
        this.itemTextures = new types_1.DataSet();
        this.terrainTextures = new types_1.DataSet();
    }
    /**
     *
     * @param doc
     */
    process(doc) {
        this.deleteFile(doc.uri);
        const Type = file_type_1.FileType.detect(doc.uri);
        switch (Type) {
            case file_type_1.FileType.animation:
                return this.animations.set(Animation.process(doc));
            case file_type_1.FileType.animation_controller:
                return this.animation_controllers.set(AnimationController.process(doc));
            case file_type_1.FileType.block_culling_rules:
                return this.block_culling_rules.set(BlockCulling.process(doc));
            case file_type_1.FileType.attachable:
                return this.attachables.set(Attachable.process(doc));
            case file_type_1.FileType.entity:
                return this.entities.set(Entity.process(doc));
            case file_type_1.FileType.fog:
                return this.fogs.set(Fog.process(doc));
            case file_type_1.FileType.material:
                return this.materials.set(Material.process(doc));
            case file_type_1.FileType.model:
                return this.models.set(Model.process(doc));
            case file_type_1.FileType.render_controller:
                return this.render_controllers.set(RenderController.process(doc));
            case file_type_1.FileType.particle:
                return this.particles.set(Particle.process(doc));
            case file_type_1.FileType.sounds_definitions:
                return this.sounds.set(Sound.process(doc));
            case file_type_1.FileType.texture:
                return this.textures.set(Texture.ProcessTextureAtlas(doc));
            case file_type_1.FileType.texture_item_atlas:
                return this.itemTextures.set(Texture.ProcessTextureAtlas(doc));
            case file_type_1.FileType.texture_terrain_atlas:
                return this.terrainTextures.set(Texture.ProcessTextureAtlas(doc));
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
            case file_type_1.FileType.attachable:
                return this.attachables;
            case file_type_1.FileType.block_culling_rules:
                return this.block_culling_rules;
            case file_type_1.FileType.entity:
                return this.entities;
            case file_type_1.FileType.fog:
                return this.fogs;
            case file_type_1.FileType.material:
                return this.materials;
            case file_type_1.FileType.model:
                return this.models;
            case file_type_1.FileType.particle:
                return this.particles;
            case file_type_1.FileType.render_controller:
                return this.particles;
            case file_type_1.FileType.sounds_definitions:
                return this.sounds;
            case file_type_1.FileType.texture:
                return this.itemTextures;
            case file_type_1.FileType.texture_item_atlas:
                return this.itemTextures;
            case file_type_1.FileType.texture_terrain_atlas:
                return this.terrainTextures;
            default:
                return undefined;
        }
    }
    /**
     *
     * @param uri
     */
    deleteFolder(uri) {
        let out = false;
        out = this.animations.deleteFolder(uri) || out;
        out = this.animation_controllers.deleteFolder(uri) || out;
        out = this.attachables.deleteFolder(uri) || out;
        out = this.block_culling_rules.deleteFolder(uri) || out;
        out = this.entities.deleteFolder(uri) || out;
        out = this.fogs.deleteFolder(uri) || out;
        out = this.materials.deleteFolder(uri) || out;
        out = this.models.deleteFolder(uri) || out;
        out = this.particles.deleteFolder(uri) || out;
        out = this.sounds.deleteFolder(uri) || out;
        out = this.textures.deleteFolder(uri) || out;
        out = this.itemTextures.deleteFolder(uri) || out;
        out = this.terrainTextures.deleteFolder(uri) || out;
        return out;
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
        out = this.attachables.deleteFile(uri) || out;
        out = this.block_culling_rules.deleteFile(uri) || out;
        out = this.entities.deleteFile(uri) || out;
        out = this.fogs.deleteFile(uri) || out;
        out = this.materials.deleteFile(uri) || out;
        out = this.models.deleteFile(uri) || out;
        out = this.particles.deleteFile(uri) || out;
        out = this.sounds.deleteFile(uri) || out;
        out = this.textures.deleteFile(uri) || out;
        out = this.itemTextures.deleteFile(uri) || out;
        out = this.terrainTextures.deleteFile(uri) || out;
        return out;
    }
    /**
     *
     * @param predicate
     * @returns
     */
    find(predicate) {
        let value = undefined;
        if ((value = this.animation_controllers.find(predicate)))
            return value;
        if ((value = this.animations.find(predicate)))
            return value;
        if ((value = this.attachables.find(predicate)))
            return value;
        if ((value = this.block_culling_rules.find(predicate)))
            return value;
        if ((value = this.entities.find(predicate)))
            return value;
        if ((value = this.fogs.find(predicate)))
            return value;
        if ((value = this.materials.find(predicate)))
            return value;
        if ((value = this.models.find(predicate)))
            return value;
        if ((value = this.particles.find(predicate)))
            return value;
        if ((value = this.render_controllers.find(predicate)))
            return value;
        if ((value = this.sounds.find(predicate)))
            return value;
        if ((value = this.itemTextures.find(predicate)))
            return value;
        if ((value = this.terrainTextures.find(predicate)))
            return value;
        if ((value = this.textures.find(predicate)))
            return value;
        return value;
    }
    /**
     *
     * @param predicate
     * @returns
     */
    forEach(callbackfn) {
        this.animation_controllers.forEach(callbackfn);
        this.animations.forEach(callbackfn);
        this.attachables.forEach(callbackfn);
        this.entities.forEach(callbackfn);
        this.fogs.forEach(callbackfn);
        this.materials.forEach(callbackfn);
        this.models.forEach(callbackfn);
        this.particles.forEach(callbackfn);
        this.render_controllers.forEach(callbackfn);
        this.sounds.forEach(callbackfn);
        this.textures.forEach(callbackfn);
        this.itemTextures.forEach(callbackfn);
        this.terrainTextures.forEach(callbackfn);
    }
}
exports.ResourcePack = ResourcePack;
/**
 *
 */
(function (ResourcePack) {
    /**
     *
     * @param value
     * @returns
     */
    function is(value) {
        if (typeof value === "object") {
            const temp = value;
            //Order is determined buy likely / unlikely it is that it missing
            if (typeof temp.attachables !== "object")
                return false;
            if (typeof temp.fogs !== "object")
                return false;
            if (typeof temp.materials !== "object")
                return false;
            if (typeof temp.models !== "object")
                return false;
            if (typeof temp.particles !== "object")
                return false;
            if (typeof temp.render_controllers !== "object")
                return false;
            if (typeof temp.sounds !== "object")
                return false;
            if (typeof temp.textures !== "object")
                return false;
            if (typeof temp.animations !== "object")
                return false;
            if (typeof temp.animation_controllers !== "object")
                return false;
            if (typeof temp.block_culling_rules !== "object")
                return false;
            if (typeof temp.entities !== "object")
                return false;
            if (typeof temp.context !== "object")
                return false;
            if (typeof temp.folder !== "string")
                return false;
            return true;
        }
        return false;
    }
    ResourcePack.is = is;
})(ResourcePack || (exports.ResourcePack = ResourcePack = {}));
//# sourceMappingURL=resource-pack.js.map