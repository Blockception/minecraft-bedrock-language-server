"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bc_minecraft_bedrock_types_1 = require("bc-minecraft-bedrock-types");
const parse_1 = require("../../src/molang/syntax/parse");
const dataset_valid_1 = require("../data/dataset-valid");
const nodes_1 = require("../../src/molang/syntax/nodes");
const dataset_invalid_1 = require("../data/dataset-invalid");
const molang_1 = require("../../src/molang");
describe("molang - syntax", () => {
    describe("should be able to parse and match the syntax tree generated", () => {
        test.each(dataset_valid_1.valid_syntaxes)("%#. %s", (s) => {
            const n = (0, parse_1.parseMolang)(bc_minecraft_bedrock_types_1.Types.OffsetWord.create(s, 0));
            n.forEach(cleanupNodes);
            expect(n).toMatchSnapshot();
            n.forEach(validateNode);
        });
    });
    describe("should throw an error", () => {
        test.each(dataset_invalid_1.invalid_syntaxes)("%#. %s", (s) => {
            expect(() => (0, parse_1.parseMolang)(bc_minecraft_bedrock_types_1.Types.OffsetWord.create(s, 0))).toThrow(molang_1.MolangSyntaxError);
        });
    });
});
function cleanupNodes(node) {
    switch (node.type) {
        case nodes_1.NodeType.StatementSequence:
            node.statements.forEach(cleanupNodes);
            break;
        case nodes_1.NodeType.ArrayAccess:
            [node.array, node.index].forEach(cleanupNodes);
            break;
        case nodes_1.NodeType.Assignment:
        case nodes_1.NodeType.BinaryOperation:
            [node.left, node.right].forEach(cleanupNodes);
            break;
        case nodes_1.NodeType.FunctionCall:
            node.arguments.forEach(cleanupNodes);
            break;
        case nodes_1.NodeType.UnaryOperation:
            cleanupNodes(node.operand);
            break;
        case nodes_1.NodeType.Conditional:
            [node.condition, node.falseExpression, node.trueExpression]
                .filter((item) => item !== undefined)
                .forEach(cleanupNodes);
            break;
    }
    // Convert type to string for each identificatio
    node.type = nodes_1.NodeType[node.type];
}
function validateNode(node) {
    expect(node).toBeDefined();
    expect(node).toHaveProperty("type");
    expect(node).toHaveProperty("position");
    switch (node.type) {
        case nodes_1.NodeType.StatementSequence:
            node.statements.forEach(validateNode);
            throw new Error(`found a statement object: ${JSON.stringify(node)}`);
            break;
        case nodes_1.NodeType.ArrayAccess:
            [node.array, node.index].forEach(validateNode);
            break;
        case nodes_1.NodeType.Assignment:
        case nodes_1.NodeType.BinaryOperation:
            [node.left, node.right].forEach(validateNode);
            break;
        case nodes_1.NodeType.FunctionCall:
            node.arguments.forEach(validateNode);
            break;
        case nodes_1.NodeType.UnaryOperation:
            validateNode(node.operand);
            break;
        case nodes_1.NodeType.Conditional:
            [node.condition, node.falseExpression, node.trueExpression]
                .filter((item) => item !== undefined)
                .forEach(validateNode);
            break;
        case nodes_1.NodeType.Marker:
            throw new Error(`found a marker object: ${JSON.stringify(node)}`);
        case nodes_1.NodeType.Literal:
        case nodes_1.NodeType.NullishCoalescing:
        case nodes_1.NodeType.ResourceReference:
        case nodes_1.NodeType.StringLiteral:
        case nodes_1.NodeType.Variable:
            break;
    }
}
//# sourceMappingURL=syntax.test.js.map