import { assert } from 'console';
import { SyntaxBuilder } from './builder';
import { MolangSyntaxError } from './errors';
import { ExpressionNode, NodeType, StatementSequenceNode } from './nodes';
import { TokenType } from './tokens';

export function processOperators(builder: SyntaxBuilder) {
  if (builder.hasOperator('??')) processNullishCoalescing(builder); // ??

  // Process unary operators (highest precedence)
  processUnaryOperators(builder); // ?, !, return or -u

  ifOperator(builder, '==');
  ifOperator(builder, '!=');
  ifOperator(builder, '<');
  ifOperator(builder, '<=');
  ifOperator(builder, '>');
  ifOperator(builder, '>=');

  ifOperator(builder, '||');
  ifOperator(builder, '&&');

  ifOperator(builder, '*');
  ifOperator(builder, '/');
  ifOperator(builder, '%');
  ifOperator(builder, '+');
  ifOperator(builder, '-');

  if (builder.hasOperator('?')) processTernaryOperators(builder); // <cond> ? <true> : <false>

  // Process assignments last (right-to-left associativity)
  processAssignments(builder); // =
}

export interface Processed {
  _processed: boolean;
}

export namespace Processed {
  export function withValue<T extends object>(obj: T, value: boolean) {
    (obj as T & Processed)._processed = value;
  }

  /** */
  export function shouldSkip<T extends object>(obj: T) {
    return (obj as T & Partial<Processed>)?._processed === true;
  }
}

function ifOperator(builder: SyntaxBuilder, operator: string) {
  if (builder.hasOperator(operator)) processBinaryOperators(builder, operator);
}

function processNullishCoalescing(builder: SyntaxBuilder) {
  const statements = builder.result.statements;

  for (let i = 0; i < statements.length; i++) {
    const current = statements[i];

    if (current.type !== NodeType.NullishCoalescing) continue;
    // Has this node already been processed?
    if (Processed.shouldSkip(current)) continue;
    Processed.withValue(current, true);

    // Find left operand
    if (i === 0) {
      throw new MolangSyntaxError('Nullish coalescing operator missing left operand', current.position, '??');
    }
    // Find right operand
    if (i === statements.length - 1) {
      throw new MolangSyntaxError('Nullish coalescing operator missing right operand', current.position, '??');
    }

    // Update the nullish coalescing node
    current.left = statements[i - 1];
    current.right = statements[i + 1];

    // Remove the operands from the statements array
    builder.result.statements.splice(i - 1, 3, current);

    // Adjust index since we removed elements
    i -= 1;
  }
}

function processBinaryOperators(builder: SyntaxBuilder, operator: string) {
  const statements = builder.result.statements;

  for (let i = 0; i < statements.length; i++) {
    const current = statements[i];

    if (current.type === NodeType.BinaryOperation && current.operator === operator) {
      // Has this node already been processed?
      if (Processed.shouldSkip(current)) continue;
      Processed.withValue(current, true);

      // Find left operand
      if (i === 0) {
        throw new MolangSyntaxError(`Binary operator '${operator}' missing left operand`, current.position, operator);
      }
      // Find right operand
      if (i === statements.length - 1) {
        throw new MolangSyntaxError(`Binary operator '${operator}' missing right operand`, current.position, operator);
      }

      // Update the binary operation node
      current.left = statements[i - 1];
      current.right = statements[i + 1];

      // Remove the operands from the statements array
      builder.result.statements.splice(i - 1, 3, current);

      // Adjust index since we removed elements
      i -= 1;
    }
  }
}

function processTernaryOperators(builder: SyntaxBuilder) {
  const statements = builder.result.statements;

  for (let i = statements.length - 1; i >= 0; i--) {
    const current = statements[i];
    if (current.type !== NodeType.Conditional) continue;
    // Has this node already been processed?
    if (Processed.shouldSkip(current)) continue;
    Processed.withValue(current, true);

    // Find condition (left operand)
    if (i === 0) {
      throw new MolangSyntaxError('Ternary operator missing condition', current.position, '?');
    }

    const startIndex = i - 1;
    let endIndex = startIndex;
    const condition = statements[startIndex];

    // Find the colon marker and expressions
    let colonIndex = -1;
    let trueExpr: ExpressionNode | null = null;
    let falseExpr: ExpressionNode | null = null;

    // Look for the pattern: condition ? trueExpr : falseExpr
    for (let j = i + 1; j < statements.length; j++) {
      const stmt = statements[j];
      if (stmt.type === NodeType.Marker && stmt.token.type === TokenType.Colon) {
        colonIndex = j;
        endIndex = Math.max(endIndex, j);
        break;
      }
    }

    if (colonIndex === -1) {
      throw new MolangSyntaxError('Ternary operator missing colon', current.position, '?');
    }

    // Extract true and false expressions
    if (i + 1 < colonIndex) {
      // If there are statements between ? and :, they form the true expression
      trueExpr = wrapIf(statements.slice(i + 1, colonIndex));
    }
    if (colonIndex + 1 < statements.length) {
      falseExpr = statements[colonIndex + 1];
      endIndex = Math.max(endIndex, colonIndex + 1);
    }

    if (!trueExpr) {
      throw new MolangSyntaxError('Ternary operator missing true expression', current.position, '?');
    }
    if (!falseExpr) {
      throw new MolangSyntaxError('Ternary operator missing false expression', current.position, '?');
    }

    // Update the conditional expression node
    current.condition = condition;
    current.trueExpression = trueExpr;
    current.falseExpression = falseExpr;

    // Remove all the processed elements and replace with the complete ternary
    const elementsToRemove = endIndex - startIndex; // condition + ? + trueExpr + : + falseExpr
    builder.result.statements.splice(startIndex, elementsToRemove + 1, current);
  }
}

function processAssignments(builder: SyntaxBuilder) {
  const statements = builder.result.statements;

  if (statements.length === 3 && statements[1].type === NodeType.Assignment) {
    // Has this node already been processed?
    if (Processed.shouldSkip(statements[1])) return;
    Processed.withValue(statements[1], true);

    // Update the assignment node
    const n = statements[1];
    n.left = statements[0];
    n.right = statements[2];
    builder.result.statements = [n];
    return;
  }

  // Process right-to-left for right associativity
  for (let i = statements.length - 1; i >= 0; i--) {
    const current = statements[i];

    if (current.type !== NodeType.Assignment) continue;
    // Has this node already been processed?
    if (Processed.shouldSkip(current)) continue;
    Processed.withValue(current, true);

    // Find left operand
    if (i === 0) {
      throw new MolangSyntaxError('Assignment operator missing left operand', current.position, '=');
    }
    // Find right operand
    if (i === statements.length - 1) {
      throw new MolangSyntaxError('Assignment operator missing right operand', current.position, '=');
    }

    // Update the assignment node
    current.left = wrapIf(statements.slice(0, i));
    current.right = wrapIf(statements.slice(i + 1));

    // Remove the operands from the statements array
    builder.result.statements = [current];
  }
}

/**
 * Expects that nodes will have length 1 or more
 * @param nodes
 * @returns
 */
function wrapIf(nodes: ExpressionNode[]): ExpressionNode {
  assert(nodes.length >= 1, 'expected contents to the node');
  if (nodes.length === 1) return nodes[0];

  return StatementSequenceNode.create({
    position: nodes[0].position ?? -1,
    statements: nodes,
  });
}

/**
 * ?, !, return and -u
 */
function processUnaryOperators(builder: SyntaxBuilder) {
  const statements = builder.result.statements;

  for (let i = 0; i < statements.length; i++) {
    const current = statements[i];
    if (current.type !== NodeType.UnaryOperation) continue;
    // Has this node already been processed?
    if (Processed.shouldSkip(current)) continue;
    Processed.withValue(current, true);

    // Find operand (should be to the right for prefix operators)
    if (i === statements.length - 1) {
      throw new MolangSyntaxError(
        `Unary operator '${current.operator}' missing operand`,
        current.position,
        current.operator,
      );
    }
    // Update the unary operation node
    current.operand = statements[i + 1];

    // Remove the operand from the statements array
    builder.result.statements.splice(i + 1, 1);
  }
}
