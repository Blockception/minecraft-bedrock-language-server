import { ExpressionNode } from "./nodes";
import { walk } from "./walk";

export function collect<T extends ExpressionNode>(node: ExpressionNode, token: T["type"]): T[] {
  const nodes: T[] = [];

  walk(node, (n) => {
    if (n === undefined) return;
    if (n.type === token) nodes.push(node as T);
  });

  return nodes;
}
