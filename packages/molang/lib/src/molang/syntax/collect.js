"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.collect = collect;
const walk_1 = require("./walk");
function collect(node, token) {
    const nodes = [];
    (0, walk_1.walk)(node, (n) => {
        if (n === undefined)
            return;
        if (n.type === token)
            nodes.push(node);
    });
    return nodes;
}
//# sourceMappingURL=collect.js.map