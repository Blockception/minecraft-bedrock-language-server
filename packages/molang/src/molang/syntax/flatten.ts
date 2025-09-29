import { ExpressionNode } from './nodes';
import { walk } from './walk';

export function flatten(node: ExpressionNode): ExpressionNode[] {
  const nodes: ExpressionNode[] = [];
  walk(node, (n) => nodes.push(n));

  return nodes;
}
