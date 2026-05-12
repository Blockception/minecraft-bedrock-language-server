"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PackCollection = void 0;
const find_in_packs_1 = require("./find-in-packs");
/**The class PackCollection description*/
class PackCollection {
    /** */
    packs;
    /**Creates a new instances of the class*/
    constructor() {
        this.packs = [];
    }
    /**
     *
     * @param doc
     */
    process(doc) {
        const pack = this.get(doc);
        if (pack) {
            return pack.process(doc);
        }
        return undefined;
    }
    /** */
    count() {
        return this.packs.length;
    }
    /**
     *
     * @param doc
     * @returns
     */
    get(doc) {
        const uri = typeof doc === 'string' ? doc : doc.uri;
        return (0, find_in_packs_1.findInPacks)(this.packs, (pack) => (uri.startsWith(pack.folder) ? pack : undefined));
    }
    /**
     *
     * @param folder
     * @returns
     */
    delete(folder) {
        const old = this.packs.length;
        this.packs = this.packs.filter((value) => value.folder !== folder);
        return old !== this.packs.length;
    }
    /**
     *
     * @param uri
     * @returns
     */
    deleteFile(uri) {
        const p = this.get(uri);
        if (p)
            return p.deleteFile(uri);
        return false;
    }
    /**
     *
     * @param uri
     * @returns
     */
    deleteFolder(uri) {
        let out = false;
        //If the folder that has been deleted is a pack, then the pack will have been removed
        out = this.delete(uri) || out;
        //Checks if the folder is inside the pack
        const p = this.get(uri);
        if (p)
            out = p.deleteFolder(uri) || out;
        return out;
    }
    /**
     *
     * @param predicate
     * @returns
     */
    find(predicate) {
        return (0, find_in_packs_1.findInPacks)(this.packs, (pack) => pack.find(predicate));
    }
}
exports.PackCollection = PackCollection;
//# sourceMappingURL=pack-collection.js.map