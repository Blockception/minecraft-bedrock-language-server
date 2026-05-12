import { ExpressionNode, walk } from 'bc-minecraft-molang';
import { OffsetWord } from 'bc-minecraft-bedrock-shared';
import { DiagnosticsBuilder } from '../../../types';
import { OptimizationCategory, OptimizationRule } from './framework';
import { createConstantConditionCategory, createConstantFoldingCategory, createConstantResultCategory, createDivisionByZeroCategory, createDoubleNegationCategory, createIdentityOperationsCategory, createRedundantComparisonCategory, createRedundantUnaryCategory, createSelfCancellationCategory, createSelfDivisionCategory } from './rules';

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
  registry.registerCategory(createSelfCancellationCategory());
  registry.registerCategory(createSelfDivisionCategory());
  registry.registerCategory(createDivisionByZeroCategory());

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
  checkNode(node: ExpressionNode, diagnoser: Pick<DiagnosticsBuilder, "add">): void {
    for (const rule of this.getAllRules()) {
      let result = rule.getOptimizations(node);
      if (result == null) continue;

      if (!Array.isArray(result)) {
        result = [result];
      }

      for (const optimizedNode of result) {
        const data = optimizedNode.replacement !== undefined ? { replacement: optimizedNode.replacement } : undefined;
        // Compute the source range of the full expression so the IDE code action
        // replaces the whole expression, not just the operator token.
        const startOffset = ExpressionNode.getStartOffset(node);
        const endOffset = ExpressionNode.getLastEndPosition(node);
        const length = Math.max(1, endOffset - startOffset);
        const nodeRange = OffsetWord.create(' '.repeat(length), startOffset);
        diagnoser.add(
          nodeRange,
          optimizedNode.message,
          optimizedNode.severity ?? rule.severity,
          optimizedNode.code ?? rule.code,
          data,
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
  diagnoser: Pick<DiagnosticsBuilder, "add">,
): void {
  walk(expression, (node) => {
    registry.checkNode(node, diagnoser);
  });
}
