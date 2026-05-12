"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.entries = entries;
function entries(data, callbackfn) {
    if (data === undefined)
        return;
    const keys = Object.keys(data);
    keys.forEach((k) => callbackfn(k, data[k]));
}
//# sourceMappingURL=record.js.map