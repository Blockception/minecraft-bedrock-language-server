import { ExpressionNode } from 'bc-minecraft-molang';
import { DiagnosticsBuilder } from '../../../types';
import { OptimizationCategory, OptimizationRule } from './framework';
/**
 * Creates and returns the default optimization registry with all built-in rules
 */
export declare function createDefaultOptimizationRegistry(): OptimizationRegistry;
/**
 * Registry of all optimization rules
 */
export declare class OptimizationRegistry {
    private categories;
    /**
     * Registers a new category of optimization rules
     */
    registerCategory(category: OptimizationCategory): void;
    /**
     * Gets all registered optimization rules across all categories
     */
    getAllRules(): OptimizationRule[];
    /**
     * Gets all registered categories
     */
    getCategories(): OptimizationCategory[];
    /**
     * Checks a node against all registered rules and reports diagnostics
     */
    checkNode(node: ExpressionNode, diagnoser: Pick<DiagnosticsBuilder, "add">): void;
}
/**
 * Traverses an expression tree and applies optimization rules to each node
 */
export declare function traverseAndOptimize(expression: ExpressionNode, registry: OptimizationRegistry, diagnoser: Pick<DiagnosticsBuilder, "add">): void;
//# sourceMappingURL=registry.d.ts.map