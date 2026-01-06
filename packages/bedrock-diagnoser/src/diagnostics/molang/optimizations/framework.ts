import { ExpressionNode } from 'bc-minecraft-molang';
import { DiagnosticSeverity } from '../../../types';

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
 * Represents a single optimization rule that can be checked against Molang expressions
 */
export interface OptimizationRule {
  /**
   * The base unique identifier for this optimization rule
   */
  code: string;

  /**
   * Human-readable name for this optimization
   */
  name: string;

  /**
   * The base severity level of this optimization diagnostic
   * Typically 'info' for optimization suggestions
   */
  severity: DiagnosticSeverity;

  /**
   * Generates a human-readable message for this optimization
   * @param node The expression node where the optimization is found
   */
  getOptimizations(node: ExpressionNode): Optimization | Optimization[] | null;
}

export interface Optimization {
  /**
   * Unique identifier for this optimization rule
   */
  code?: string;
  /**
   * Human-readable message describing the optimization
   */
  message: string;
  /**
   * The severity level of this optimization diagnostic
   * Typically 'info' for optimization suggestions
   */
  severity?: DiagnosticSeverity;
}
