import { ExpressionNode } from "./nodes";

export function walk(exp: ExpressionNode, callback: (node: ExpressionNode) => void): void {
  const objs: ExpressionNode[] = [exp];

  for (let i = 0; i < objs.length; i++) {
    const node = objs[i];
    if (node === undefined) continue;
    callback(node);

    objs.push(...ExpressionNode.getChildern(node));
  }
}
