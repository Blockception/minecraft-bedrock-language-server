import {
  BinaryOperationNode,
  ConditionalNode,
  ExpressionNode,
  LiteralNode,
  NodeType,
  ResourceReferenceNode,
  UnaryOperationNode,
  VariableNode,
} from 'bc-minecraft-molang';
import { DiagnosticSeverity } from '../../../types';
import { OptimizationCategory } from './framework';
import { optimizeOperation } from './operation-rules';
import {
  createBinaryBothLiteralRule,
  createBinaryLeftLiteralRule,
  createBinaryLeftOrRightLiteralRules,
  createBinaryRightLiteralRule,
} from './template';
import { getLiteralValue, isBooleanLiteral } from './util';

/**
 * Default optimization rules for Molang expressions
 * This file contains the built-in optimization rules, but developers can easily add more
 * by creating new categories and rules following the same pattern.
 */

/**
 * Creates Identity Operation Rules
 * Detects operations that have no effect (e.g., +0, *1, /1)
 */
export function createIdentityOperationsCategory(): OptimizationCategory {
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
          replacement = ExpressionNode.getIdentifier(varNode);
        }
        return `addition with 0 has no effect, replace with ${replacement}`;
      }),
      createBinaryRightLiteralRule('-', '0', 'molang.optimization.identity-operation', (node) => {
        let replacement = 'the left operand';
        if (node.left.type === NodeType.Variable || node.left.type === NodeType.ResourceReference) {
          const varNode = node.left as any;
          replacement = ExpressionNode.getIdentifier(varNode);
        }
        return `subtraction with 0 has no effect, replace with ${replacement}`;
      }),
      ...createBinaryLeftOrRightLiteralRules('*', '1', 'molang.optimization.identity-operation', (node, side) => {
        const otherSide = side === 'left' ? node.right : node.left;
        let replacement = 'the other operand';
        if (VariableNode.is(otherSide) || ResourceReferenceNode.is(otherSide)) {
          replacement = ExpressionNode.getIdentifier(otherSide);
        }
        return `multiplication by 1 has no effect, replace with ${replacement}`;
      }),
      createBinaryRightLiteralRule('/', '1', 'molang.optimization.identity-operation', (node) => {
        let replacement = 'the left operand';
        if (node.left.type === NodeType.Variable || node.left.type === NodeType.ResourceReference) {
          const varNode = node.left as any;
          replacement = ExpressionNode.getIdentifier(varNode);
        }
        return `division by 1 has no effect, replace with ${replacement}`;
      }),
    ],
  };
}

export function createSimplifyOperationsCategory(): OptimizationCategory {
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
          replacement = ExpressionNode.getIdentifier(varNode);
        }
        return `addition with 0 has no effect, replace with ${replacement}`;
      }),
      createBinaryRightLiteralRule('-', '0', 'molang.optimization.identity-operation', (node) => {
        let replacement = 'the left operand';
        if (node.left.type === NodeType.Variable || node.left.type === NodeType.ResourceReference) {
          const varNode = node.left as any;
          replacement = ExpressionNode.getIdentifier(varNode);
        }
        return `subtraction with 0 has no effect, replace with ${replacement}`;
      }),
      ...createBinaryLeftOrRightLiteralRules('*', '1', 'molang.optimization.identity-operation', (node, side) => {
        const otherSide = side === 'left' ? node.right : node.left;
        let replacement = 'the other operand';
        if (VariableNode.is(otherSide) || ResourceReferenceNode.is(otherSide)) {
          replacement = ExpressionNode.getIdentifier(otherSide);
        }
        return `multiplication by 1 has no effect, replace with ${replacement}`;
      }),
      createBinaryRightLiteralRule('/', '1', 'molang.optimization.identity-operation', (node) => {
        let replacement = 'the left operand';
        if (node.left.type === NodeType.Variable || node.left.type === NodeType.ResourceReference) {
          const varNode = node.left as any;
          replacement = ExpressionNode.getIdentifier(varNode);
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
export function createConstantResultCategory(): OptimizationCategory {
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
      createBinaryBothLiteralRule('molang.optimization.constant-result', DiagnosticSeverity.info, tryOpNumber),
      createBinaryBothLiteralRule('molang.optimization.constant-result', DiagnosticSeverity.info, tryOpBoolean),
    ],
  };
}

function tryOpNumber(op: string, a: string, b: string) {
  try {
    const numA = parseFloat(a);
    const numB = parseFloat(b);
    switch (op) {
      case '+':
        return `${numA + numB}`;
      case '-':
        return `${numA - numB}`;
      case '*':
        return `${numA * numB}`;
      case '/':
        return `${numA / numB}`;
      case '%':
        return `${numA % numB}`;
      case '>':
        return `${numA > numB}`;
      case '<':
        return `${numA < numB}`;
      case '>=':
        return `${numA >= numB}`;
      case '<=':
        return `${numA <= numB}`;
      case '==':
        return `${numA == numB}`;
      case '!=':
        return `${numA != numB}`;
    }
  } catch {
    // Ignore errors
  }

  try {
    const numA = parseInt(a);
    const numB = parseInt(b);
    switch (op) {
      case '+':
        return `${numA + numB}`;
      case '-':
        return `${numA - numB}`;
      case '*':
        return `${numA * numB}`;
      case '/':
        return `${numA / numB}`;
      case '%':
        return `${numA % numB}`;
      case '>':
        return `${numA > numB}`;
      case '<':
        return `${numA < numB}`;
      case '>=':
        return `${numA >= numB}`;
      case '<=':
        return `${numA <= numB}`;
      case '==':
        return `${numA == numB}`;
      case '!=':
        return `${numA != numB}`;
    }
  } catch {
    // Ignore errors
  }

  return undefined;
}

function tryOpBoolean(op: string, a: string, b: string) {
  function toBoolean(value: string): boolean | undefined {
    switch (value.toLowerCase()) {
      case 'true':
      case '1':
        return true;
      case 'false':
      case '0':
        return false;
    }
  }

  switch (op) {
    case '&&':
      return `${toBoolean(a) && toBoolean(b)}`;
    case '||':
      return `${toBoolean(a) || toBoolean(b)}`;
    case '==':
      return `${toBoolean(a) == toBoolean(b)}`;
    case '!=':
      return `${toBoolean(a) != toBoolean(b)}`;
  }

  return undefined;
}

/**
 * Creates Redundant Boolean Comparison Rules
 * Detects comparisons with boolean literals that can be simplified
 */
export function createRedundantComparisonCategory(): OptimizationCategory {
  return {
    name: 'Redundant Boolean Comparisons',
    description: 'Detects comparisons with boolean values that can be simplified',
    rules: [
      {
        code: 'molang.optimization.redundant-comparison',
        name: 'Redundant boolean comparison',
        severity: DiagnosticSeverity.info,
        getOptimizations(node) {
          if (!BinaryOperationNode.is(node)) return null;
          if (node.operator !== '==' && node.operator !== '!=') return null;
          
          // Check if exactly one operand is a boolean literal (XOR)
          const leftIsBoolean = isBooleanLiteral(node.left);
          const rightIsBoolean = isBooleanLiteral(node.right);
          if (leftIsBoolean === rightIsBoolean) return null; // Both true or both false - not what we want

          const boolNode = leftIsBoolean ? node.left : node.right;
          const otherSide = leftIsBoolean ? 'right' : 'left';
          const value = getLiteralValue(boolNode)?.toLowerCase();

          const shouldNegate =
            (node.operator === '==' && value === 'false') || (node.operator === '!=' && value === 'true');
          const suggestion = shouldNegate ? `use negation: !${otherSide}` : `use the ${otherSide} expression directly`;

          return {
            message: `comparison with ${value} is redundant, ${suggestion}`,
          };
        },
      },
    ],
  };
}

/**
 * Creates Double Negation Rules
 * Detects double negation that can be removed
 */
export function createDoubleNegationCategory(): OptimizationCategory {
  return {
    name: 'Double Negation',
    description: 'Detects double negation that can be simplified',
    rules: [
      {
        code: 'molang.optimization.double-negation',
        name: 'Double negation',
        severity: DiagnosticSeverity.info,
        getOptimizations(node) {
          if (!UnaryOperationNode.is(node)) return null;
          if (!UnaryOperationNode.is(node.operand)) return null;
          if (node.operand.operator !== '!') return null;

          return {
            message: 'double negation can be simplified by removing both negations',
          };
        },
      },
    ],
  };
}

/**
 * Creates Redundant Unary Operators
 * Detects unary operators that have no effect
 */
export function createRedundantUnaryCategory(): OptimizationCategory {
  return {
    name: 'Redundant Unary Operators',
    description: 'Detects unary operators that have no effect',
    rules: [
      {
        code: 'molang.optimization.redundant-unary',
        name: 'Redundant unary plus',
        severity: DiagnosticSeverity.info,
        getOptimizations(node) {
          if (!UnaryOperationNode.is(node)) return null;
          if (node.operator !== '+') return null;

          return {
            message: 'unary plus operator has no effect and can be removed',
          };
        },
      },
    ],
  };
}

/**
 * Creates Constant Condition Rules
 * Detects conditional expressions with constant conditions
 */
export function createConstantConditionCategory(): OptimizationCategory {
  return {
    name: 'Constant Conditions',
    description: 'Detects conditional expressions with constant conditions that can be simplified',
    rules: [
      {
        code: 'molang.optimization.constant-condition',
        name: 'Constant condition in ternary',
        severity: DiagnosticSeverity.info,
        getOptimizations(node) {
          if (!ConditionalNode.is(node)) return null;
          const value = getLiteralValue(node.condition)?.toLowerCase();
          if (value !== 'true' && value !== 'false' && value !== '0') return null;

          const branch = value === '0' || value === 'false' ? 'false' : 'true';
          return {
            message: `conditional has constant condition, can be replaced with ${branch} branch`,
          };
        },
      },
    ],
  };
}

/**
 * Creates Constant Folding Rules
 * Detects when two constant values can be pre-calculated
 */
export function createConstantFoldingCategory(): OptimizationCategory {
  return {
    name: 'Constant Folding',
    description: 'Detects constant expressions that can be pre-calculated at author time',
    rules: [
      {
        code: 'molang.optimization.constant-folding',
        name: 'Optimize constant expression',
        severity: DiagnosticSeverity.info,
        getOptimizations(node) {
          if (!BinaryOperationNode.is(node)) return null;
          // Make a copy so we can modify it
          return optimizeOperation(node);
        },
      },
      {
        code: 'molang.optimization.constant-folding',
        name: 'Optimize unary expression',
        severity: DiagnosticSeverity.info,
        getOptimizations(node) {
          if (!UnaryOperationNode.is(node)) return null;
          if (!LiteralNode.is(node.operand)) return null;
          const value = node.operand.value;

          switch (node.operator) {
            case '!':
              if (value.toLowerCase() === 'true' || value === '1') {
                return {
                  message: 'negation of true constant can be replaced with false',
                };
              }
              if (value.toLowerCase() === 'false' || value === '0') {
                return {
                  message: 'negation of false constant can be replaced with true',
                };
              }
              break;
          }

          return null;
        },
      },
    ],
  };
}
