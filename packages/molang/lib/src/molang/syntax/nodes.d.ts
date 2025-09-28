import { Token } from "./tokens";
/** Variable scope types in Molang */
export type VariableScope = "this" | "temp" | "t" | "variable" | "v" | "context" | "c" | "array";
/** Function namespace types in Molang */
export type FunctionScope = "math" | "query" | "q";
export type ResourceScope = "texture" | "material" | "geometry";
/** Types of syntax nodes */
export declare enum NodeType {
    ArrayAccess = 0,
    Assignment = 1,
    BinaryOperation = 2,
    Conditional = 3,
    FunctionCall = 4,
    Literal = 5,
    Marker = 6,
    NullishCoalescing = 7,
    ResourceReference = 8,
    StatementSequence = 9,
    StringLiteral = 10,
    UnaryOperation = 11,
    Variable = 12
}
/** Base node type for all syntax tree nodes */
export interface SyntaxNode {
    position: number;
}
/** Represents a unary operation (!, -) */
export interface UnaryOperationNode extends SyntaxNode {
    type: NodeType.UnaryOperation;
    operator: string;
    operand: ExpressionNode;
}
export declare namespace UnaryOperationNode {
    const create: (data: Omit<UnaryOperationNode, "type">) => UnaryOperationNode;
}
/** Represents an assignment operation */
export interface AssignmentNode extends SyntaxNode {
    type: NodeType.Assignment;
    left: ExpressionNode;
    right: ExpressionNode;
}
export declare namespace AssignmentNode {
    const create: (data: Omit<AssignmentNode, "type">) => AssignmentNode;
    const is: (data: AssignmentNode) => data is AssignmentNode;
}
/** Represents a numeric literal value */
export interface LiteralNode extends SyntaxNode {
    type: NodeType.Literal;
    value: string;
}
export declare namespace LiteralNode {
    const create: (data: Omit<LiteralNode, "type">) => LiteralNode;
    const is: (data: LiteralNode) => data is LiteralNode;
}
/** Represents a string literal value */
export interface StringLiteralNode extends SyntaxNode {
    type: NodeType.StringLiteral;
    value: string;
}
export declare namespace StringLiteralNode {
    const create: (data: Omit<StringLiteralNode, "type">) => StringLiteralNode;
    const is: (data: StringLiteralNode) => data is StringLiteralNode;
}
/** Represents a conditional (ternary) expression */
export interface ConditionalExpressionNode extends SyntaxNode {
    type: NodeType.Conditional;
    condition: ExpressionNode;
    trueExpression: ExpressionNode;
    falseExpression: ExpressionNode;
}
export declare namespace ConditionalExpressionNode {
    const create: (data: Omit<ConditionalExpressionNode, "type">) => ConditionalExpressionNode;
    const is: (data: ConditionalExpressionNode) => data is ConditionalExpressionNode;
}
/** Represents a nullish coalescing operation */
export interface NullishCoalescingNode extends SyntaxNode {
    type: NodeType.NullishCoalescing;
    left: ExpressionNode;
    right: ExpressionNode;
}
export declare namespace NullishCoalescingNode {
    const create: (data: Omit<NullishCoalescingNode, "type">) => NullishCoalescingNode;
    const is: (data: NullishCoalescingNode) => data is NullishCoalescingNode;
}
/** Represents an array access operation */
export interface ArrayAccessNode extends SyntaxNode {
    type: NodeType.ArrayAccess;
    array: ExpressionNode;
    index: ExpressionNode;
}
export declare namespace ArrayAccessNode {
    const create: (data: Omit<ArrayAccessNode, "type">) => ArrayAccessNode;
    const is: (data: ArrayAccessNode) => data is ArrayAccessNode;
}
/** Represents a function call (math, query) */
export interface FunctionCallNode extends SyntaxNode {
    type: NodeType.FunctionCall;
    scope: FunctionScope;
    names: [string] | [string, string];
    arguments: ExpressionNode[];
}
export declare namespace FunctionCallNode {
    const create: (data: Omit<FunctionCallNode, "type">) => FunctionCallNode;
    const is: (data: FunctionCallNode) => data is FunctionCallNode;
}
/** Represents a variable reference (temp, variable, context) */
export interface VariableNode extends SyntaxNode {
    type: NodeType.Variable;
    scope: VariableScope;
    names: [] | [string] | [string, string];
}
export declare namespace VariableNode {
    const create: (data: Omit<VariableNode, "type">) => VariableNode;
    const is: (data: VariableNode) => data is VariableNode;
}
/** Represents a resource reference (texture, material, geometry) */
export interface ResourceReferenceNode extends SyntaxNode {
    type: NodeType.ResourceReference;
    scope: ResourceScope;
    names: [string] | [string, string];
}
export declare namespace ResourceReferenceNode {
    const create: (data: Omit<ResourceReferenceNode, "type">) => ResourceReferenceNode;
    const is: (data: ResourceReferenceNode) => data is ResourceReferenceNode;
}
/** Represents a binary operation */
export interface BinaryOperationNode extends SyntaxNode {
    type: NodeType.BinaryOperation;
    operator: string;
    left: ExpressionNode;
    right: ExpressionNode;
}
export declare namespace BinaryOperationNode {
    const create: (data: Omit<BinaryOperationNode, "type">) => BinaryOperationNode;
    const is: (data: BinaryOperationNode) => data is BinaryOperationNode;
}
/** Represents a conditional (ternary) operation */
export interface ConditionalNode extends SyntaxNode {
    type: NodeType.Conditional;
    condition: ExpressionNode;
    trueExpression: ExpressionNode;
    falseExpression: ExpressionNode;
}
export declare namespace ConditionalNode {
    const create: (data: Omit<ConditionalNode, "type">) => ConditionalNode;
    const is: (data: ConditionalNode) => data is ConditionalNode;
}
/** Represents a sequence of statements */
export interface StatementSequenceNode extends SyntaxNode {
    type: NodeType.StatementSequence;
    statements: ExpressionNode[];
}
export declare namespace StatementSequenceNode {
    const create: (data: Omit<StatementSequenceNode, "type">) => StatementSequenceNode;
    const is: (data: StatementSequenceNode) => data is StatementSequenceNode;
}
/** Represents a sequence of statements */
export interface MarkerNode extends SyntaxNode {
    type: NodeType.Marker;
    token: Token;
}
export declare namespace MarkerNode {
    const create: (data: Omit<MarkerNode, "type">) => MarkerNode;
    const is: (data: MarkerNode) => data is MarkerNode;
}
/** Union type for all possible expression nodes */
export type ExpressionNode = ArrayAccessNode | AssignmentNode | BinaryOperationNode | ConditionalExpressionNode | ConditionalNode | FunctionCallNode | LiteralNode | MarkerNode | NullishCoalescingNode | ResourceReferenceNode | StatementSequenceNode | StringLiteralNode | UnaryOperationNode | VariableNode;
export declare namespace ExpressionNode {
    function getChildern(node: ExpressionNode): ExpressionNode[];
    function getIdentifier(node: Pick<ResourceReferenceNode | VariableNode | FunctionCallNode, "scope" | "names">, prefixed?: boolean): string;
    function getLastEndPosition(node: ExpressionNode): number;
}
