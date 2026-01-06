import { BinaryOperationNode, ExpressionNode, LiteralNode, NodeType } from 'bc-minecraft-molang';

/**
 * Checks if a node is a literal with a specific value
 */
export function isLiteralValue(node: ExpressionNode, value: string): boolean {
  if (!LiteralNode.is(node)) return false;
  return node.value === value;
}

/**
 * Checks if a node is a boolean literal (true/false)
 */
export function isBooleanLiteral(node: ExpressionNode): boolean {
  if (!LiteralNode.is(node)) return false;
  const value = node.value?.toLowerCase();
  return value === 'true' || value === 'false';
}

/**
 * Gets the value of a literal node
 */
export function getLiteralValue(node: ExpressionNode): string | undefined {
  return LiteralNode.is(node) ? node.value : undefined;
}

/**
 * Checks if both operands of a binary operation are literals
 */
export function hasTwoLiteralOperands(node: ExpressionNode): boolean {
  if (!BinaryOperationNode.is(node)) return false;
  return node.left.type === NodeType.Literal && node.right.type === NodeType.Literal;
}
