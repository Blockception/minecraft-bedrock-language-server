import { BinaryOperationNode } from 'bc-minecraft-molang';
import { Optimization, OptimizationRule } from '.';
import { DiagnosticSeverity } from '../../../types';
/**
 * Creates a rule for checking binary operations with a specific operator and literal value on the right
 */
export declare function createBinaryRightLiteralRule(operator: string, literalValue: string, code: string, message: string | ((node: BinaryOperationNode) => string | Optimization), severity?: DiagnosticSeverity): OptimizationRule;
/**
 * Creates a rule for checking binary operations with a specific operator and literal value on the left
 */
export declare function createBinaryLeftLiteralRule(operator: string, literalValue: string, code: string, message: string | ((node: BinaryOperationNode) => string | Optimization), severity?: DiagnosticSeverity): OptimizationRule;
/**
 * Creates rules for checking binary operations with a specific operator and literal value on either side
 * This helper reduces duplication by creating both left and right rules at once
 */
export declare function createBinaryLeftOrRightLiteralRules(operator: string, literalValue: string, code: string, messageTemplate: string | ((node: BinaryOperationNode, side: 'left' | 'right') => string | Optimization), severity?: DiagnosticSeverity): OptimizationRule[];
export declare function createBinaryBothLiteralRule(code: string, severity: DiagnosticSeverity, optimize: (op: string, left: string, right: string) => string | undefined): OptimizationRule;
//# sourceMappingURL=template.d.ts.map