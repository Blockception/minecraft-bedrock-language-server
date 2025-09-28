"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Item = void 0;
/** */
var Item;
(function (Item) {
    /**
     *
     * @param value
     * @returns
     */
    function is(value) {
        if (value && typeof value.format_version === "string" && typeof value["minecraft:item"] === "object") {
            const b = value["minecraft:item"];
            if (typeof b.description === "object" &&
                typeof b.description.identifier === "string" &&
                typeof b.components === "object") {
                return true;
            }
        }
        return false;
    }
    Item.is = is;
})(Item || (exports.Item = Item = {}));
//# sourceMappingURL=item.js.map