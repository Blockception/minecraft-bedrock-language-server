"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataSetConnector = void 0;
const find_in_packs_1 = require("./find-in-packs");
/**
 * Connects a {@link PackCollection} to a specific {@link DataSet} field on each pack,
 * exposing a unified {@link IDataSet} view across all packs in the collection.
 *
 * **Lookup order / priority**: packs are queried in the order they appear in
 * {@link PackCollection.packs}. When multiple packs contain an item with the
 * same ID the pack that appears *first* wins and its value is returned. This is
 * the intended behaviour – pack priority is determined by insertion order.
 */
class DataSetConnector {
    _collection;
    _getDataset;
    constructor(collection, getDataset) {
        this._collection = collection;
        this._getDataset = getDataset;
    }
    /** @inheritdoc */
    get(id) {
        const packs = this._collection.packs;
        if (!packs)
            return undefined;
        return (0, find_in_packs_1.findInPacks)(packs, (p) => this._getDataset(p)?.get(id));
    }
    /** @inheritdoc */
    has(id) {
        return this.get(id) !== undefined;
    }
    /**Loops over all items in the collection and call the specified function on them
     * @param callbackfn The function to call for each item
     * @param thisArg The this argument*/
    forEach(callbackfn, thisArg) {
        const packs = this._collection.packs;
        if (!packs)
            return undefined;
        // All packs must be visited (no early-exit), so Array.forEach is used here.
        packs.forEach((p) => this._getDataset(p)?.forEach(callbackfn, thisArg));
    }
    /** @inheritdoc */
    find(predicate) {
        const packs = this._collection.packs;
        if (!packs)
            return undefined;
        return (0, find_in_packs_1.findInPacks)(packs, (p) => this._getDataset(p)?.find(predicate));
    }
}
exports.DataSetConnector = DataSetConnector;
//# sourceMappingURL=data-set-connector.js.map