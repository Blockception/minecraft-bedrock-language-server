import { ExpressionNode, NodeType, StatementSequenceNode } from "./nodes";

export class SyntaxBuilder {
  result: StatementSequenceNode;
  /**
   * Operators is a list of operators in the current statements found, used for optimization.
   * Though false positives are possible as operators can be processed down into others.
   */
  operators: Record<string, boolean>;

  constructor(position: number) {
    this.operators = {};
    this.result = {
      type: NodeType.StatementSequence,
      statements: [],
      position: position,
    };
  }

  add<T extends ExpressionNode>(node: T): T {
    if (node) {
      this.recordOperatorUsage(node);

      this.result.statements.push(node);
    }
    return node;
  }

  recordOperatorUsage(node: ExpressionNode) {
    switch (node.type) {
      case NodeType.UnaryOperation:
      case NodeType.BinaryOperation:
        this.operators[node.operator] = true;
        return;
      case NodeType.NullishCoalescing:
        this.operators["??"] = true;
        return;
      case NodeType.Conditional:
        this.operators["?"] = true;
        return;
    }
  }

  hasOperator(op: string): boolean {
    return this.operators[op] === true;
  }

  remove<T extends ExpressionNode>(node: T) {
    this.result.statements = this.result.statements.filter((item) => item !== node);
  }
  replace<T extends ExpressionNode, U extends ExpressionNode>(original: T, newnode: U): U {
    this.result.statements.forEach((item, index, nodes) => {
      if (item === original) {
        nodes[index] = newnode;
      }
    });
    return newnode;
  }
  build(): ExpressionNode {
    if (this.result.statements.length === 1) return this.result.statements[0];

    return this.result;
  }
}
