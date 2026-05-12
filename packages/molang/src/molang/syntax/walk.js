"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.walk = walk;
const nodes_1 = require("./nodes");
/**
 * Traverses an expression tree and invokes a callback on each node
 * @param exp The root expression node to walk
 * @param callback The callback to invoke for each node
 */
function walk(exp, callback) {
    const objs = [exp];
    for (let i = 0; i < objs.length; i++) {
        const node = objs[i];
        if (node === undefined)
            continue;
        callback(node);
        objs.push(...nodes_1.ExpressionNode.getChildern(node));
    }
}
//# sourceMappingURL=walk.js.map