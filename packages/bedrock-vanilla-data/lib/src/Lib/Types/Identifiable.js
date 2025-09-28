"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Identifiable = void 0;
/**
 *
 */
var Identifiable;
(function (Identifiable) {
    /**
     *
     * @param value
     * @returns
     */
    function is(value) {
        if (value && typeof value.id === "string")
            return true;
        return false;
    }
    Identifiable.is = is;
    /**
     *
     * @param items
     * @param find
     */
    function find(items, findID) {
        const id = typeof findID === "string" ? findID : findID.id;
        for (let index = 0; index < items.length; index++) {
            if (items[index].id === id)
                return index;
        }
        return -1;
    }
    Identifiable.find = find;
    /**
     *
     * @param items
     * @param find
     */
    function has(items, findID) {
        return find(items, findID) >= 0;
    }
    Identifiable.has = has;
    /**
     *
     * @param items
     * @param find
     */
    function get(items, findID) {
        const id = typeof findID === "string" ? findID : findID.id;
        for (let index = 0; index < items.length; index++) {
            if (items[index].id === id)
                return items[index];
        }
        return undefined;
    }
    Identifiable.get = get;
})(Identifiable || (exports.Identifiable = Identifiable = {}));
//# sourceMappingURL=Identifiable.js.map