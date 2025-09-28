"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResourcePackCollection = void 0;
const types_1 = require("../../types");
const resource_pack_1 = require("./resource-pack");
/** */
class ResourcePackCollection extends types_1.PackCollection {
    /**Creates a new instances of the class*/
    constructor() {
        super();
        //Connections
        this.animations = new types_1.DataSetConnector(this, (pack) => pack.animations);
        this.animation_controllers = new types_1.DataSetConnector(this, (pack) => pack.animation_controllers);
        this.attachables = new types_1.DataSetConnector(this, (pack) => pack.attachables);
        this.block_culling_rules = new types_1.DataSetConnector(this, (pack) => pack.block_culling_rules);
        this.entities = new types_1.DataSetConnector(this, (pack) => pack.entities);
        this.fogs = new types_1.DataSetConnector(this, (pack) => pack.fogs);
        this.materials = new types_1.DataSetConnector(this, (pack) => pack.materials);
        this.models = new types_1.DataSetConnector(this, (pack) => pack.models);
        this.particles = new types_1.DataSetConnector(this, (pack) => pack.particles);
        this.render_controllers = new types_1.DataSetConnector(this, (pack) => pack.render_controllers);
        this.sounds = new types_1.DataSetConnector(this, (pack) => pack.sounds);
        this.textures = new types_1.DataSetConnector(this, (pack) => pack.textures);
        this.itemTextures = new types_1.DataSetConnector(this, (pack) => pack.itemTextures);
        this.terrainTextures = new types_1.DataSetConnector(this, (pack) => pack.terrainTextures);
    }
    add(folder, context, manifest) {
        const out = new resource_pack_1.ResourcePack(folder, context, manifest);
        this.packs.push(out);
        return out;
    }
}
exports.ResourcePackCollection = ResourcePackCollection;
//# sourceMappingURL=resource-pack-collection.js.map