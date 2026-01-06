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
  hoistUp(n);

  if (constantFold(n)) {
    return {
      message: `Can rewrite the operation to: \n  original: ${ExpressionNode.toString(node)}\n  rewrite: ${toString(n)}`,
    };
  }

  return null;
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
function hoistUp(n: TOp) {
  for (let i = 0; i < n.args.length; i++) {
    const arg = n.args[i];
    if (arg.type !== types.Operation) continue;
    if (arg.op === n.op && (n.op === '+' || n.op === '*')) {
      n.args.splice(i, 1, ...arg.args);
      i--;
    } else {
      hoistUp(arg);
    }
  }
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
