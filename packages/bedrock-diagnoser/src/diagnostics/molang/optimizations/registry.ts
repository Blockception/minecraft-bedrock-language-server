import { ExpressionNode, walk } from 'bc-minecraft-molang';
import { DiagnosticsBuilder } from '../../../types';
import { OptimizationCategory, OptimizationRule } from './framework';
import { createConstantConditionCategory, createConstantFoldingCategory, createConstantResultCategory, createDoubleNegationCategory, createIdentityOperationsCategory, createRedundantComparisonCategory, createRedundantUnaryCategory } from './rules';

/**
 * Creates and returns the default optimization registry with all built-in rules
 */
export function createDefaultOptimizationRegistry(): OptimizationRegistry {
  const registry = new OptimizationRegistry();

  // Register all default categories
  registry.registerCategory(createConstantFoldingCategory());
  registry.registerCategory(createIdentityOperationsCategory());
  registry.registerCategory(createConstantResultCategory());
  registry.registerCategory(createRedundantComparisonCategory());
  registry.registerCategory(createDoubleNegationCategory());
  registry.registerCategory(createRedundantUnaryCategory());
  registry.registerCategory(createConstantConditionCategory());

  return registry;
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
      let result = rule.getOptimizations(node);
      if (result == null) continue;

      if (!Array.isArray(result)) {
        result = [result];
      }

      for (const optimizedNode of result) {
        diagnoser.add(
          node.position,
          optimizedNode.message,
          optimizedNode.severity ?? rule.severity,
          optimizedNode.code ?? rule.code,
        );
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
  walk(expression, (node) => {
    registry.checkNode(node, diagnoser);
  });
}
