import { ExpressionNode } from "./nodes";
export declare function collect<T extends ExpressionNode>(node: ExpressionNode, token: T["type"]): T[];
