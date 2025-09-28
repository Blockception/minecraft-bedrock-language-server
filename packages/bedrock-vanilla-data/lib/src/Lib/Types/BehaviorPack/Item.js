"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Item = void 0;
/**
 *
 */
var Item;
(function (Item) {
    /**
     *
     * @param value
     * @returns
     */
    function is(value) {
        if (value) {
            if (typeof value.id === "string" && typeof value.max_damage === "number")
                return true;
        }
        return false;
    }
    Item.is = is;
})(Item || (exports.Item = Item = {}));
//# sourceMappingURL=Item.js.map