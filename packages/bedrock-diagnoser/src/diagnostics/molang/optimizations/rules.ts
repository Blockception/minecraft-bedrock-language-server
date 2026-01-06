import {
  BinaryOperationNode,
  ConditionalNode,
  ExpressionNode,
  NodeType,
  ResourceReferenceNode,
  UnaryOperationNode,
  VariableNode,
} from 'bc-minecraft-molang';
import { DiagnosticSeverity } from '../../../types';
import { OptimizationCategory, OptimizationRegistry } from './framework';
import {
  createBinaryLeftLiteralRule,
  createBinaryLeftOrRightLiteralRules,
  createBinaryRightLiteralRule,
} from './template';
import { getLiteralValue, hasTwoLiteralOperands, isBooleanLiteral } from './util';

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
          return hasTwoLiteralOperands(node);
        },
        getMessage(node: ExpressionNode): string {
          const binOp = node as BinaryOperationNode;
          const leftVal = getLiteralValue(binOp.left);
          const rightVal = getLiteralValue(binOp.right);

          // Try to calculate the result
          let result: string | undefined;
          try {
            const left = parseFloat(leftVal || '0');
            const right = parseFloat(rightVal || '0');
            if (!isNaN(left) && !isNaN(right)) {
              let computed: number;
              switch (binOp.operator) {
                case '+':
                  computed = left + right;
                  break;
                case '-':
                  computed = left - right;
                  break;
                case '*':
                  computed = left * right;
                  break;
                case '/':
                  computed = left / right;
                  break;
                case '%':
                  computed = left % right;
                  break;
                default:
                  computed = NaN;
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
      ...createBinaryLeftOrRightLiteralRules('+', '0', 'molang.optimization.identity-operation', (node, side) => {
        const otherSide = side === 'left' ? node.right : node.left;
        // Try to get a simple representation
        let replacement = 'the other operand';
        if (otherSide.type === NodeType.Variable || otherSide.type === NodeType.ResourceReference) {
          const varNode = otherSide as any;
          replacement = `${varNode.scope}.${varNode.names.join('.')}`;
        }
        return `addition with 0 has no effect, replace with ${replacement}`;
      }),
      createBinaryRightLiteralRule('-', '0', 'molang.optimization.identity-operation', (node) => {
        let replacement = 'the left operand';
        if (node.left.type === NodeType.Variable || node.left.type === NodeType.ResourceReference) {
          const varNode = node.left as any;
          replacement = `${varNode.scope}.${varNode.names.join('.')}`;
        }
        return `subtraction with 0 has no effect, replace with ${replacement}`;
      }),
      ...createBinaryLeftOrRightLiteralRules('*', '1', 'molang.optimization.identity-operation', (node, side) => {
        const otherSide = side === 'left' ? node.right : node.left;
        let replacement = 'the other operand';
        if (VariableNode.is(otherSide)  || ResourceReferenceNode.is(otherSide)) {
          replacement = `${otherSide.scope}.${otherSide.names.join('.')}`;
        }
        return `multiplication by 1 has no effect, replace with ${replacement}`;
      }),
      createBinaryRightLiteralRule('/', '1', 'molang.optimization.identity-operation', (node) => {
        let replacement = 'the left operand';
        if (node.left.type === NodeType.Variable || node.left.type === NodeType.ResourceReference) {
          const varNode = node.left as any;
          replacement = `${varNode.scope}.${varNode.names.join('.')}`;
        }
        return `division by 1 has no effect, replace with ${replacement}`;
      }),
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
      createBinaryRightLiteralRule(
        '*',
        '0',
        'molang.optimization.constant-result',
        'multiplication by 0 always results in 0',
      ),
      createBinaryLeftLiteralRule(
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
          if (!BinaryOperationNode.is(node)) return false;
          if (node.operator !== '==' && node.operator !== '!=') return false;

          return isBooleanLiteral(node.left) || isBooleanLiteral(node.right);
        },
        getMessage(node: ExpressionNode): string {
          const binOp = node as BinaryOperationNode;
          const leftIsBoolean = isBooleanLiteral(binOp.left);
          const boolNode = leftIsBoolean ? binOp.left : binOp.right;
          const otherSide = leftIsBoolean ? 'right' : 'left';
          const value = getLiteralValue(boolNode)?.toLowerCase();

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
          if (!UnaryOperationNode.is(node)) return false;
          if (!UnaryOperationNode.is(node.operand)) return false;
          const innerOp = node.operand;
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
          if (!UnaryOperationNode.is(node)) return false;
          return node.operator === '+';
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
          if (!ConditionalNode.is(node)) return false;
          const value = getLiteralValue(node.condition)?.toLowerCase();
          return value === 'true' || value === 'false' || value === '0';
        },
        getMessage(node: ExpressionNode): string {
          const conditional = node as ConditionalNode;
          const condValue = getLiteralValue(conditional.condition)?.toLowerCase();
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
