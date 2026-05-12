"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModeHandler = void 0;
const mode_collection_1 = require("./mode-collection");
/**
 * Handler class that provides convenient methods for working with mode collections.
 * Implements ModeCollection interface and wraps common mode collection operations.
 */
class ModeHandler {
    /**The collection of different modes*/
    modes;
    /**The name of the collection*/
    name;
    constructor(collection) {
        this.modes = collection.modes;
        this.name = collection.name;
    }
    /**
     * Checks if a given value exists as a mode name in this collection.
     * @param value The mode name to look for
     * @returns True if the value exists as a mode name, false otherwise
     */
    isValue(value) {
        return mode_collection_1.ModeCollection.isValue(this, value);
    }
    /**
     * Retrieves a mode from this collection by name or index.
     * @param index The mode name (string) or array index (number) to retrieve
     * @returns The Mode object if found, undefined otherwise
     */
    get(index) {
        return mode_collection_1.ModeCollection.get(this, index);
    }
    /**
     * Iterates over all modes in the collection, calling the callback function for each mode.
     * @param callbackfn Function to execute for each mode
     * @param thisArg Optional value to use as 'this' when executing callback
     */
    foreach(callbackfn, thisArg) {
        return this.modes.forEach(callbackfn, thisArg);
    }
}
exports.ModeHandler = ModeHandler;
//# sourceMappingURL=mode-handler.js.map