"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nodesToString = nodesToString;
const nodes_1 = require("./nodes");
function nodesToString(node) {
    switch (node.type) {
        case nodes_1.NodeType.ArrayAccess:
            return `${nodesToString(node.array)}[${nodesToString(node.index)}]`;
        case nodes_1.NodeType.Assignment:
            return `${nodesToString(node.left)} = ${nodesToString(node.right)}`;
        case nodes_1.NodeType.BinaryOperation:
            return `(${nodesToString(node.left)} ${node.operator} ${nodesToString(node.right)})`;
        case nodes_1.NodeType.Conditional:
            return `(${nodesToString(node.condition)} ? ${nodesToString(node.trueExpression)} : ${nodesToString(node.falseExpression)})`;
        case nodes_1.NodeType.FunctionCall:
            const id = nodes_1.ExpressionNode.getIdentifier(node);
            if (!node.hasParens && node.arguments.length === 0)
                return id;
            return `${id}(${node.arguments.map(nodesToString).join(', ')})`;
        case nodes_1.NodeType.Literal:
            return node.value;
        case nodes_1.NodeType.Marker:
            return node.token.value;
        case nodes_1.NodeType.NullishCoalescing:
            return `(${nodesToString(node.left)} ?? ${nodesToString(node.right)})`;
        case nodes_1.NodeType.ResourceReference:
            return nodes_1.ExpressionNode.getIdentifier(node);
        case nodes_1.NodeType.StatementSequence:
            return node.statements.map(nodesToString).join('; ');
        case nodes_1.NodeType.StringLiteral:
            return `"${node.value}"`;
        case nodes_1.NodeType.UnaryOperation:
            return `(${node.operator}${nodesToString(node.operand)})`;
        case nodes_1.NodeType.Variable:
            return nodes_1.ExpressionNode.getIdentifier(node);
    }
    return 'unknown';
}
//# sourceMappingURL=string.js.map