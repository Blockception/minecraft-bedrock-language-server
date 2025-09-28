import { ExpressionNode, StatementSequenceNode } from "./nodes";
export declare class SyntaxBuilder {
    result: StatementSequenceNode;
    /**
     * Operators is a list of operators in the current statements found, used for optimization.
     * Though false positives are possible as operators can be processed down into others.
     */
    operators: Record<string, boolean>;
    constructor(position: number);
    add<T extends ExpressionNode>(node: T): T;
    recordOperatorUsage(node: ExpressionNode): void;
    hasOperator(op: string): boolean;
    remove<T extends ExpressionNode>(node: T): void;
    replace<T extends ExpressionNode, U extends ExpressionNode>(original: T, newnode: U): U;
    build(): ExpressionNode;
}
