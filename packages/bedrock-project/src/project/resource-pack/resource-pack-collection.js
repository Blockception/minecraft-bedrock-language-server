"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResourcePackCollection = void 0;
const types_1 = require("../../types");
const resource_pack_1 = require("./resource-pack");
/** */
class ResourcePackCollection extends types_1.PackCollection {
    /**The collection of  animations*/
    animations;
    /**The collection of animations controllers*/
    animationControllers;
    /**The collection of animations controllers*/
    attachables;
    /**The collection of block_culling_rules*/
    blockCullingRules;
    /**The collection of entities*/
    entities;
    /**The collection of fogs*/
    fogs;
    /**The collection of materials*/
    materials;
    /**The collection of models*/
    models;
    /**The collection of models*/
    particles;
    /**The collection of sounds*/
    renderControllers;
    /**The collection of sounds*/
    sounds;
    /**The collection of textures*/
    textures;
    /**The collection of textures from item_texture.json*/
    itemTextures;
    /**The collection of textures from terrain_texture.json*/
    terrainTextures;
    /**The collection of UI elements*/
    uiElements;
    /**Creates a new instances of the class*/
    constructor() {
        super();
        //Connections
        this.animations = new types_1.DataSetConnector(this, (pack) => pack.animations);
        this.animationControllers = new types_1.DataSetConnector(this, (pack) => pack.animationControllers);
        this.attachables = new types_1.DataSetConnector(this, (pack) => pack.attachables);
        this.blockCullingRules = new types_1.DataSetConnector(this, (pack) => pack.blockCullingRules);
        this.entities = new types_1.DataSetConnector(this, (pack) => pack.entities);
        this.fogs = new types_1.DataSetConnector(this, (pack) => pack.fogs);
        this.materials = new types_1.DataSetConnector(this, (pack) => pack.materials);
        this.models = new types_1.DataSetConnector(this, (pack) => pack.models);
        this.particles = new types_1.DataSetConnector(this, (pack) => pack.particles);
        this.renderControllers = new types_1.DataSetConnector(this, (pack) => pack.renderControllers);
        this.sounds = new types_1.DataSetConnector(this, (pack) => pack.sounds);
        this.textures = new types_1.DataSetConnector(this, (pack) => pack.textures);
        this.itemTextures = new types_1.DataSetConnector(this, (pack) => pack.itemTextures);
        this.terrainTextures = new types_1.DataSetConnector(this, (pack) => pack.terrainTextures);
        this.uiElements = new types_1.DataSetConnector(this, (pack) => pack.uiElements);
    }
    add(folder, context, manifest) {
        const out = new resource_pack_1.ResourcePack(folder, context, manifest);
        this.packs.push(out);
        return out;
    }
}
exports.ResourcePackCollection = ResourcePackCollection;
//# sourceMappingURL=resource-pack-collection.js.map