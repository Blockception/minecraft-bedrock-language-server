"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasPattern = hasPattern;
/**
 *
 * @param pattern
 * @param items
 * @returns
 */
function hasPattern(pattern, items) {
    for (let I = 0; I < items.length; I++) {
        if (items[I].includes(pattern))
            return true;
    }
    return false;
}
//# sourceMappingURL=checks.js.map