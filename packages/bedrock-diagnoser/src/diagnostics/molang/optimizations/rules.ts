import { ExpressionNode, NodeType, BinaryOperationNode, UnaryOperationNode, ConditionalNode } from 'bc-minecraft-molang';
import { DiagnosticSeverity } from '../../../types';
import {
  OptimizationCategory,
  OptimizationRuleHelpers,
  OptimizationRegistry,
} from './framework';

/**
 * Default optimization rules for Molang expressions
 * This file contains the built-in optimization rules, but developers can easily add more
 * by creating new categories and rules following the same pattern.
 */

/**
 * Creates Constant Folding Rules
 * Detects when two constant values can be pre-calculated
 */
function createConstantFoldingCategory(): OptimizationCategory {
  return {
    name: 'Constant Folding',
    description: 'Detects constant expressions that can be pre-calculated at author time',
    rules: [
      {
        code: 'molang.optimization.constant-folding',
        name: 'Constant expression folding',
        severity: DiagnosticSeverity.info,
        matches(node: ExpressionNode): boolean {
          return OptimizationRuleHelpers.hasTwoLiteralOperands(node);
        },
        getMessage(node: ExpressionNode): string {
          const binOp = node as BinaryOperationNode;
          const leftVal = OptimizationRuleHelpers.getLiteralValue(binOp.left);
          const rightVal = OptimizationRuleHelpers.getLiteralValue(binOp.right);
          
          // Try to calculate the result
          let result: string | undefined;
          try {
            const left = parseFloat(leftVal || '0');
            const right = parseFloat(rightVal || '0');
            if (!isNaN(left) && !isNaN(right)) {
              let computed: number;
              switch (binOp.operator) {
                case '+': computed = left + right; break;
                case '-': computed = left - right; break;
                case '*': computed = left * right; break;
                case '/': computed = left / right; break;
                case '%': computed = left % right; break;
                default: computed = NaN;
              }
              if (!isNaN(computed)) {
                result = String(computed);
              }
            }
          } catch {
            // If calculation fails, don't show result
          }

          if (result !== undefined) {
            return `constant expression '${leftVal} ${binOp.operator} ${rightVal}' can be replaced with '${result}'`;
          }
          return `constant expression can be pre-calculated: ${leftVal} ${binOp.operator} ${rightVal}`;
        },
      },
    ],
  };
}

/**
 * Creates Identity Operation Rules
 * Detects operations that have no effect (e.g., +0, *1, /1)
 */
function createIdentityOperationsCategory(): OptimizationCategory {
  return {
    name: 'Identity Operations',
    description: 'Detects mathematical operations that have no effect and can be removed',
    rules: [
      ...OptimizationRuleHelpers.createBinaryLeftOrRightLiteralRules(
        '+',
        '0',
        'molang.optimization.identity-operation',
        (node, side) => {
          const binOp = node as BinaryOperationNode;
          const otherSide = side === 'left' ? binOp.right : binOp.left;
          // Try to get a simple representation
          let replacement = 'the other operand';
          if (otherSide.type === NodeType.Variable || otherSide.type === NodeType.ResourceReference) {
            const varNode = otherSide as any;
            replacement = `${varNode.scope}.${varNode.names.join('.')}`;
          }
          return `addition with 0 has no effect, replace with ${replacement}`;
        },
      ),
      OptimizationRuleHelpers.createBinaryRightLiteralRule(
        '-',
        '0',
        'molang.optimization.identity-operation',
        (node) => {
          const binOp = node as BinaryOperationNode;
          let replacement = 'the left operand';
          if (binOp.left.type === NodeType.Variable || binOp.left.type === NodeType.ResourceReference) {
            const varNode = binOp.left as any;
            replacement = `${varNode.scope}.${varNode.names.join('.')}`;
          }
          return `subtraction with 0 has no effect, replace with ${replacement}`;
        },
      ),
      ...OptimizationRuleHelpers.createBinaryLeftOrRightLiteralRules(
        '*',
        '1',
        'molang.optimization.identity-operation',
        (node, side) => {
          const binOp = node as BinaryOperationNode;
          const otherSide = side === 'left' ? binOp.right : binOp.left;
          let replacement = 'the other operand';
          if (otherSide.type === NodeType.Variable || otherSide.type === NodeType.ResourceReference) {
            const varNode = otherSide as any;
            replacement = `${varNode.scope}.${varNode.names.join('.')}`;
          }
          return `multiplication by 1 has no effect, replace with ${replacement}`;
        },
      ),
      OptimizationRuleHelpers.createBinaryRightLiteralRule(
        '/',
        '1',
        'molang.optimization.identity-operation',
        (node) => {
          const binOp = node as BinaryOperationNode;
          let replacement = 'the left operand';
          if (binOp.left.type === NodeType.Variable || binOp.left.type === NodeType.ResourceReference) {
            const varNode = binOp.left as any;
            replacement = `${varNode.scope}.${varNode.names.join('.')}`;
          }
          return `division by 1 has no effect, replace with ${replacement}`;
        },
      ),
    ],
  };
}

/**
 * Creates Constant Result Rules
 * Detects operations that always produce the same result (e.g., *0)
 */
function createConstantResultCategory(): OptimizationCategory {
  return {
    name: 'Constant Result',
    description: 'Detects operations that always produce a constant result',
    rules: [
      OptimizationRuleHelpers.createBinaryRightLiteralRule(
        '*',
        '0',
        'molang.optimization.constant-result',
        'multiplication by 0 always results in 0',
      ),
      OptimizationRuleHelpers.createBinaryLeftLiteralRule(
        '*',
        '0',
        'molang.optimization.constant-result',
        'multiplication by 0 always results in 0',
      ),
    ],
  };
}

/**
 * Creates Redundant Boolean Comparison Rules
 * Detects comparisons with boolean literals that can be simplified
 */
function createRedundantComparisonCategory(): OptimizationCategory {
  return {
    name: 'Redundant Boolean Comparisons',
    description: 'Detects comparisons with boolean values that can be simplified',
    rules: [
      {
        code: 'molang.optimization.redundant-comparison',
        name: 'Redundant boolean comparison',
        severity: DiagnosticSeverity.info,
        matches(node: ExpressionNode): boolean {
          if (node.type !== NodeType.BinaryOperation) return false;
          const binOp = node as BinaryOperationNode;
          if (binOp.operator !== '==' && binOp.operator !== '!=') return false;
          return OptimizationRuleHelpers.isBooleanLiteral(binOp.left) || OptimizationRuleHelpers.isBooleanLiteral(binOp.right);
        },
        getMessage(node: ExpressionNode): string {
          const binOp = node as BinaryOperationNode;
          const leftIsBoolean = OptimizationRuleHelpers.isBooleanLiteral(binOp.left);
          const boolNode = leftIsBoolean ? binOp.left : binOp.right;
          const otherSide = leftIsBoolean ? 'right' : 'left';
          const value = OptimizationRuleHelpers.getLiteralValue(boolNode)?.toLowerCase();

          const shouldNegate =
            (binOp.operator === '==' && value === 'false') || (binOp.operator === '!=' && value === 'true');
          const suggestion = shouldNegate ? `use negation: !${otherSide}` : `use the ${otherSide} expression directly`;

          return `comparison with ${value} is redundant, ${suggestion}`;
        },
      },
    ],
  };
}

/**
 * Creates Double Negation Rules
 * Detects double negation that can be removed
 */
function createDoubleNegationCategory(): OptimizationCategory {
  return {
    name: 'Double Negation',
    description: 'Detects double negation that can be simplified',
    rules: [
      {
        code: 'molang.optimization.double-negation',
        name: 'Double negation',
        severity: DiagnosticSeverity.info,
        matches(node: ExpressionNode): boolean {
          if (node.type !== NodeType.UnaryOperation) return false;
          const unaryOp = node as UnaryOperationNode;
          if (unaryOp.operator !== '!') return false;
          if (unaryOp.operand.type !== NodeType.UnaryOperation) return false;
          const innerOp = unaryOp.operand as UnaryOperationNode;
          return innerOp.operator === '!';
        },
        getMessage(): string {
          return 'double negation can be simplified by removing both negations';
        },
      },
    ],
  };
}

/**
 * Creates Redundant Unary Operators
 * Detects unary operators that have no effect
 */
function createRedundantUnaryCategory(): OptimizationCategory {
  return {
    name: 'Redundant Unary Operators',
    description: 'Detects unary operators that have no effect',
    rules: [
      {
        code: 'molang.optimization.redundant-unary',
        name: 'Redundant unary plus',
        severity: DiagnosticSeverity.info,
        matches(node: ExpressionNode): boolean {
          if (node.type !== NodeType.UnaryOperation) return false;
          const unaryOp = node as UnaryOperationNode;
          return unaryOp.operator === '+';
        },
        getMessage(): string {
          return 'unary plus operator has no effect and can be removed';
        },
      },
    ],
  };
}

/**
 * Creates Constant Condition Rules
 * Detects conditional expressions with constant conditions
 */
function createConstantConditionCategory(): OptimizationCategory {
  return {
    name: 'Constant Conditions',
    description: 'Detects conditional expressions with constant conditions that can be simplified',
    rules: [
      {
        code: 'molang.optimization.constant-condition',
        name: 'Constant condition in ternary',
        severity: DiagnosticSeverity.info,
        matches(node: ExpressionNode): boolean {
          if (node.type !== NodeType.Conditional) return false;
          const conditional = node as ConditionalNode;
          if (conditional.condition.type !== NodeType.Literal) return false;
          const value = OptimizationRuleHelpers.getLiteralValue(conditional.condition)?.toLowerCase();
          return value === 'true' || value === 'false' || value === '0';
        },
        getMessage(node: ExpressionNode): string {
          const conditional = node as ConditionalNode;
          const condValue = OptimizationRuleHelpers.getLiteralValue(conditional.condition)?.toLowerCase();
          const branch = condValue === '0' || condValue === 'false' ? 'false' : 'true';
          return `conditional has constant condition, can be replaced with ${branch} branch`;
        },
      },
    ],
  };
}

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
 * Example of how to add custom optimization rules:
 * 
 * ```typescript
 * const customCategory: OptimizationCategory = {
 *   name: 'Custom Optimizations',
 *   description: 'My custom optimization rules',
 *   rules: [
 *     {
 *       code: 'molang.optimization.custom-rule',
 *       name: 'My custom rule',
 *       severity: DiagnosticSeverity.info,
 *       matches(node: ExpressionNode): boolean {
 *         // Your matching logic here
 *         return false;
 *       },
 *       getMessage(node: ExpressionNode): string {
 *         return 'Your message here';
 *       },
 *     },
 *   ],
 * };
 * 
 * const registry = createDefaultOptimizationRegistry();
 * registry.registerCategory(customCategory);
 * ```
 */

