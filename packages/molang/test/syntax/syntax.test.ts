import { Types } from "bc-minecraft-bedrock-types";
import { parseMolang } from "../../src/molang/syntax/parse";
import { valid_syntaxes } from "../data/dataset-valid";
import { ExpressionNode, NodeType } from "../../src/molang/syntax/nodes";
import { invalid_syntaxes } from "../data/dataset-invalid";
import { MolangSyntaxError } from "../../src/molang";

describe("molang - syntax", () => {
  describe("should be able to parse and match the syntax tree generated", () => {
    test.each(valid_syntaxes)("%#. %s", (s) => {
      const n = parseMolang(Types.OffsetWord.create(s, 0));
      n.forEach(cleanupNodes);
      expect(n).toMatchSnapshot();

      n.forEach(validateNode);
    });
  });

  describe("should throw an error", () => {
    test.each(invalid_syntaxes)("%#. %s", (s) => {
      expect(() => parseMolang(Types.OffsetWord.create(s, 0))).toThrow(MolangSyntaxError);
    });
  });
});

function cleanupNodes(node: ExpressionNode) {
  switch (node.type) {
    case NodeType.StatementSequence:
      node.statements.forEach(cleanupNodes);
      break;
    case NodeType.ArrayAccess:
      [node.array, node.index].forEach(cleanupNodes);
      break;
    case NodeType.Assignment:
    case NodeType.BinaryOperation:
      [node.left, node.right].forEach(cleanupNodes);
      break;
    case NodeType.FunctionCall:
      node.arguments.forEach(cleanupNodes);
      break;
    case NodeType.UnaryOperation:
      cleanupNodes(node.operand);
      break;
    case NodeType.Conditional:
      [node.condition, node.falseExpression, node.trueExpression]
        .filter((item) => item !== undefined)
        .forEach(cleanupNodes);
      break;
  }

  // Convert type to string for each identificatio
  (node as any).type = NodeType[node.type];
}

function validateNode(node: ExpressionNode): void {
  expect(node).toBeDefined();
  expect(node).toHaveProperty("type");
  expect(node).toHaveProperty("position");

  switch (node.type) {
    case NodeType.StatementSequence:
      node.statements.forEach(validateNode);
      throw new Error(`found a statement object: ${JSON.stringify(node)}`);
      break;
    case NodeType.ArrayAccess:
      [node.array, node.index].forEach(validateNode);
      break;
    case NodeType.Assignment:
    case NodeType.BinaryOperation:
      [node.left, node.right].forEach(validateNode);
      break;
    case NodeType.FunctionCall:
      node.arguments.forEach(validateNode);
      break;
    case NodeType.UnaryOperation:
      validateNode(node.operand);
      break;
    case NodeType.Conditional:
      [node.condition, node.falseExpression, node.trueExpression]
        .filter((item) => item !== undefined)
        .forEach(validateNode);
      break;
    case NodeType.Marker:
      throw new Error(`found a marker object: ${JSON.stringify(node)}`);
    case NodeType.Literal:
    case NodeType.NullishCoalescing:
    case NodeType.ResourceReference:
    case NodeType.StringLiteral:
    case NodeType.Variable:
      break;
  }
}
