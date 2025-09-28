"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.flatten = flatten;
const walk_1 = require("./walk");
function flatten(node) {
    const nodes = [];
    (0, walk_1.walk)(node, (n) => nodes.push(n));
    return nodes;
}
//# sourceMappingURL=flatten.js.map