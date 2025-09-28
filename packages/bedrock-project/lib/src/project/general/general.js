"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeneralCollection = void 0;
const types_1 = require("../../types");
const behavior_pack_1 = require("../behavior-pack");
const process_1 = require("./types/commands/process");
/**The class GeneralCollection description*/
class GeneralCollection {
    constructor() {
        this.fakeEntities = new types_1.DataSet();
        this.objectives = new types_1.DataSet();
        this.structures = new types_1.DataSet();
        this.tags = new types_1.DataSet();
        this.tickingAreas = new types_1.DataSet();
    }
    /**
     *
     * @param doc
     * @returns
     */
    process(doc) {
        const type = behavior_pack_1.FileType.detect(doc.uri);
        switch (type) {
            case behavior_pack_1.FileType.function:
                return (0, process_1.ProcessMcFunction)(doc, this);
            default:
                return this;
        }
    }
    /**
     *
     * @param uri
     * @returns
     */
    deleteFile(uri) {
        let out = false;
        out = this.fakeEntities.deleteFile(uri) || out;
        out = this.objectives.deleteFile(uri) || out;
        out = this.tags.deleteFile(uri) || out;
        out = this.tickingAreas.deleteFile(uri) || out;
        return out;
    }
    /**
     *
     * @param uri
     * @returns
     */
    deleteFolder(uri) {
        let out = false;
        out = this.fakeEntities.deleteFolder(uri) || out;
        out = this.objectives.deleteFolder(uri) || out;
        out = this.tags.deleteFolder(uri) || out;
        out = this.tickingAreas.deleteFolder(uri) || out;
        return out;
    }
    /**
     *
     * @param predicate
     * @returns
     */
    find(predicate) {
        let value = undefined;
        if ((value = this.fakeEntities.find(predicate)))
            return value;
        if ((value = this.objectives.find(predicate)))
            return value;
        if ((value = this.structures.find(predicate)))
            return value;
        if ((value = this.tags.find(predicate)))
            return value;
        if ((value = this.tickingAreas.find(predicate)))
            return value;
        return value;
    }
    /**
     *
     * @param predicate
     * @returns
     */
    forEach(callbackfn) {
        this.fakeEntities.forEach(callbackfn);
        this.objectives.forEach(callbackfn);
        this.structures.forEach(callbackfn);
        this.tags.forEach(callbackfn);
        this.tickingAreas.forEach(callbackfn);
    }
}
exports.GeneralCollection = GeneralCollection;
//# sourceMappingURL=general.js.map