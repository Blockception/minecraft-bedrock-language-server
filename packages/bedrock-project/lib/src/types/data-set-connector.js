"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataSetConnector = void 0;
/**
 * The class DataSetConnector description
 */
class DataSetConnector {
    constructor(collection, getDataset) {
        this._collection = collection;
        this._getDataset = getDataset;
    }
    /** @inheritdoc */
    get(id) {
        var _a;
        const packs = this._collection.packs;
        if (!packs)
            return undefined;
        for (let I = 0; I < packs.length; I++) {
            const p = packs[I];
            const item = (_a = this._getDataset(p)) === null || _a === void 0 ? void 0 : _a.get(id);
            if (item)
                return item;
        }
        return undefined;
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
        for (let I = 0; I < packs.length; I++) {
            const p = packs[I];
            const dataset = this._getDataset(p);
            dataset === null || dataset === void 0 ? void 0 : dataset.forEach(callbackfn, thisArg);
        }
    }
    /** @inheritdoc */
    find(predicate) {
        const packs = this._collection.packs;
        if (!packs)
            return undefined;
        for (let I = 0; I < packs.length; I++) {
            const p = packs[I];
            const dataset = this._getDataset(p);
            const out = dataset === null || dataset === void 0 ? void 0 : dataset.find(predicate);
            if (out)
                return out;
        }
        return undefined;
    }
}
exports.DataSetConnector = DataSetConnector;
//# sourceMappingURL=data-set-connector.js.map