"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addOrSkip = addOrSkip;
/**
 * Add item to list if not already present
 */
function addOrSkip(items, add) {
    if (!items.includes(add)) {
        items.push(add);
    }
}
//# sourceMappingURL=collections.js.map