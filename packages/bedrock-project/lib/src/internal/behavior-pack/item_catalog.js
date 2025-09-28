"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemCatalog = void 0;
/** */
var ItemCatalog;
(function (ItemCatalog) {
    /**
     *
     * @param value
     * @returns
     */
    function is(value) {
        if (value && typeof value.format_version === "string" && typeof value === 'object') {
            const catalog = value['minecraft:crafting_items_catalog'];
            if (!catalog || typeof catalog != 'object')
                return false;
            const categories = catalog.categories;
            if (Array.isArray(categories) && categories.length >= 1 && typeof categories[0] == 'object')
                return true;
        }
        return false;
    }
    ItemCatalog.is = is;
})(ItemCatalog || (exports.ItemCatalog = ItemCatalog = {}));
//# sourceMappingURL=item_catalog.js.map