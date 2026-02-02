import { BinaryOperationNode, ExpressionNode, NodeType } from 'bc-minecraft-molang';
import { Optimization } from './framework';

type Op = '+' | '-' | '*' | '/' | '==' | '!=' | '<' | '>' | '<=' | '>=' | '&&' | '||';

enum types {
  Operation,
  Value,
  Reference,
}

interface TOp {
  type: types.Operation;
  op: Op;
  args: (TOp | TValue | TRef)[];
}

interface TValue {
  type: types.Value;
  value: number | boolean;
}

interface TRef {
  type: types.Reference;
  ref: ExpressionNode;
}

export function optimizeOperation(node: BinaryOperationNode): Optimization | null {
  const n: TOp = {
    type: types.Operation,
    op: node.operator as Op,
    args: [toNode(node.left), toNode(node.right)],
  };
  
  // Run multiple optimization passes until no changes occur
  let changed = false;
  let iterations = 0;
  const maxIterations = 10;
  
  do {
    changed = false;
    changed ||= hoistUp(n);
    changed ||= constantFold(n);
    changed ||= applyIdentityRules(n);
    iterations++;
  } while (changed && iterations < maxIterations);
  
  // Early exit if no optimizations were made
  if (iterations === 1 && !changed) {
    return null;
  }
  
  // Only build strings after all optimization passes complete
  const original = ExpressionNode.toString(node);
  const optimized = toString(n);
  
  // Return null if the strings are identical
  if (original === optimized) {
    return null;
  }

  return {
    message: `Can rewrite the operation to: \n  original: ${original}\n  rewrite: ${optimized}`,
  };
}

function toString(node: TOp | TValue | TRef): string {
  switch (node.type) {
    case types.Operation:
      return `(${node.args.map(toString).join(` ${node.op} `)})`;
    case types.Value:
      return typeof node.value === 'boolean' ? (node.value ? 'true' : 'false') : node.value.toString();
    case types.Reference:
      return ExpressionNode.toString(node.ref);
  }
}

// Hoists up nested operations of the same type
function hoistUp(n: TOp): boolean {
  let changed = false;
  
  for (let i = 0; i < n.args.length; i++) {
    const arg = n.args[i];
    if (arg.type !== types.Operation) continue;
    if (arg.op === n.op && (n.op === '+' || n.op === '*')) {
      n.args.splice(i, 1, ...arg.args);
      i--;
      changed = true;
    } else {
      changed ||= hoistUp(arg);
    }
  }
  
  return changed;
}

function constantFold(n: TOp): boolean {
  let changed = false;

  switch (n.op) {
    case '+': // Constant folding for addition
      let result = 0;
      const constants = n.args.filter(
        (x): x is TValue & { value: number } => x.type === types.Value && typeof x.value === 'number',
      );
      if (constants.length < 2) break; // Need at least two constants to fold

      for (const c of constants) {
        result += c.value;
      }

      n.args = n.args.filter((x) => !(x.type === types.Value && typeof x.value === 'number'));
      n.args.push({ type: types.Value, value: result });
      changed = true;
      break;
    case '*': // Constant folding for multiplication
      let prod = 1;
      const mulConstants = n.args.filter(
        (x): x is TValue & { value: number } => x.type === types.Value && typeof x.value === 'number',
      );
      if (mulConstants.length < 2) break; // Need at least two constants to fold
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
        if (n.op === '/' && right === 0) break;
        const calcResult = n.op === '-' ? left - right : left / right;
        n.args = [{ type: types.Value, value: calcResult }];
        changed = true;
      }
      break;
  }

  for (let i = 0; i < n.args.length; i++) {
    const arg = n.args[i];
    if (arg.type !== types.Operation) continue;
    changed ||= constantFold(arg);
  }

  return changed;
}

function applyIdentityRules(n: TOp): boolean {
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
        const nonZeros = n.args.filter(
          (arg) => !(arg.type === types.Value && typeof arg.value === 'number' && arg.value === 0),
        );
        if (nonZeros.length < n.args.length) {
          n.args = nonZeros;
          changed = true;
        }
      }
      break;

    case '-': // Subtraction: x - 0 = x (only right operand)
      if (
        n.args.length === 2 &&
        n.args[1].type === types.Value &&
        typeof n.args[1].value === 'number' &&
        n.args[1].value === 0
      ) {
        n.args = [n.args[0]];
        changed = true;
      }
      break;

    case '*': // Multiplication: x * 0 = 0, x * 1 = x
      {
        // Check for zeros - if any operand is zero, entire expression is zero
        const hasZero = n.args.some(
          (arg) => arg.type === types.Value && typeof arg.value === 'number' && arg.value === 0,
        );
        if (hasZero) {
          n.args = [{ type: types.Value, value: 0 }];
          changed = true;
          break;
        }

        // Remove ones
        const nonOnes = n.args.filter(
          (arg) => !(arg.type === types.Value && typeof arg.value === 'number' && arg.value === 1),
        );
        if (nonOnes.length < n.args.length) {
          n.args = nonOnes;
          changed = true;
        }
      }
      break;

    case '/': // Division: 0 / x = 0, x / 1 = x
      if (n.args.length === 2) {
        // 0 / x = 0 (if divisor is not zero)
        if (
          n.args[0].type === types.Value &&
          typeof n.args[0].value === 'number' &&
          n.args[0].value === 0 &&
          !(n.args[1].type === types.Value && typeof n.args[1].value === 'number' && n.args[1].value === 0)
        ) {
          n.args = [{ type: types.Value, value: 0 }];
          changed = true;
          break;
        }

        // x / 1 = x
        if (
          n.args[1].type === types.Value &&
          typeof n.args[1].value === 'number' &&
          n.args[1].value === 1
        ) {
          n.args = [n.args[0]];
          changed = true;
        }
      }
      break;

    case '&&': // Logical AND: x && false = false, x && true = x
      {
        // Check for false - if any operand is false, entire expression is false
        const hasFalse = n.args.some(
          (arg) => arg.type === types.Value && typeof arg.value === 'boolean' && arg.value === false,
        );
        if (hasFalse) {
          n.args = [{ type: types.Value, value: false }];
          changed = true;
          break;
        }

        // Remove true values
        const nonTrues = n.args.filter(
          (arg) => !(arg.type === types.Value && typeof arg.value === 'boolean' && arg.value === true),
        );
        if (nonTrues.length < n.args.length) {
          n.args = nonTrues;
          changed = true;
        }
      }
      break;

    case '||': // Logical OR: x || true = true, x || false = x
      {
        // Check for true - if any operand is true, entire expression is true
        const hasTrue = n.args.some(
          (arg) => arg.type === types.Value && typeof arg.value === 'boolean' && arg.value === true,
        );
        if (hasTrue) {
          n.args = [{ type: types.Value, value: true }];
          changed = true;
          break;
        }

        // Remove false values
        const nonFalses = n.args.filter(
          (arg) => !(arg.type === types.Value && typeof arg.value === 'boolean' && arg.value === false),
        );
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

function toNode(node: ExpressionNode): TOp | TValue | TRef {
  switch (node.type) {
    default:
    case NodeType.ArrayAccess:
    case NodeType.Assignment:
    case NodeType.Conditional:
    case NodeType.FunctionCall:
    case NodeType.StringLiteral:
    case NodeType.Marker:
    case NodeType.NullishCoalescing:
    case NodeType.ResourceReference:
    case NodeType.StatementSequence:
    case NodeType.UnaryOperation:
    case NodeType.Variable:
      break;

    case NodeType.BinaryOperation:
      return {
        type: types.Operation,
        op: node.operator as Op,
        args: [toNode(node.left), toNode(node.right)],
      };

    case NodeType.Literal:
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
