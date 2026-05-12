import { OptimizationCategory } from './framework';
/**
 * Default optimization rules for Molang expressions
 * This file contains the built-in optimization rules, but developers can easily add more
 * by creating new categories and rules following the same pattern.
 */
/**
 * Creates Identity Operation Rules
 * Detects operations that have no effect (e.g., +0, *1, /1)
 */
export declare function createIdentityOperationsCategory(): OptimizationCategory;
export declare function createSimplifyOperationsCategory(): OptimizationCategory;
/**
 * Creates Constant Result Rules
 * Detects operations that always produce the same result (e.g., *0)
 */
export declare function createConstantResultCategory(): OptimizationCategory;
/**
 * Creates Redundant Boolean Comparison Rules
 * Detects comparisons with boolean literals that can be simplified
 */
export declare function createRedundantComparisonCategory(): OptimizationCategory;
/**
 * Creates Double Negation Rules
 * Detects double negation that can be removed
 */
export declare function createDoubleNegationCategory(): OptimizationCategory;
/**
 * Creates Redundant Unary Operators
 * Detects unary operators that have no effect
 */
export declare function createRedundantUnaryCategory(): OptimizationCategory;
/**
 * Creates Constant Condition Rules
 * Detects conditional expressions with constant conditions
 */
export declare function createConstantConditionCategory(): OptimizationCategory;
/**
 * Creates Constant Folding Rules
 * Detects when two constant values can be pre-calculated
 */
export declare function createConstantFoldingCategory(): OptimizationCategory;
/**
 * Creates Self-Cancellation Rules
 * Detects when an expression is subtracted from itself (x - x = 0)
 */
export declare function createSelfCancellationCategory(): OptimizationCategory;
/**
 * Creates Self-Division Rules
 * Detects when an expression is divided by itself (x / x = 1)
 */
export declare function createSelfDivisionCategory(): OptimizationCategory;
/**
 * Creates Division by Zero Rules
 * Detects when an expression is divided by the literal 0
 */
export declare function createDivisionByZeroCategory(): OptimizationCategory;
//# sourceMappingURL=rules.d.ts.map