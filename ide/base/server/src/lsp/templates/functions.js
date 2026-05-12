"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.safeID = safeID;
exports.safeIDWithoutNamespaces = safeIDWithoutNamespaces;
function safeID(ID, replace = '_') {
    ID = ID.replace(/[:]/gi, replace);
    return ID;
}
function safeIDWithoutNamespaces(ID, replace = '_') {
    const index = ID.indexOf(':');
    if (index > 0)
        ID = ID.substring(index + 1);
    ID = ID.replace(/[:]/gi, replace);
    return ID;
}
//# sourceMappingURL=functions.js.map