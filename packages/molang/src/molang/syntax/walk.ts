import { ExpressionNode } from './nodes';

/**
 * Traverses an expression tree and invokes a callback on each node
 * @param exp The root expression node to walk
 * @param callback The callback to invoke for each node
 */
export function walk(exp: ExpressionNode, callback: (node: ExpressionNode) => void): void {
  const objs: ExpressionNode[] = [exp];

  for (let i = 0; i < objs.length; i++) {
    const node = objs[i];
    if (node === undefined) continue;
    callback(node);

    objs.push(...ExpressionNode.getChildern(node));
  }
}
