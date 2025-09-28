import { Token } from "./tokens";

/** Variable scope types in Molang */
export type VariableScope = "this" | "temp" | "t" | "variable" | "v" | "context" | "c" | "array";

/** Function namespace types in Molang */
export type FunctionScope = "math" | "query" | "q";

export type ResourceScope = "texture" | "material" | "geometry";

/** Types of syntax nodes */
export enum NodeType {
  ArrayAccess,
  Assignment,
  BinaryOperation,
  Conditional,
  FunctionCall,
  Literal,
  Marker,
  NullishCoalescing,
  ResourceReference,
  StatementSequence,
  StringLiteral,
  UnaryOperation,
  Variable,
}

function createfn<T extends ExpressionNode>(type: T["type"]): (data: Omit<T, "type">) => T {
  return function (data: Omit<T, "type">): T {
    return { ...data, type: type } as T;
  };
}

function isfn<T extends ExpressionNode>(type: T["type"]) {
  return function (data: T): data is T {
    return data?.type === type;
  };
}

/** Base node type for all syntax tree nodes */
export interface SyntaxNode {
  position: number; // Absolute offset in the source text
}

/** Represents a unary operation (!, -) */
export interface UnaryOperationNode extends SyntaxNode {
  type: NodeType.UnaryOperation;
  operator: string;
  operand: ExpressionNode;
}

export namespace UnaryOperationNode {
  export const create = createfn<UnaryOperationNode>(NodeType.UnaryOperation);
}

/** Represents an assignment operation */
export interface AssignmentNode extends SyntaxNode {
  type: NodeType.Assignment;
  left: ExpressionNode;
  right: ExpressionNode;
}

export namespace AssignmentNode {
  export const create = createfn<AssignmentNode>(NodeType.Assignment);
  export const is = isfn<AssignmentNode>(NodeType.Assignment);
}

/** Represents a numeric literal value */
export interface LiteralNode extends SyntaxNode {
  type: NodeType.Literal;
  value: string;
}

export namespace LiteralNode {
  export const create = createfn<LiteralNode>(NodeType.Literal);
  export const is = isfn<LiteralNode>(NodeType.Literal);
}

/** Represents a string literal value */
export interface StringLiteralNode extends SyntaxNode {
  type: NodeType.StringLiteral;
  value: string;
}

export namespace StringLiteralNode {
  export const create = createfn<StringLiteralNode>(NodeType.StringLiteral);
  export const is = isfn<StringLiteralNode>(NodeType.StringLiteral);
}

/** Represents a conditional (ternary) expression */
export interface ConditionalExpressionNode extends SyntaxNode {
  type: NodeType.Conditional;
  condition: ExpressionNode;
  trueExpression: ExpressionNode;
  falseExpression: ExpressionNode;
}

export namespace ConditionalExpressionNode {
  export const create = createfn<ConditionalExpressionNode>(NodeType.Conditional);
  export const is = isfn<ConditionalExpressionNode>(NodeType.Conditional);
}

/** Represents a nullish coalescing operation */
export interface NullishCoalescingNode extends SyntaxNode {
  type: NodeType.NullishCoalescing;
  left: ExpressionNode;
  right: ExpressionNode;
}

export namespace NullishCoalescingNode {
  export const create = createfn<NullishCoalescingNode>(NodeType.NullishCoalescing);
  export const is = isfn<NullishCoalescingNode>(NodeType.NullishCoalescing);
}

/** Represents an array access operation */
export interface ArrayAccessNode extends SyntaxNode {
  type: NodeType.ArrayAccess;
  array: ExpressionNode;
  index: ExpressionNode;
}

export namespace ArrayAccessNode {
  export const create = createfn<ArrayAccessNode>(NodeType.ArrayAccess);
  export const is = isfn<ArrayAccessNode>(NodeType.ArrayAccess);
}

/** Represents a function call (math, query) */
export interface FunctionCallNode extends SyntaxNode {
  type: NodeType.FunctionCall;
  scope: FunctionScope;
  names: [string] | [string, string];
  arguments: ExpressionNode[];
}
export namespace FunctionCallNode {
  export const create = createfn<FunctionCallNode>(NodeType.FunctionCall);
  export const is = isfn<FunctionCallNode>(NodeType.FunctionCall);
}

/** Represents a variable reference (temp, variable, context) */
export interface VariableNode extends SyntaxNode {
  type: NodeType.Variable;
  scope: VariableScope;
  names: [] | [string] | [string, string];
}

export namespace VariableNode {
  export const create = createfn<VariableNode>(NodeType.Variable);
  export const is = isfn<VariableNode>(NodeType.Variable);
}

/** Represents a resource reference (texture, material, geometry) */
export interface ResourceReferenceNode extends SyntaxNode {
  type: NodeType.ResourceReference;
  scope: ResourceScope;
  names: [string] | [string, string];
}

export namespace ResourceReferenceNode {
  export const create = createfn<ResourceReferenceNode>(NodeType.ResourceReference);
  export const is = isfn<ResourceReferenceNode>(NodeType.ResourceReference);
}

/** Represents a binary operation */
export interface BinaryOperationNode extends SyntaxNode {
  type: NodeType.BinaryOperation;
  operator: string; // +, -, *, /, ==, !=, <, >, <=, >=, &&, ||
  left: ExpressionNode;
  right: ExpressionNode;
}

export namespace BinaryOperationNode {
  export const create = createfn<BinaryOperationNode>(NodeType.BinaryOperation);
  export const is = isfn<BinaryOperationNode>(NodeType.BinaryOperation);
}

/** Represents a conditional (ternary) operation */
export interface ConditionalNode extends SyntaxNode {
  type: NodeType.Conditional;
  condition: ExpressionNode;
  trueExpression: ExpressionNode;
  falseExpression: ExpressionNode;
}

export namespace ConditionalNode {
  export const create = createfn<ConditionalNode>(NodeType.Conditional);
  export const is = isfn<ConditionalNode>(NodeType.Conditional);
}

/** Represents a sequence of statements */
export interface StatementSequenceNode extends SyntaxNode {
  type: NodeType.StatementSequence;
  statements: ExpressionNode[];
}

export namespace StatementSequenceNode {
  export const create = createfn<StatementSequenceNode>(NodeType.StatementSequence);
  export const is = isfn<StatementSequenceNode>(NodeType.StatementSequence);
}

/** Represents a sequence of statements */
export interface MarkerNode extends SyntaxNode {
  type: NodeType.Marker;
  token: Token;
}

export namespace MarkerNode {
  export const create = createfn<MarkerNode>(NodeType.Marker);
  export const is = isfn<MarkerNode>(NodeType.Marker);
}

/** Union type for all possible expression nodes */
export type ExpressionNode =
  | ArrayAccessNode
  | AssignmentNode
  | BinaryOperationNode
  | ConditionalExpressionNode
  | ConditionalNode
  | FunctionCallNode
  | LiteralNode
  | MarkerNode
  | NullishCoalescingNode
  | ResourceReferenceNode
  | StatementSequenceNode
  | StringLiteralNode
  | UnaryOperationNode
  | VariableNode;

export namespace ExpressionNode {
  export function getChildern(node: ExpressionNode): ExpressionNode[] {
    if (node === undefined) return [];

    switch (node.type) {
      case NodeType.ArrayAccess:
        return [node.array, node.index];
      case NodeType.Assignment:
      case NodeType.BinaryOperation:
      case NodeType.NullishCoalescing:
        return [node.left, node.right];
      case NodeType.Conditional:
        return [node.condition, node.trueExpression, node.falseExpression];
      case NodeType.FunctionCall:
        return [...node.arguments];
      case NodeType.Literal:
      case NodeType.Marker:
      case NodeType.ResourceReference:
      case NodeType.StringLiteral:
      case NodeType.Variable:
      default:
        return [];
      case NodeType.StatementSequence:
        return [...node.statements];
      case NodeType.UnaryOperation:
        return [node.operand];
    }
  }

  export function getIdentifier(
    node: Pick<ResourceReferenceNode | VariableNode | FunctionCallNode, "scope" | "names">,
    prefixed: boolean = true
  ): string {
    if (prefixed) {
      return `${node.scope}.${node.names.join(".")}`;
    }

    return node.names.join(".");
  }

  export function getLastEndPosition(node: ExpressionNode): number {
    function max(a: ExpressionNode, b: ExpressionNode): ExpressionNode {
      return a.position > b.position ? a : b;
    }

    while (node !== undefined) {
      switch (node.type) {
        // End of trees
        case NodeType.ResourceReference:
        case NodeType.Variable:
          return node.position + getIdentifier(node).length;
        case NodeType.Literal:
        case NodeType.StringLiteral:
          return node.position + node.value.length;
        case NodeType.Marker:
          return node.token.position + node.token.value.length;
        case NodeType.ArrayAccess:
          node = node.index;
          break;
        case NodeType.UnaryOperation:
          node = node.operand;
          break;
        case NodeType.NullishCoalescing:
        case NodeType.BinaryOperation:
        case NodeType.Assignment:
          node = max(node.right, node.left);
          break;
        case NodeType.FunctionCall:
          const args = node.arguments;
          args.forEach((arg) => (node = max(node, arg)));
          break;
        case NodeType.StatementSequence:
          const stats = node.statements;
          stats.forEach((arg) => (node = max(node, arg)));
          break;
        case NodeType.Conditional:
          node = max(node.condition, max(node.falseExpression, node.trueExpression));
          break;
      }
    }

    return (node as ExpressionNode | undefined)?.position ?? 0;
  }
}
