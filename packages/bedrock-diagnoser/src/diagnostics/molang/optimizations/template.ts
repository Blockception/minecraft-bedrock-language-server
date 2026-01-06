import { BinaryOperationNode, ExpressionNode } from 'bc-minecraft-molang';
import { OptimizationRule } from '.';
import { DiagnosticSeverity } from '../../../types';
import { isLiteralValue } from './util';

/**
 * Creates a rule for checking binary operations with a specific operator and literal value on the right
 */
export function createBinaryRightLiteralRule(
  operator: string,
  literalValue: string,
  code: string,
  message: string | ((node: BinaryOperationNode) => string),
  severity: DiagnosticSeverity = DiagnosticSeverity.info,
): OptimizationRule {
  return {
    code,
    name: `${operator} with ${literalValue} on right`,
    severity,
    getOptimizations(node) {
      if (!BinaryOperationNode.is(node)) return null;
      if (node.operator === operator && isLiteralValue(node.right, literalValue)) {
        return {
          message: typeof message === 'string' ? message : message(node),
        };
      }

      return null;
    },
  };
}

/**
 * Creates a rule for checking binary operations with a specific operator and literal value on the left
 */
export function createBinaryLeftLiteralRule(
  operator: string,
  literalValue: string,
  code: string,
  message: string | ((node: BinaryOperationNode) => string),
  severity: DiagnosticSeverity = DiagnosticSeverity.info,
): OptimizationRule {
  return {
    code,
    name: `${operator} with ${literalValue} on left`,
    severity,
    getOptimizations(node: ExpressionNode) {
      if (!BinaryOperationNode.is(node)) return null;
      if (node.operator === operator && isLiteralValue(node.left, literalValue)) {
        return {
          message: typeof message === 'string' ? message : message(node),
        };
      }
      return null;
    },
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
  messageTemplate: string | ((node: BinaryOperationNode, side: 'left' | 'right') => string),
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
