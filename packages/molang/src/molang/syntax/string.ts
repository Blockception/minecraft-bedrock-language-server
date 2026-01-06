import { ExpressionNode, NodeType } from './nodes';

export function nodesToString(node: ExpressionNode): string {
  switch (node.type) {
    case NodeType.ArrayAccess:
      return `${nodesToString(node.array)}[${nodesToString(node.index)}]`;
    case NodeType.Assignment:
      return `${nodesToString(node.left)} = ${nodesToString(node.right)}`;
    case NodeType.BinaryOperation:
      return `(${nodesToString(node.left)} ${node.operator} ${nodesToString(node.right)})`;
    case NodeType.Conditional:
      return `(${nodesToString(node.condition)} ? ${nodesToString(node.trueExpression)} : ${nodesToString(node.falseExpression!)})`;
    case NodeType.FunctionCall:
      const id = ExpressionNode.getIdentifier(node);
      return `${id}(${node.arguments.map(nodesToString).join(', ')})`;
    case NodeType.Literal:
      return node.value;
    case NodeType.Marker:
      return node.token.value;
    case NodeType.NullishCoalescing:
      return `(${nodesToString(node.left)} ?? ${nodesToString(node.right)})`;
    case NodeType.ResourceReference:
      return ExpressionNode.getIdentifier(node);
    case NodeType.StatementSequence:
      return node.statements.map(nodesToString).join('; ');
    case NodeType.StringLiteral:
      return `"${node.value}"`;
    case NodeType.UnaryOperation:
      return `(${node.operator}${nodesToString(node.operand)})`;
    case NodeType.Variable:
      return ExpressionNode.getIdentifier(node);
  }

  return 'unknown';
}
