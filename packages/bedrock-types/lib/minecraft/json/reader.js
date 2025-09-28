"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompactJsonReader = void 0;
const compact_1 = require("./compact");
class CompactJsonReader {
    /**
     * Creates a new instance of the CompactJsonReader class
     * @param data The data to read
     */
    constructor(data) {
        this._data = data;
    }
    /** The type of the node */
    get type() {
        return this._data.type;
    }
    /** The offset this node was found at */
    get offset() {
        return this._data.offset;
    }
    /** If the value of this node is negative or not */
    get negative() {
        return this._data.negative;
    }
    /** The value of the node */
    get value() {
        return this._data.value;
    }
    /** The key of the node */
    get key() {
        return this._data.key;
    }
    /** Checks if this reader is a string or not */
    isString() {
        return compact_1.CompactJson.isString(this._data);
    }
    /** Checks if this reader is a object or not */
    isObject() {
        return compact_1.CompactJson.isObject(this._data);
    }
    /** Checks if this reader is a array or not */
    isArray() {
        return compact_1.CompactJson.isArray(this._data);
    }
    /** Checks if this reader is a array or object or not */
    isArrayOrObject() {
        return compact_1.CompactJson.isArrayOrObject(this._data);
    }
    /**
     * Checks if this node has a key
     * @returns True if this node has a key
     */
    hasKey() {
        return compact_1.CompactJson.hasKey(this._data);
    }
    /**
     * Gets the name of child nodes
     * @returns The names of the child nodes
     */
    names() {
        const data = this._data;
        const names = [];
        if (compact_1.CompactJson.isString(data)) {
            return names;
        }
        for (const item of data.value) {
            if (compact_1.CompactJson.hasKey(item)) {
                names.push(item.key);
            }
        }
        return names;
    }
    /**
     * Gets the value of the node at the specified index
     * @param name The name of the node to get
     * @returns The value of the node
     */
    get(name) {
        const result = [];
        const data = this._data;
        if (compact_1.CompactJson.isString(data)) {
            return result;
        }
        for (const item of data.value) {
            if (compact_1.CompactJson.hasKey(item) && item.key === name) {
                result.push(new CompactJsonReader(item));
            }
        }
        return result;
    }
    /**
     * loops through all the items in the node
     * @param callbackfn The callback function to call for each item
     * @returns The result of the callback function
     */
    forEach(callbackfn) {
        const data = this._data;
        if (compact_1.CompactJson.isString(data)) {
            return;
        }
        for (let i = 0; i < data.value.length; i++) {
            callbackfn(new CompactJsonReader(data.value[i]), i);
        }
    }
    /**
     * Check if the node has a child node with the specified name
     * @param name The name of the node to check
     * @returns True if the node has a child node with the specified name
     */
    contains(name) {
        const data = this._data;
        if (compact_1.CompactJson.isString(data)) {
            return false;
        }
        for (const item of data.value) {
            if (compact_1.CompactJson.hasKey(item) && item.key === name) {
                return true;
            }
        }
        return false;
    }
}
exports.CompactJsonReader = CompactJsonReader;
//# sourceMappingURL=reader.js.map