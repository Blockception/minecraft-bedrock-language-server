"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Identifiable = void 0;
/** */
var Identifiable;
(function (Identifiable) {
    /**TODO add documentation
     *
     * @param value
     * @returns
     */
    function is(value) {
        if (typeof value === "object" && typeof value.id === "string")
            return true;
        return false;
    }
    Identifiable.is = is;
    /**TODO add documentation
     *
     * @param items
     * @param id
     * @returns
     */
    function has(items, id) {
        for (let I = 0; I < items.length; I++) {
            const elem = items[I];
            if (elem.id == id)
                return true;
        }
        return false;
    }
    Identifiable.has = has;
    /**TODO add documentation
     *
     * @param items
     * @param id
     * @returns
     */
    function get(items, id) {
        for (let I = 0; I < items.length; I++) {
            const elem = items[I];
            if (elem.id === id)
                return elem;
        }
        return undefined;
    }
    Identifiable.get = get;
    /**TODO add documentation
     *
     * @param carrier
     * @returns
     */
    function getId(carrier) {
        if (typeof carrier === "string")
            return carrier;
        return carrier.id;
    }
    Identifiable.getId = getId;
})(Identifiable || (exports.Identifiable = Identifiable = {}));
//# sourceMappingURL=identifiable.js.map