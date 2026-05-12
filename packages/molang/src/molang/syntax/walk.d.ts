import { ExpressionNode } from './nodes';
/**
 * Traverses an expression tree and invokes a callback on each node
 * @param exp The root expression node to walk
 * @param callback The callback to invoke for each node
 */
export declare function walk(exp: ExpressionNode, callback: (node: ExpressionNode) => void): void;
//# sourceMappingURL=walk.d.ts.map