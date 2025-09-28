"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModeHandler = void 0;
const mode_collection_1 = require("./mode-collection");
/**TODO add documentation
 *
 */
class ModeHandler {
    constructor(collection) {
        this.modes = collection.modes;
        this.name = collection.name;
    }
    /**TODO add documentation
     *
     * @param value
     * @returns
     */
    isValue(value) {
        return mode_collection_1.ModeCollection.isValue(this, value);
    }
    /**TODO add documentation
     *
     * @param index
     * @returns
     */
    get(index) {
        return mode_collection_1.ModeCollection.get(this, index);
    }
    /**TODO add documentation
     *
     * @param callbackfn
     * @param thisArg
     * @returns
     */
    foreach(callbackfn, thisArg) {
        return this.modes.forEach(callbackfn, thisArg);
    }
}
exports.ModeHandler = ModeHandler;
//# sourceMappingURL=mode-handler.js.map