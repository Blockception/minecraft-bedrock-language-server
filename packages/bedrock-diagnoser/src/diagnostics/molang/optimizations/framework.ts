import { ExpressionNode, NodeType, LiteralNode, BinaryOperationNode } from 'bc-minecraft-molang';
import { DiagnosticsBuilder, DiagnosticSeverity } from '../../../types';

/**
 * Represents a single optimization rule that can be checked against Molang expressions
 */
export interface OptimizationRule {
  /**
   * Unique identifier for this optimization rule
   */
  code: string;

  /**
   * Human-readable name for this optimization
   */
  name: string;

  /**
   * The severity level of this optimization diagnostic
   * Typically 'info' for optimization suggestions
   */
  severity: DiagnosticSeverity;

  /**
   * Checks if this rule applies to the given node
   * @param node The expression node to check
   * @returns true if the rule applies, false otherwise
   */
  matches(node: ExpressionNode): boolean;

  /**
   * Returns the diagnostic message for this optimization
   * @param node The expression node that matched
   * @returns The message to display to the user
   */
  getMessage(node: ExpressionNode): string;
}

/**
 * A category of optimization rules that are related
 */
export interface OptimizationCategory {
  /**
   * Name of this category (e.g., "Constant Folding", "Identity Operations")
   */
  name: string;

  /**
   * Description of what this category checks
   */
  description: string;

  /**
   * The rules in this category
   */
  rules: OptimizationRule[];
}

/**
 * Helper functions for creating common optimization rules
 */
export namespace OptimizationRuleHelpers {
  /**
   * Checks if a node is a literal with a specific value
   */
  export function isLiteralValue(node: ExpressionNode, value: string): boolean {
    return node.type === NodeType.Literal && (node as LiteralNode).value === value;
  }

  /**
   * Checks if a node is a boolean literal (true/false)
   */
  export function isBooleanLiteral(node: ExpressionNode): boolean {
    if (node.type !== NodeType.Literal) return false;
    const value = (node as LiteralNode).value?.toLowerCase();
    return value === 'true' || value === 'false';
  }

  /**
   * Gets the value of a literal node
   */
  export function getLiteralValue(node: ExpressionNode): string | undefined {
    return node.type === NodeType.Literal ? (node as LiteralNode).value : undefined;
  }

  /**
   * Checks if both operands of a binary operation are literals
   */
  export function hasTwoLiteralOperands(node: ExpressionNode): boolean {
    if (node.type !== NodeType.BinaryOperation) return false;
    const binOp = node as BinaryOperationNode;
    return binOp.left.type === NodeType.Literal && binOp.right.type === NodeType.Literal;
  }

  /**
   * Creates a rule for checking binary operations with a specific operator and literal value on the right
   */
  export function createBinaryRightLiteralRule(
    operator: string,
    literalValue: string,
    code: string,
    message: string | ((node: ExpressionNode) => string),
    severity: DiagnosticSeverity = DiagnosticSeverity.info,
  ): OptimizationRule {
    return {
      code,
      name: `${operator} with ${literalValue} on right`,
      severity,
      matches(node: ExpressionNode): boolean {
        if (node.type !== NodeType.BinaryOperation) return false;
        const binOp = node as BinaryOperationNode;
        return binOp.operator === operator && isLiteralValue(binOp.right, literalValue);
      },
      getMessage: typeof message === 'string' ? () => message : message,
    };
  }

  /**
   * Creates a rule for checking binary operations with a specific operator and literal value on the left
   */
  export function createBinaryLeftLiteralRule(
    operator: string,
    literalValue: string,
    code: string,
    message: string | ((node: ExpressionNode) => string),
    severity: DiagnosticSeverity = DiagnosticSeverity.info,
  ): OptimizationRule {
    return {
      code,
      name: `${operator} with ${literalValue} on left`,
      severity,
      matches(node: ExpressionNode): boolean {
        if (node.type !== NodeType.BinaryOperation) return false;
        const binOp = node as BinaryOperationNode;
        return binOp.operator === operator && isLiteralValue(binOp.left, literalValue);
      },
      getMessage: typeof message === 'string' ? () => message : message,
    };
  }

  /**
   * Creates rules for checking binary operations with a specific operator and literal value on either side
   * This helper reduces duplication by creating both left and right rules at once
   */
  export function createBinaryLeftOrRightLiteralRules(
    operator: string,
    literalValue: string,
    code: string,
    messageTemplate: string | ((node: ExpressionNode, side: 'left' | 'right') => string),
    severity: DiagnosticSeverity = DiagnosticSeverity.info,
  ): OptimizationRule[] {
    // If messageTemplate is a function, we need to adapt it for left/right
    if (typeof messageTemplate === 'function') {
      return [
        createBinaryRightLiteralRule(operator, literalValue, code, (node) => messageTemplate(node, 'right'), severity),
        createBinaryLeftLiteralRule(operator, literalValue, code, (node) => messageTemplate(node, 'left'), severity),
      ];
    }
    return [
      createBinaryRightLiteralRule(operator, literalValue, code, messageTemplate, severity),
      createBinaryLeftLiteralRule(operator, literalValue, code, messageTemplate, severity),
    ];
  }
}

/**
 * Registry of all optimization rules
 */
export class OptimizationRegistry {
  private categories: OptimizationCategory[] = [];

  /**
   * Registers a new category of optimization rules
   */
  registerCategory(category: OptimizationCategory): void {
    this.categories.push(category);
  }

  /**
   * Gets all registered optimization rules across all categories
   */
  getAllRules(): OptimizationRule[] {
    return this.categories.flatMap((cat) => cat.rules);
  }

  /**
   * Gets all registered categories
   */
  getCategories(): OptimizationCategory[] {
    return this.categories;
  }

  /**
   * Checks a node against all registered rules and reports diagnostics
   */
  checkNode(node: ExpressionNode, diagnoser: DiagnosticsBuilder): void {
    for (const rule of this.getAllRules()) {
      if (rule.matches(node)) {
        diagnoser.add(node.position, rule.getMessage(node), rule.severity, rule.code);
      }
    }
  }
}

/**
 * Traverses an expression tree and applies optimization rules to each node
 */
export function traverseAndOptimize(
  expression: ExpressionNode,
  registry: OptimizationRegistry,
  diagnoser: DiagnosticsBuilder,
): void {
  const nodesToVisit: ExpressionNode[] = [expression];

  for (let i = 0; i < nodesToVisit.length; i++) {
    const node = nodesToVisit[i];

    // Check this node against all rules
    registry.checkNode(node, diagnoser);

    // Add children to the traversal queue
    switch (node.type) {
      case NodeType.ArrayAccess:
        nodesToVisit.push(node.array, node.index);
        break;
      case NodeType.Assignment:
      case NodeType.BinaryOperation:
      case NodeType.NullishCoalescing:
        nodesToVisit.push(node.left, node.right);
        break;
      case NodeType.Conditional:
        nodesToVisit.push(node.condition, node.trueExpression, node.falseExpression);
        break;
      case NodeType.FunctionCall:
        nodesToVisit.push(...node.arguments);
        break;
      case NodeType.StatementSequence:
        nodesToVisit.push(...node.statements);
        break;
      case NodeType.UnaryOperation:
        nodesToVisit.push(node.operand);
        break;
      // Terminal nodes have no children
      case NodeType.Literal:
      case NodeType.StringLiteral:
      case NodeType.Variable:
      case NodeType.ResourceReference:
      case NodeType.Marker:
        break;
    }
  }
}
