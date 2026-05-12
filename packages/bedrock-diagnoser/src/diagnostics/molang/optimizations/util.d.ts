import { BinaryOperationNode, ExpressionNode, LiteralNode } from 'bc-minecraft-molang';
/**
 * Checks if a node is a literal with a specific value
 */
export declare function isLiteralValue(node: ExpressionNode, value: string): node is LiteralNode & {
    value: string;
};
/**
 * Checks if a node is a boolean literal (true/false)
 */
export declare function isBooleanLiteral(node: ExpressionNode): node is LiteralNode & {
    value: 'true' | 'false';
};
/**
 * Gets the value of a literal node
 */
export declare function getLiteralValue(node: ExpressionNode): string | undefined;
/**
 * Checks if both operands of a binary operation are literals
 */
export declare function hasTwoLiteralOperands(node: ExpressionNode): node is BinaryOperationNode & {
    left: LiteralNode;
    right: LiteralNode;
};
//# sourceMappingURL=util.d.ts.map