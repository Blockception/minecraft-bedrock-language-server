"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MolangSet = void 0;
const types_1 = require("bc-minecraft-bedrock-types/lib/types");
const cache_1 = require("./cache");
const functions_1 = require("./functions");
const syntax_1 = require("./syntax");
/** The interface for the molang set */
class MolangSet {
    constructor() {
        this.cache = new cache_1.MolangSyntaxCache();
        this.assigned = new Set();
        this.functions = new Set();
        this.using = new Set();
    }
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
        exp.forEach((e) => (0, syntax_1.walk)(e, this.walkFn.bind(this)));
    }
    walkFn(node) {
        switch (node.type) {
            case syntax_1.NodeType.Assignment:
                this.checkAssigned(node.left);
                break;
            case syntax_1.NodeType.FunctionCall:
                this.functions.add(node);
                break;
            case syntax_1.NodeType.ResourceReference:
            case syntax_1.NodeType.Variable:
                if (this.assigned.has(node))
                    break;
                this.using.add(node);
                break;
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
        if (typeof object === "string") {
            if ((0, functions_1.isMolang)(object)) {
                this.add(types_1.OffsetWord.create(object, originalText.indexOf(object)));
                return this;
            }
        }
        for (const [, value] of Object.entries(object)) {
            if (typeof value === "string") {
                if ((0, functions_1.isMolang)(value)) {
                    this.add(types_1.OffsetWord.create(value, originalText.indexOf(value)));
                }
            }
            else if (typeof value === "object") {
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