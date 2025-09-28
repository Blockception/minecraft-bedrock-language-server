"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataSet = void 0;
const bc_minecraft_bedrock_types_1 = require("bc-minecraft-bedrock-types");
/** */
class DataSet {
    constructor() {
        this._data = new Map();
    }
    /** @inheritdoc */
    clear() {
        this._data.clear();
    }
    /** @inheritdoc */
    count() {
        return this._data.size;
    }
    /** @inheritdoc */
    delete(key) {
        if (typeof key !== "string")
            key = key.id;
        return this._data.delete(key);
    }
    /** @inheritdoc */
    deleteFile(uri) {
        let out = false;
        this._data.forEach((item, key) => {
            if (item.location.uri === uri) {
                this._data.delete(key);
                out = true;
            }
        });
        return out;
    }
    /** @inheritdoc */
    deleteFolder(uri) {
        let out = false;
        this._data.forEach((item, key) => {
            if (item.location.uri.startsWith(uri)) {
                this._data.delete(key);
                out = true;
            }
        });
        return out;
    }
    /**Loops over all items in the collection and call the specified function on them
     * @param callbackfn The function to call for each item
     * @param thisArg The this argument*/
    forEach(callbackfn, thisArg) {
        this._data.forEach(callbackfn, thisArg);
    }
    /**
     *
     * @param predicate
     * @returns
     */
    find(predicate) {
        for (const item of this._data.entries()) {
            if (predicate(item[1], item[0]))
                return item[1];
        }
        return undefined;
    }
    /**
     *
     * @param key
     * @returns
     */
    get(key) {
        return this._data.get(bc_minecraft_bedrock_types_1.Types.Identifiable.getId(key));
    }
    /** @inheritdoc */
    has(key) {
        return this._data.has(bc_minecraft_bedrock_types_1.Types.Identifiable.getId(key));
    }
    /**
     *
     * @param value
     * @returns
     */
    set(value) {
        if (value) {
            if (Array.isArray(value)) {
                value.forEach((i) => this._data.set(i.id, i));
            }
            else {
                this._data.set(value.id, value);
            }
        }
        return this;
    }
}
exports.DataSet = DataSet;
//# sourceMappingURL=data-set.js.map