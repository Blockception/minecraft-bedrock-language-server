import { ExpressionNode, NodeType } from 'bc-minecraft-molang';
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