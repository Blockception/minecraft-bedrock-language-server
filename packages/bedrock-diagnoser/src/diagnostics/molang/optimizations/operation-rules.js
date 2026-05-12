"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.optimizeOperation = optimizeOperation;
const bc_minecraft_molang_1 = require("bc-minecraft-molang");
var types;
(function (types) {
    types[types["Operation"] = 0] = "Operation";
    types[types["Value"] = 1] = "Value";
    types[types["Reference"] = 2] = "Reference";
})(types || (types = {}));
function optimizeOperation(node) {
    const n = {
        type: types.Operation,
        op: node.operator,
        args: [toNode(node.left), toNode(node.right)],
    };
    // Run multiple optimization passes until no changes occur
    let changed;
    let iterations = 0;
    const maxIterations = 10;
    let realOptimizationHappened = false;
    do {
        changed = false;
        changed ||= hoistUp(n);
        const folded = constantFold(n);
        const simplified = applyIdentityRules(n);
        changed ||= folded || simplified;
        if (folded || simplified)
            realOptimizationHappened = true;
        iterations++;
    } while (changed && iterations < maxIterations);
    // Early exit if no real optimizations were made (hoistUp alone is not an optimization)
    if (!realOptimizationHappened) {
        return null;
    }
    // Only build strings after all optimization passes complete
    const original = bc_minecraft_molang_1.ExpressionNode.toString(node);
    const optimized = toString(n);
    // Return null if the strings are identical
    if (original === optimized) {
        return null;
    }
    return {
        message: `Can rewrite the operation to: \n  original: ${original}\n  rewrite: ${optimized}`,
        replacement: optimized,
    };
}
function toString(node) {
    switch (node.type) {
        case types.Operation:
            return `(${node.args.map(toString).join(` ${node.op} `)})`;
        case types.Value:
            return typeof node.value === 'boolean' ? (node.value ? 'true' : 'false') : node.value.toString();
        case types.Reference:
            return bc_minecraft_molang_1.ExpressionNode.toString(node.ref);
    }
}
// Hoists up nested operations of the same type
function hoistUp(n) {
    let changed = false;
    for (let i = 0; i < n.args.length; i++) {
        const arg = n.args[i];
        if (arg.type !== types.Operation)
            continue;
        if (arg.op === n.op && (n.op === '+' || n.op === '*')) {
            n.args.splice(i, 1, ...arg.args);
            i--;
            changed = true;
        }
        else {
            changed ||= hoistUp(arg);
        }
    }
    return changed;
}
function constantFold(n) {
    let changed = false;
    switch (n.op) {
        case '+': // Constant folding for addition
            let result = 0;
            const constants = n.args.filter((x) => x.type === types.Value && typeof x.value === 'number');
            if (constants.length < 2)
                break; // Need at least two constants to fold
            for (const c of constants) {
                result += c.value;
            }
            n.args = n.args.filter((x) => !(x.type === types.Value && typeof x.value === 'number'));
            n.args.push({ type: types.Value, value: result });
            changed = true;
            break;
        case '*': // Constant folding for multiplication
            let prod = 1;
            const mulConstants = n.args.filter((x) => x.type === types.Value && typeof x.value === 'number');
            if (mulConstants.length < 2)
                break; // Need at least two constants to fold
            for (const c of mulConstants) {
                prod *= c.value;
            }
            n.args = n.args.filter((x) => !(x.type === types.Value && typeof x.value === 'number'));
            n.args.push({ type: types.Value, value: prod });
            changed = true;
            break;
        case '-': // Constant folding for subtraction
        case '/': // Constant folding for division
            // For binary operations that don't commute, check if both operands are constants
            if (n.args.length === 2 &&
                n.args[0].type === types.Value && typeof n.args[0].value === 'number' &&
                n.args[1].type === types.Value && typeof n.args[1].value === 'number') {
                const left = n.args[0].value;
                const right = n.args[1].value;
                // Prevent division by zero
                if (n.op === '/' && right === 0)
                    break;
                const calcResult = n.op === '-' ? left - right : left / right;
                n.args = [{ type: types.Value, value: calcResult }];
                changed = true;
            }
            break;
    }
    for (let i = 0; i < n.args.length; i++) {
        const arg = n.args[i];
        if (arg.type !== types.Operation)
            continue;
        changed ||= constantFold(arg);
    }
    return changed;
}
function applyIdentityRules(n) {
    let changed = false;
    // First recursively apply to child operations
    for (let i = 0; i < n.args.length; i++) {
        const arg = n.args[i];
        if (arg.type === types.Operation) {
            changed ||= applyIdentityRules(arg);
        }
    }
    // Then apply identity rules to this operation
    switch (n.op) {
        case '+': // Addition: x + 0 = x
            {
                const nonZeros = n.args.filter((arg) => !(arg.type === types.Value && typeof arg.value === 'number' && arg.value === 0));
                if (nonZeros.length < n.args.length) {
                    n.args = nonZeros;
                    changed = true;
                }
            }
            break;
        case '-': // Subtraction: x - 0 = x (only right operand)
            if (n.args.length === 2 &&
                n.args[1].type === types.Value &&
                typeof n.args[1].value === 'number' &&
                n.args[1].value === 0) {
                n.args = [n.args[0]];
                changed = true;
            }
            break;
        case '*': // Multiplication: x * 0 = 0, x * 1 = x
            {
                // Check for zeros - if any operand is zero, entire expression is zero
                const hasZero = n.args.some((arg) => arg.type === types.Value && typeof arg.value === 'number' && arg.value === 0);
                if (hasZero) {
                    n.args = [{ type: types.Value, value: 0 }];
                    changed = true;
                    break;
                }
                // Remove ones
                const nonOnes = n.args.filter((arg) => !(arg.type === types.Value && typeof arg.value === 'number' && arg.value === 1));
                if (nonOnes.length < n.args.length) {
                    n.args = nonOnes;
                    changed = true;
                }
            }
            break;
        case '/': // Division: 0 / x = 0, x / 1 = x
            if (n.args.length === 2) {
                // 0 / x = 0 (if divisor is not zero)
                if (n.args[0].type === types.Value &&
                    typeof n.args[0].value === 'number' &&
                    n.args[0].value === 0 &&
                    !(n.args[1].type === types.Value && typeof n.args[1].value === 'number' && n.args[1].value === 0)) {
                    n.args = [{ type: types.Value, value: 0 }];
                    changed = true;
                    break;
                }
                // x / 1 = x
                if (n.args[1].type === types.Value &&
                    typeof n.args[1].value === 'number' &&
                    n.args[1].value === 1) {
                    n.args = [n.args[0]];
                    changed = true;
                }
            }
            break;
        case '&&': // Logical AND: x && false = false, x && true = x
            {
                // Check for false - if any operand is false, entire expression is false
                const hasFalse = n.args.some((arg) => arg.type === types.Value && typeof arg.value === 'boolean' && arg.value === false);
                if (hasFalse) {
                    n.args = [{ type: types.Value, value: false }];
                    changed = true;
                    break;
                }
                // Remove true values
                const nonTrues = n.args.filter((arg) => !(arg.type === types.Value && typeof arg.value === 'boolean' && arg.value === true));
                if (nonTrues.length < n.args.length) {
                    n.args = nonTrues;
                    changed = true;
                }
            }
            break;
        case '||': // Logical OR: x || true = true, x || false = x
            {
                // Check for true - if any operand is true, entire expression is true
                const hasTrue = n.args.some((arg) => arg.type === types.Value && typeof arg.value === 'boolean' && arg.value === true);
                if (hasTrue) {
                    n.args = [{ type: types.Value, value: true }];
                    changed = true;
                    break;
                }
                // Remove false values
                const nonFalses = n.args.filter((arg) => !(arg.type === types.Value && typeof arg.value === 'boolean' && arg.value === false));
                if (nonFalses.length < n.args.length) {
                    n.args = nonFalses;
                    changed = true;
                }
            }
            break;
    }
    // If operation reduces to a single argument, collapse to that argument
    if (n.args.length === 1) {
        Object.assign(n, n.args[0]);
        changed = true;
    }
    return changed;
}
function toNode(node) {
    switch (node.type) {
        default:
        case bc_minecraft_molang_1.NodeType.ArrayAccess:
        case bc_minecraft_molang_1.NodeType.Assignment:
        case bc_minecraft_molang_1.NodeType.Conditional:
        case bc_minecraft_molang_1.NodeType.FunctionCall:
        case bc_minecraft_molang_1.NodeType.StringLiteral:
        case bc_minecraft_molang_1.NodeType.Marker:
        case bc_minecraft_molang_1.NodeType.NullishCoalescing:
        case bc_minecraft_molang_1.NodeType.ResourceReference:
        case bc_minecraft_molang_1.NodeType.StatementSequence:
        case bc_minecraft_molang_1.NodeType.UnaryOperation:
        case bc_minecraft_molang_1.NodeType.Variable:
            break;
        case bc_minecraft_molang_1.NodeType.BinaryOperation:
            return {
                type: types.Operation,
                op: node.operator,
                args: [toNode(node.left), toNode(node.right)],
            };
        case bc_minecraft_molang_1.NodeType.Literal:
            const v = node.value;
            switch (v.toLowerCase()) {
                case 'true':
                case 'false':
                    return { type: types.Value, value: v === 'true' };
                default:
                    const num = Number(v);
                    if (!isNaN(num)) {
                        return { type: types.Value, value: num };
                    }
            }
    }
    return {
        type: types.Reference,
        ref: node,
    };
}
//# sourceMappingURL=operation-rules.js.map