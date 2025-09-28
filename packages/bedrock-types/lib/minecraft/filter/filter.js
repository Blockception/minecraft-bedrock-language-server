"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Filter = void 0;
/**
 *
 */
var Filter;
(function (Filter) {
    /**
     *
     * @param value
     * @returns
     */
    function is(value) {
        if (typeof value === "object") {
            return typeof value.test === "string";
        }
        return false;
    }
    Filter.is = is;
    /**
     *
     * @param item
     * @param callback
     * @returns
     */
    function forEach(item, callback) {
        if (Array.isArray(item)) {
            item.forEach((i) => forEach(i, callback));
            return;
        }
        if (typeof item !== "object")
            return;
        if (Filter.is(item)) {
            callback(item);
        }
        item = item;
        if (item.any_of)
            forEach(item.any_of, callback);
        if (item.all_of)
            forEach(item.all_of, callback);
        if (item.none_of)
            forEach(item.none_of, callback);
    }
    Filter.forEach = forEach;
})(Filter || (exports.Filter = Filter = {}));
//# sourceMappingURL=filter.js.map