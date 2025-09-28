"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SyntaxBuilder = void 0;
const nodes_1 = require("./nodes");
class SyntaxBuilder {
    constructor(position) {
        this.operators = {};
        this.result = {
            type: nodes_1.NodeType.StatementSequence,
            statements: [],
            position: position,
        };
    }
    add(node) {
        if (node) {
            this.recordOperatorUsage(node);
            this.result.statements.push(node);
        }
        return node;
    }
    recordOperatorUsage(node) {
        switch (node.type) {
            case nodes_1.NodeType.UnaryOperation:
            case nodes_1.NodeType.BinaryOperation:
                this.operators[node.operator] = true;
                return;
            case nodes_1.NodeType.NullishCoalescing:
                this.operators["??"] = true;
                return;
            case nodes_1.NodeType.Conditional:
                this.operators["?"] = true;
                return;
        }
    }
    hasOperator(op) {
        return this.operators[op] === true;
    }
    remove(node) {
        this.result.statements = this.result.statements.filter((item) => item !== node);
    }
    replace(original, newnode) {
        this.result.statements.forEach((item, index, nodes) => {
            if (item === original) {
                nodes[index] = newnode;
            }
        });
        return newnode;
    }
    build() {
        if (this.result.statements.length === 1)
            return this.result.statements[0];
        return this.result;
    }
}
exports.SyntaxBuilder = SyntaxBuilder;
//# sourceMappingURL=builder.js.map