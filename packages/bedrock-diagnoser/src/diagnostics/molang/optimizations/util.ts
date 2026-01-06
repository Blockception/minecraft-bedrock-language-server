import { BinaryOperationNode, ExpressionNode, LiteralNode } from 'bc-minecraft-molang';

/**
 * Checks if a node is a literal with a specific value
 */
export function isLiteralValue(node: ExpressionNode, value: string): node is LiteralNode & { value: string } {
  if (!LiteralNode.is(node)) return false;
  return node.value === value;
}

/**
 * Checks if a node is a boolean literal (true/false)
 */
export function isBooleanLiteral(node: ExpressionNode): node is LiteralNode & { value: 'true' | 'false' } {
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
export function hasTwoLiteralOperands(
  node: ExpressionNode,
): node is BinaryOperationNode & { left: LiteralNode; right: LiteralNode } {
  if (!BinaryOperationNode.is(node)) return false;
  if (!LiteralNode.is(node.left)) return false;
  if (!LiteralNode.is(node.right)) return false;

  return true;
}
