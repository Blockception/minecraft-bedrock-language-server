"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorldPack = void 0;
const bc_minecraft_project_1 = require("bc-minecraft-project");
const pack_type_1 = require("../pack-type");
/** */
class WorldPack {
    /**
     * Creates a new instance of WorldPack
     * @param folder The folder of the behavior
     * @param Context The Mcproject data or the filepath to read from.*/
    constructor(folder, Context, manifest) {
        this.type = pack_type_1.PackType.world;
        this.folder = folder;
        this.manifest = manifest;
        this.context = typeof Context === "object" ? Context : bc_minecraft_project_1.MCProject.loadSync(Context);
    }
    /**
     *
     * @param doc
     */
    process() {
        this.deleteFile();
        return undefined;
    }
    /**
     *
     * @param uri
     * @returns
     */
    getDataset() {
        return undefined;
    }
    /**
     *
     * @param uri
     * @returns
     */
    deleteFile() {
        return false;
    }
    /**
     *
     * @param uri
     */
    deleteFolder() {
        return false;
    }
    /**
     *
     * @param predicate
     * @returns
     */
    find() {
        const value = undefined;
        return value;
    }
    /**
     *
     * @param predicate
     * @returns
     */
    forEach() { }
}
exports.WorldPack = WorldPack;
/**
 *
 */
(function (WorldPack) {
    /**
     *
     * @param value
     * @returns
     */
    function is(value) {
        if (typeof value === "object") {
            const temp = value;
            //Order is determined buy likely / unlikely it is that it missing
            if (typeof temp.context !== "object")
                return false;
            if (typeof temp.folder !== "string")
                return false;
            return true;
        }
        return false;
    }
    WorldPack.is = is;
})(WorldPack || (exports.WorldPack = WorldPack = {}));
//# sourceMappingURL=world-pack.js.map