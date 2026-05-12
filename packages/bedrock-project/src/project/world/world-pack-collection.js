"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorldPackCollection = void 0;
const types_1 = require("../../types");
const world_pack_1 = require("./world-pack");
/** */
class WorldPackCollection extends types_1.PackCollection {
    constructor() {
        super();
    }
    add(folder, context, manifest) {
        const out = new world_pack_1.WorldPack(folder, context, manifest);
        this.packs.push(out);
        return out;
    }
}
exports.WorldPackCollection = WorldPackCollection;
//# sourceMappingURL=world-pack-collection.js.map