"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpressionNode = exports.MarkerNode = exports.StatementSequenceNode = exports.ConditionalNode = exports.BinaryOperationNode = exports.ResourceReferenceNode = exports.VariableNode = exports.FunctionCallNode = exports.ArrayAccessNode = exports.NullishCoalescingNode = exports.ConditionalExpressionNode = exports.StringLiteralNode = exports.LiteralNode = exports.AssignmentNode = exports.UnaryOperationNode = exports.NodeType = void 0;
/** Types of syntax nodes */
var NodeType;
(function (NodeType) {
    NodeType[NodeType["ArrayAccess"] = 0] = "ArrayAccess";
    NodeType[NodeType["Assignment"] = 1] = "Assignment";
    NodeType[NodeType["BinaryOperation"] = 2] = "BinaryOperation";
    NodeType[NodeType["Conditional"] = 3] = "Conditional";
    NodeType[NodeType["FunctionCall"] = 4] = "FunctionCall";
    NodeType[NodeType["Literal"] = 5] = "Literal";
    NodeType[NodeType["Marker"] = 6] = "Marker";
    NodeType[NodeType["NullishCoalescing"] = 7] = "NullishCoalescing";
    NodeType[NodeType["ResourceReference"] = 8] = "ResourceReference";
    NodeType[NodeType["StatementSequence"] = 9] = "StatementSequence";
    NodeType[NodeType["StringLiteral"] = 10] = "StringLiteral";
    NodeType[NodeType["UnaryOperation"] = 11] = "UnaryOperation";
    NodeType[NodeType["Variable"] = 12] = "Variable";
})(NodeType || (exports.NodeType = NodeType = {}));
function createfn(type) {
    return function (data) {
        return { ...data, type: type };
    };
}
function isfn(type) {
    return function (data) {
        return (data === null || data === void 0 ? void 0 : data.type) === type;
    };
}
var UnaryOperationNode;
(function (UnaryOperationNode) {
    UnaryOperationNode.create = createfn(NodeType.UnaryOperation);
})(UnaryOperationNode || (exports.UnaryOperationNode = UnaryOperationNode = {}));
var AssignmentNode;
(function (AssignmentNode) {
    AssignmentNode.create = createfn(NodeType.Assignment);
    AssignmentNode.is = isfn(NodeType.Assignment);
})(AssignmentNode || (exports.AssignmentNode = AssignmentNode = {}));
var LiteralNode;
(function (LiteralNode) {
    LiteralNode.create = createfn(NodeType.Literal);
    LiteralNode.is = isfn(NodeType.Literal);
})(LiteralNode || (exports.LiteralNode = LiteralNode = {}));
var StringLiteralNode;
(function (StringLiteralNode) {
    StringLiteralNode.create = createfn(NodeType.StringLiteral);
    StringLiteralNode.is = isfn(NodeType.StringLiteral);
})(StringLiteralNode || (exports.StringLiteralNode = StringLiteralNode = {}));
var ConditionalExpressionNode;
(function (ConditionalExpressionNode) {
    ConditionalExpressionNode.create = createfn(NodeType.Conditional);
    ConditionalExpressionNode.is = isfn(NodeType.Conditional);
})(ConditionalExpressionNode || (exports.ConditionalExpressionNode = ConditionalExpressionNode = {}));
var NullishCoalescingNode;
(function (NullishCoalescingNode) {
    NullishCoalescingNode.create = createfn(NodeType.NullishCoalescing);
    NullishCoalescingNode.is = isfn(NodeType.NullishCoalescing);
})(NullishCoalescingNode || (exports.NullishCoalescingNode = NullishCoalescingNode = {}));
var ArrayAccessNode;
(function (ArrayAccessNode) {
    ArrayAccessNode.create = createfn(NodeType.ArrayAccess);
    ArrayAccessNode.is = isfn(NodeType.ArrayAccess);
})(ArrayAccessNode || (exports.ArrayAccessNode = ArrayAccessNode = {}));
var FunctionCallNode;
(function (FunctionCallNode) {
    FunctionCallNode.create = createfn(NodeType.FunctionCall);
    FunctionCallNode.is = isfn(NodeType.FunctionCall);
})(FunctionCallNode || (exports.FunctionCallNode = FunctionCallNode = {}));
var VariableNode;
(function (VariableNode) {
    VariableNode.create = createfn(NodeType.Variable);
    VariableNode.is = isfn(NodeType.Variable);
})(VariableNode || (exports.VariableNode = VariableNode = {}));
var ResourceReferenceNode;
(function (ResourceReferenceNode) {
    ResourceReferenceNode.create = createfn(NodeType.ResourceReference);
    ResourceReferenceNode.is = isfn(NodeType.ResourceReference);
})(ResourceReferenceNode || (exports.ResourceReferenceNode = ResourceReferenceNode = {}));
var BinaryOperationNode;
(function (BinaryOperationNode) {
    BinaryOperationNode.create = createfn(NodeType.BinaryOperation);
    BinaryOperationNode.is = isfn(NodeType.BinaryOperation);
})(BinaryOperationNode || (exports.BinaryOperationNode = BinaryOperationNode = {}));
var ConditionalNode;
(function (ConditionalNode) {
    ConditionalNode.create = createfn(NodeType.Conditional);
    ConditionalNode.is = isfn(NodeType.Conditional);
})(ConditionalNode || (exports.ConditionalNode = ConditionalNode = {}));
var StatementSequenceNode;
(function (StatementSequenceNode) {
    StatementSequenceNode.create = createfn(NodeType.StatementSequence);
    StatementSequenceNode.is = isfn(NodeType.StatementSequence);
})(StatementSequenceNode || (exports.StatementSequenceNode = StatementSequenceNode = {}));
var MarkerNode;
(function (MarkerNode) {
    MarkerNode.create = createfn(NodeType.Marker);
    MarkerNode.is = isfn(NodeType.Marker);
})(MarkerNode || (exports.MarkerNode = MarkerNode = {}));
var ExpressionNode;
(function (ExpressionNode) {
    function getChildern(node) {
        if (node === undefined)
            return [];
        switch (node.type) {
            case NodeType.ArrayAccess:
                return [node.array, node.index];
            case NodeType.Assignment:
            case NodeType.BinaryOperation:
            case NodeType.NullishCoalescing:
                return [node.left, node.right];
            case NodeType.Conditional:
                return [node.condition, node.trueExpression, node.falseExpression];
            case NodeType.FunctionCall:
                return [...node.arguments];
            case NodeType.Literal:
            case NodeType.Marker:
            case NodeType.ResourceReference:
            case NodeType.StringLiteral:
            case NodeType.Variable:
            default:
                return [];
            case NodeType.StatementSequence:
                return [...node.statements];
            case NodeType.UnaryOperation:
                return [node.operand];
        }
    }
    ExpressionNode.getChildern = getChildern;
    function getIdentifier(node, prefixed = true) {
        if (prefixed) {
            return `${node.scope}.${node.names.join(".")}`;
        }
        return node.names.join(".");
    }
    ExpressionNode.getIdentifier = getIdentifier;
    function getLastEndPosition(node) {
        var _a;
        function max(a, b) {
            return a.position > b.position ? a : b;
        }
        while (node !== undefined) {
            switch (node.type) {
                // End of trees
                case NodeType.ResourceReference:
                case NodeType.Variable:
                    return node.position + getIdentifier(node).length;
                case NodeType.Literal:
                case NodeType.StringLiteral:
                    return node.position + node.value.length;
                case NodeType.Marker:
                    return node.token.position + node.token.value.length;
                case NodeType.ArrayAccess:
                    node = node.index;
                    break;
                case NodeType.UnaryOperation:
                    node = node.operand;
                    break;
                case NodeType.NullishCoalescing:
                case NodeType.BinaryOperation:
                case NodeType.Assignment:
                    node = max(node.right, node.left);
                    break;
                case NodeType.FunctionCall:
                    const args = node.arguments;
                    args.forEach((arg) => (node = max(node, arg)));
                    break;
                case NodeType.StatementSequence:
                    const stats = node.statements;
                    stats.forEach((arg) => (node = max(node, arg)));
                    break;
                case NodeType.Conditional:
                    node = max(node.condition, max(node.falseExpression, node.trueExpression));
                    break;
            }
        }
        return (_a = node === null || node === void 0 ? void 0 : node.position) !== null && _a !== void 0 ? _a : 0;
    }
    ExpressionNode.getLastEndPosition = getLastEndPosition;
})(ExpressionNode || (exports.ExpressionNode = ExpressionNode = {}));
//# sourceMappingURL=nodes.js.map