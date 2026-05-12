"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensureProperties = ensureProperties;
function ensureProperties(items, constructofn) {
    return items.map((item) => {
        return {
            ...constructofn(),
            ...item,
        };
    });
}
//# sourceMappingURL=sanitize.js.map