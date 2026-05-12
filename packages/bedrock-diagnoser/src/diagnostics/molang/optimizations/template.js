"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBinaryRightLiteralRule = createBinaryRightLiteralRule;
exports.createBinaryLeftLiteralRule = createBinaryLeftLiteralRule;
exports.createBinaryLeftOrRightLiteralRules = createBinaryLeftOrRightLiteralRules;
exports.createBinaryBothLiteralRule = createBinaryBothLiteralRule;
const bc_minecraft_molang_1 = require("bc-minecraft-molang");
const types_1 = require("../../../types");
const util_1 = require("./util");
/**
 * Creates a rule for checking binary operations with a specific operator and literal value on the right
 */
function createBinaryRightLiteralRule(operator, literalValue, code, message, severity = types_1.DiagnosticSeverity.info) {
    return {
        code,
        name: `${operator} with ${literalValue} on right`,
        severity,
        getOptimizations(node) {
            if (!bc_minecraft_molang_1.BinaryOperationNode.is(node))
                return null;
            if (node.operator === operator && (0, util_1.isLiteralValue)(node.right, literalValue)) {
                if (typeof message === 'string') {
                    return { message };
                }
                const result = message(node);
                return typeof result === 'string' ? { message: result } : result;
            }
            return null;
        },
    };
}
/**
 * Creates a rule for checking binary operations with a specific operator and literal value on the left
 */
function createBinaryLeftLiteralRule(operator, literalValue, code, message, severity = types_1.DiagnosticSeverity.info) {
    return {
        code,
        name: `${operator} with ${literalValue} on left`,
        severity,
        getOptimizations(node) {
            if (!bc_minecraft_molang_1.BinaryOperationNode.is(node))
                return null;
            if (node.operator === operator && (0, util_1.isLiteralValue)(node.left, literalValue)) {
                if (typeof message === 'string') {
                    return { message };
                }
                const result = message(node);
                return typeof result === 'string' ? { message: result } : result;
            }
            return null;
        },
    };
}
/**
 * Creates rules for checking binary operations with a specific operator and literal value on either side
 * This helper reduces duplication by creating both left and right rules at once
 */
function createBinaryLeftOrRightLiteralRules(operator, literalValue, code, messageTemplate, severity = types_1.DiagnosticSeverity.info) {
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
function createBinaryBothLiteralRule(code, severity, optimize) {
    return {
        code,
        name: `Operators with literals on both sides`,
        severity,
        getOptimizations(node) {
            if (!bc_minecraft_molang_1.BinaryOperationNode.is(node))
                return null;
            if (!bc_minecraft_molang_1.LiteralNode.is(node.left))
                return null;
            if (!bc_minecraft_molang_1.LiteralNode.is(node.right))
                return null;
            const newValue = optimize(node.operator, node.left.value, node.right.value);
            if (newValue !== undefined) {
                return {
                    message: `Both sides of the '${node.operator}' operation are literals and can be pre-calculated to '${newValue}'`,
                    replacement: newValue,
                };
            }
            return null;
        },
    };
}
//# sourceMappingURL=template.js.map