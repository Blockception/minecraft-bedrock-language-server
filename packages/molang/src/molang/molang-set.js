"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MolangSet = void 0;
const bc_minecraft_bedrock_shared_1 = require("bc-minecraft-bedrock-shared");
const cache_1 = require("./cache");
const functions_1 = require("./functions");
const syntax_1 = require("./syntax");
/** The interface for the molang set */
class MolangSet {
    cache = new cache_1.MolangSyntaxCache();
    assigned = new Set();
    functions = new Set();
    using = new Set();
    constructor() { }
    /**
     * adds the data from the molang code if it is valid molang
     * @param molang
     */
    addIf(molang) {
        if ((0, functions_1.isValidMolang)(molang.text))
            this.add(molang);
    }
    /**
     *
     * @param molang
     * @returns
     */
    add(molang) {
        const exp = this.cache.build(molang);
        if (exp === undefined)
            return;
        exp.forEach((e) => this.walkChildren(e));
    }
    walkFn(node, skipUsing = false) {
        switch (node.type) {
            case syntax_1.NodeType.Assignment:
                this.checkAssigned(node.left);
                break;
            case syntax_1.NodeType.FunctionCall:
                this.functions.add(node);
                break;
            case syntax_1.NodeType.NullishCoalescing:
                // The left side of ?? is expected to potentially be undefined, so don't mark it as "using"
                // But we still need to walk it to collect functions, assignments, etc.
                this.walkChildren(node.left, true);
                // The right side should be walked normally
                this.walkChildren(node.right, false);
                break;
            case syntax_1.NodeType.ResourceReference:
            case syntax_1.NodeType.Variable:
                if (this.assigned.has(node))
                    break;
                if (!skipUsing) {
                    this.using.add(node);
                }
                break;
        }
    }
    walkChildren(node, skipUsing = false) {
        const objs = [node];
        for (let i = 0; i < objs.length; i++) {
            const n = objs[i];
            if (n === undefined)
                continue;
            this.walkFn(n, skipUsing);
            // For NullishCoalescing nodes, don't add children to the queue since walkFn handles them
            if (n.type === syntax_1.NodeType.NullishCoalescing)
                continue;
            objs.push(...syntax_1.ExpressionNode.getChildern(n));
        }
    }
    checkAssigned(node) {
        switch (node.type) {
            case syntax_1.NodeType.ResourceReference:
            case syntax_1.NodeType.Variable:
                this.assigned.add(node);
                break;
        }
    }
    harvest(object, originalText) {
        if (typeof object === 'string') {
            if ((0, functions_1.isMolang)(object)) {
                this.add(bc_minecraft_bedrock_shared_1.OffsetWord.create(object, originalText.indexOf(object)));
                return this;
            }
        }
        for (const [, value] of Object.entries(object)) {
            if (typeof value === 'string') {
                if ((0, functions_1.isMolang)(value)) {
                    this.add(bc_minecraft_bedrock_shared_1.OffsetWord.create(value, originalText.indexOf(value)));
                }
            }
            else if (typeof value === 'object') {
                if (Array.isArray(value)) {
                    value.forEach((v) => this.harvest(v, originalText));
                }
                else {
                    this.harvest(value, originalText);
                }
            }
        }
        return this;
    }
    static harvest(object, originalText) {
        return new MolangSet().harvest(object, originalText);
    }
}
exports.MolangSet = MolangSet;
//# sourceMappingURL=molang-set.js.map