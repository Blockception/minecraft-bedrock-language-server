"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createIdentityOperationsCategory = createIdentityOperationsCategory;
exports.createSimplifyOperationsCategory = createSimplifyOperationsCategory;
exports.createConstantResultCategory = createConstantResultCategory;
exports.createRedundantComparisonCategory = createRedundantComparisonCategory;
exports.createDoubleNegationCategory = createDoubleNegationCategory;
exports.createRedundantUnaryCategory = createRedundantUnaryCategory;
exports.createConstantConditionCategory = createConstantConditionCategory;
exports.createConstantFoldingCategory = createConstantFoldingCategory;
exports.createSelfCancellationCategory = createSelfCancellationCategory;
exports.createSelfDivisionCategory = createSelfDivisionCategory;
exports.createDivisionByZeroCategory = createDivisionByZeroCategory;
const bc_minecraft_molang_1 = require("bc-minecraft-molang");
const types_1 = require("../../../types");
const operation_rules_1 = require("./operation-rules");
const template_1 = require("./template");
const util_1 = require("./util");
/**
 * Default optimization rules for Molang expressions
 * This file contains the built-in optimization rules, but developers can easily add more
 * by creating new categories and rules following the same pattern.
 */
/**
 * Creates Identity Operation Rules
 * Detects operations that have no effect (e.g., +0, *1, /1)
 */
function createIdentityOperationsCategory() {
    return {
        name: 'Identity Operations',
        description: 'Detects mathematical operations that have no effect and can be removed',
        rules: [
            ...(0, template_1.createBinaryLeftOrRightLiteralRules)('+', '0', 'molang.optimization.identity-operation', (node, side) => {
                const otherSide = side === 'left' ? node.right : node.left;
                const replacement = bc_minecraft_molang_1.ExpressionNode.toString(otherSide);
                return {
                    message: `addition with 0 has no effect, replace with ${replacement}`,
                    replacement,
                };
            }),
            (0, template_1.createBinaryRightLiteralRule)('-', '0', 'molang.optimization.identity-operation', (node) => {
                const replacement = bc_minecraft_molang_1.ExpressionNode.toString(node.left);
                return {
                    message: `subtraction with 0 has no effect, replace with ${replacement}`,
                    replacement,
                };
            }),
            ...(0, template_1.createBinaryLeftOrRightLiteralRules)('*', '1', 'molang.optimization.identity-operation', (node, side) => {
                const otherSide = side === 'left' ? node.right : node.left;
                const replacement = bc_minecraft_molang_1.ExpressionNode.toString(otherSide);
                return {
                    message: `multiplication by 1 has no effect, replace with ${replacement}`,
                    replacement,
                };
            }),
            (0, template_1.createBinaryRightLiteralRule)('/', '1', 'molang.optimization.identity-operation', (node) => {
                const replacement = bc_minecraft_molang_1.ExpressionNode.toString(node.left);
                return {
                    message: `division by 1 has no effect, replace with ${replacement}`,
                    replacement,
                };
            }),
        ],
    };
}
function createSimplifyOperationsCategory() {
    return {
        name: 'Identity Operations',
        description: 'Detects mathematical operations that have no effect and can be removed',
        rules: [
            ...(0, template_1.createBinaryLeftOrRightLiteralRules)('+', '0', 'molang.optimization.identity-operation', (node, side) => {
                const otherSide = side === 'left' ? node.right : node.left;
                const replacement = bc_minecraft_molang_1.ExpressionNode.toString(otherSide);
                return {
                    message: `addition with 0 has no effect, replace with ${replacement}`,
                    replacement,
                };
            }),
            (0, template_1.createBinaryRightLiteralRule)('-', '0', 'molang.optimization.identity-operation', (node) => {
                const replacement = bc_minecraft_molang_1.ExpressionNode.toString(node.left);
                return {
                    message: `subtraction with 0 has no effect, replace with ${replacement}`,
                    replacement,
                };
            }),
            ...(0, template_1.createBinaryLeftOrRightLiteralRules)('*', '1', 'molang.optimization.identity-operation', (node, side) => {
                const otherSide = side === 'left' ? node.right : node.left;
                const replacement = bc_minecraft_molang_1.ExpressionNode.toString(otherSide);
                return {
                    message: `multiplication by 1 has no effect, replace with ${replacement}`,
                    replacement,
                };
            }),
            (0, template_1.createBinaryRightLiteralRule)('/', '1', 'molang.optimization.identity-operation', (node) => {
                const replacement = bc_minecraft_molang_1.ExpressionNode.toString(node.left);
                return {
                    message: `division by 1 has no effect, replace with ${replacement}`,
                    replacement,
                };
            }),
        ],
    };
}
/**
 * Creates Constant Result Rules
 * Detects operations that always produce the same result (e.g., *0)
 */
function createConstantResultCategory() {
    return {
        name: 'Constant Result',
        description: 'Detects operations that always produce a constant result',
        rules: [
            (0, template_1.createBinaryRightLiteralRule)('*', '0', 'molang.optimization.constant-result', 'multiplication by 0 always results in 0'),
            (0, template_1.createBinaryLeftLiteralRule)('*', '0', 'molang.optimization.constant-result', 'multiplication by 0 always results in 0'),
            (0, template_1.createBinaryBothLiteralRule)('molang.optimization.constant-result', types_1.DiagnosticSeverity.info, tryOpNumber),
            (0, template_1.createBinaryBothLiteralRule)('molang.optimization.constant-result', types_1.DiagnosticSeverity.info, tryOpBoolean),
        ],
    };
}
function tryOpNumber(op, a, b) {
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
    }
    catch {
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
    }
    catch {
        // Ignore errors
    }
    return undefined;
}
function tryOpBoolean(op, a, b) {
    function toBoolean(value) {
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
function createRedundantComparisonCategory() {
    return {
        name: 'Redundant Boolean Comparisons',
        description: 'Detects comparisons with boolean values that can be simplified',
        rules: [
            {
                code: 'molang.optimization.redundant-comparison',
                name: 'Redundant boolean comparison',
                severity: types_1.DiagnosticSeverity.info,
                getOptimizations(node) {
                    if (!bc_minecraft_molang_1.BinaryOperationNode.is(node))
                        return null;
                    if (node.operator !== '==' && node.operator !== '!=')
                        return null;
                    // Check if exactly one operand is a boolean literal (XOR)
                    const leftIsBoolean = (0, util_1.isBooleanLiteral)(node.left);
                    const rightIsBoolean = (0, util_1.isBooleanLiteral)(node.right);
                    // Skip if both operands have same boolean status - need exactly one boolean literal
                    if (leftIsBoolean === rightIsBoolean)
                        return null;
                    const boolNode = leftIsBoolean ? node.left : node.right;
                    const otherSide = leftIsBoolean ? 'right' : 'left';
                    const value = (0, util_1.getLiteralValue)(boolNode)?.toLowerCase();
                    const shouldNegate = (node.operator === '==' && value === 'false') || (node.operator === '!=' && value === 'true');
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
function createDoubleNegationCategory() {
    return {
        name: 'Double Negation',
        description: 'Detects double negation that can be simplified',
        rules: [
            {
                code: 'molang.optimization.double-negation',
                name: 'Double negation',
                severity: types_1.DiagnosticSeverity.info,
                getOptimizations(node) {
                    if (!bc_minecraft_molang_1.UnaryOperationNode.is(node))
                        return null;
                    if (!bc_minecraft_molang_1.UnaryOperationNode.is(node.operand))
                        return null;
                    if (node.operand.operator !== '!')
                        return null;
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
function createRedundantUnaryCategory() {
    return {
        name: 'Redundant Unary Operators',
        description: 'Detects unary operators that have no effect',
        rules: [
            {
                code: 'molang.optimization.redundant-unary',
                name: 'Redundant unary plus',
                severity: types_1.DiagnosticSeverity.info,
                getOptimizations(node) {
                    if (!bc_minecraft_molang_1.UnaryOperationNode.is(node))
                        return null;
                    if (node.operator !== '+')
                        return null;
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
function createConstantConditionCategory() {
    return {
        name: 'Constant Conditions',
        description: 'Detects conditional expressions with constant conditions that can be simplified',
        rules: [
            {
                code: 'molang.optimization.constant-condition',
                name: 'Constant condition in ternary',
                severity: types_1.DiagnosticSeverity.info,
                getOptimizations(node) {
                    if (!bc_minecraft_molang_1.ConditionalNode.is(node))
                        return null;
                    const value = (0, util_1.getLiteralValue)(node.condition)?.toLowerCase();
                    if (value === undefined)
                        return null;
                    // Check for boolean literals
                    if (value === 'true' || value === 'false') {
                        const branch = value === 'false' ? 'false' : 'true';
                        return {
                            message: `conditional has constant condition, can be replaced with ${branch} branch`,
                        };
                    }
                    // Check for numeric literals (0 is falsy, any non-zero number is truthy)
                    const num = Number(value);
                    if (!isNaN(num)) {
                        const branch = num === 0 ? 'false' : 'true';
                        return {
                            message: `conditional has constant condition, can be replaced with ${branch} branch`,
                        };
                    }
                    return null;
                },
            },
        ],
    };
}
/**
 * Creates Constant Folding Rules
 * Detects when two constant values can be pre-calculated
 */
function createConstantFoldingCategory() {
    return {
        name: 'Constant Folding',
        description: 'Detects constant expressions that can be pre-calculated at author time',
        rules: [
            {
                code: 'molang.optimization.constant-folding',
                name: 'Optimize constant expression',
                severity: types_1.DiagnosticSeverity.info,
                getOptimizations(node) {
                    if (!bc_minecraft_molang_1.BinaryOperationNode.is(node))
                        return null;
                    // Make a copy so we can modify it
                    return (0, operation_rules_1.optimizeOperation)(node);
                },
            },
            {
                code: 'molang.optimization.constant-folding',
                name: 'Optimize unary expression',
                severity: types_1.DiagnosticSeverity.info,
                getOptimizations(node) {
                    if (!bc_minecraft_molang_1.UnaryOperationNode.is(node))
                        return null;
                    if (!bc_minecraft_molang_1.LiteralNode.is(node.operand))
                        return null;
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
/**
 * Creates Self-Cancellation Rules
 * Detects when an expression is subtracted from itself (x - x = 0)
 */
function createSelfCancellationCategory() {
    return {
        name: 'Self-Cancellation',
        description: 'Detects when an expression is subtracted from itself, which always results in 0',
        rules: [
            {
                code: 'molang.optimization.self-cancellation',
                name: 'Self-cancellation',
                severity: types_1.DiagnosticSeverity.info,
                getOptimizations(node) {
                    if (!bc_minecraft_molang_1.BinaryOperationNode.is(node))
                        return null;
                    if (node.operator !== '-')
                        return null;
                    const left = bc_minecraft_molang_1.ExpressionNode.toString(node.left);
                    const right = bc_minecraft_molang_1.ExpressionNode.toString(node.right);
                    if (left !== right)
                        return null;
                    return {
                        message: 'subtracting an expression from itself always results in 0',
                        replacement: '0',
                    };
                },
            },
        ],
    };
}
/**
 * Creates Self-Division Rules
 * Detects when an expression is divided by itself (x / x = 1)
 */
function createSelfDivisionCategory() {
    return {
        name: 'Self-Division',
        description: 'Detects when an expression is divided by itself, which always results in 1',
        rules: [
            {
                code: 'molang.optimization.self-division',
                name: 'Self-division',
                severity: types_1.DiagnosticSeverity.info,
                getOptimizations(node) {
                    if (!bc_minecraft_molang_1.BinaryOperationNode.is(node))
                        return null;
                    if (node.operator !== '/')
                        return null;
                    const left = bc_minecraft_molang_1.ExpressionNode.toString(node.left);
                    const right = bc_minecraft_molang_1.ExpressionNode.toString(node.right);
                    if (left !== right)
                        return null;
                    return {
                        message: 'dividing an expression by itself always results in 1 (assuming the expression is non-zero)',
                        replacement: '1',
                    };
                },
            },
        ],
    };
}
/**
 * Creates Division by Zero Rules
 * Detects when an expression is divided by the literal 0
 */
function createDivisionByZeroCategory() {
    return {
        name: 'Division by Zero',
        description: 'Detects division by zero which will produce unexpected results',
        rules: [
            (0, template_1.createBinaryRightLiteralRule)('/', '0', 'molang.optimization.division-by-zero', 'division by zero will produce unexpected results', types_1.DiagnosticSeverity.warning),
        ],
    };
}
//# sourceMappingURL=rules.js.map