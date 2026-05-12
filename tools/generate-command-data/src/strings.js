"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.quoteString = quoteString;
function quoteString(data) {
    if (data.includes("'")) {
        return `"${data}"`;
    }
    return `'${data}'`;
}
//# sourceMappingURL=strings.js.map