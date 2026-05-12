"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorldPack = void 0;
const bc_minecraft_project_1 = require("bc-minecraft-project");
const pack_type_1 = require("../pack-type");
/** */
class WorldPack {
    type = pack_type_1.PackType.world;
    folder;
    context;
    manifest;
    /**
     * Creates a new instance of WorldPack
     * @param folder The folder of the behavior
     * @param Context The Mcproject data or the filepath to read from.*/
    constructor(folder, Context, manifest) {
        this.folder = folder;
        this.manifest = manifest;
        this.context = typeof Context === 'object' ? Context : bc_minecraft_project_1.MCProject.loadSync(Context);
    }
    /**
     * Processes the given document and adds it to the world pack data.
     * @param doc The document to process
     * @returns The dataset the document was added to, or undefined
     * TODO: Implement indexing of world-pack embedded files (behavior_packs / resource_packs sub-folders).
     */
    process(doc) {
        return undefined;
    }
    /**
     * Returns the dataset that corresponds to the given uri.
     * @param uri The uri of the document
     * @returns The dataset, or undefined
     * TODO: Implement dataset lookup for world-pack embedded files (behavior_packs / resource_packs sub-folders).
     */
    getDataset(uri) {
        return undefined;
    }
    /**
     * Removes the given file from all datasets.
     * @param uri The uri of the file to remove
     * @returns true if any data was removed
     * TODO: Implement file removal for world-pack embedded files (behavior_packs / resource_packs sub-folders).
     */
    deleteFile(uri) {
        return false;
    }
    /**
     * Removes all files under the given folder from all datasets.
     * @param uri The uri of the folder to remove
     * @returns true if any data was removed
     * TODO: Implement folder removal for world-pack embedded files (behavior_packs / resource_packs sub-folders).
     */
    deleteFolder(uri) {
        return false;
    }
    /**
     * Searches all datasets for the first item matching the predicate.
     * @param predicate The predicate function to match items against
     * @returns The first matching item, or undefined
     * TODO: Implement find for world-pack embedded files (behavior_packs / resource_packs sub-folders).
     */
    find(predicate) {
        return undefined;
    }
    /**
     * Iterates over all items in all datasets.
     * @param callbackfn The callback to invoke for each item
     * TODO: Implement forEach for world-pack embedded files (behavior_packs / resource_packs sub-folders).
     */
    forEach(callbackfn) { }
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
        if (typeof value === 'object') {
            const temp = value;
            //Order is determined buy likely / unlikely it is that it missing
            if (typeof temp.context !== 'object')
                return false;
            if (typeof temp.folder !== 'string')
                return false;
            return true;
        }
        return false;
    }
    WorldPack.is = is;
})(WorldPack || (exports.WorldPack = WorldPack = {}));
//# sourceMappingURL=world-pack.js.map