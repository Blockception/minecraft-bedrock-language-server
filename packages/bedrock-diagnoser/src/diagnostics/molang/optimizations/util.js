"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isLiteralValue = isLiteralValue;
exports.isBooleanLiteral = isBooleanLiteral;
exports.getLiteralValue = getLiteralValue;
exports.hasTwoLiteralOperands = hasTwoLiteralOperands;
const bc_minecraft_molang_1 = require("bc-minecraft-molang");
/**
 * Checks if a node is a literal with a specific value
 */
function isLiteralValue(node, value) {
    if (!bc_minecraft_molang_1.LiteralNode.is(node))
        return false;
    return node.value === value;
}
/**
 * Checks if a node is a boolean literal (true/false)
 */
function isBooleanLiteral(node) {
    if (!bc_minecraft_molang_1.LiteralNode.is(node))
        return false;
    const value = node.value?.toLowerCase();
    return value === 'true' || value === 'false';
}
/**
 * Gets the value of a literal node
 */
function getLiteralValue(node) {
    return bc_minecraft_molang_1.LiteralNode.is(node) ? node.value : undefined;
}
/**
 * Checks if both operands of a binary operation are literals
 */
function hasTwoLiteralOperands(node) {
    if (!bc_minecraft_molang_1.BinaryOperationNode.is(node))
        return false;
    if (!bc_minecraft_molang_1.LiteralNode.is(node.left))
        return false;
    if (!bc_minecraft_molang_1.LiteralNode.is(node.right))
        return false;
    return true;
}
//# sourceMappingURL=util.js.map