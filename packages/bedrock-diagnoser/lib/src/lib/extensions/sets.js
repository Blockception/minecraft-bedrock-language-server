"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contains = contains;
function contains(set, predicate) {
    for (const entry of set.values()) {
        if (predicate(entry))
            return true;
    }
    return false;
}
//# sourceMappingURL=sets.js.map