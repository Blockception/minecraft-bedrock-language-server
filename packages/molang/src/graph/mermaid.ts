import { ExpressionNode, NodeType } from '../molang/syntax/nodes';
import { TokenType } from '../molang/syntax/tokens';

interface MermaidOptions {
  direction?: 'TD' | 'TB' | 'BT' | 'RL' | 'LR';
  showPosition?: boolean;
  maxDepth?: number;
  compactMode?: boolean;
}

class MermaidDiagramBuilder {
  private nodeCounter = 0;
  private nodeMap = new Map<ExpressionNode, string>();
  private edges: string[];
  private nodes: string[];
  private options: Required<MermaidOptions>;

  constructor(options: MermaidOptions = {}) {
    this.nodes = ['start@{ shape: sm-circ, label: "Small start" }'];
    this.edges = ['start-->node0'];
    this.options = {
      direction: options.direction ?? 'TD',
      showPosition: options.showPosition ?? false,
      maxDepth: options.maxDepth ?? Infinity,
      compactMode: options.compactMode ?? false,
    };
  }

  /**
   * Generates a Mermaid flowchart diagram from an AST node
   */
  generateDiagram(rootNode: ExpressionNode): string {
    this.reset();
    this.processNode(rootNode, 0);

    const header = `---
config:
    theme: redux
---
flowchart ${this.options.direction}`;
    const nodeDefinitions = this.nodes.join('\n    ');
    const edgeDefinitions = this.edges.join('\n    ');

    return `${header}\n    ${nodeDefinitions}\n    ${edgeDefinitions}`;
  }

  private reset(): void {
    this.nodeCounter = 0;
    this.nodeMap.clear();
    this.nodes = ['start@{ shape: sm-circ, label: "Small start" }'];
    this.edges = ['start-->node0'];
  }

  private getNodeId(node: ExpressionNode): string {
    if (!this.nodeMap.has(node)) {
      this.nodeMap.set(node, `node${this.nodeCounter++}`);
    }
    return this.nodeMap.get(node)!;
  }

  private processNode(node: ExpressionNode, depth: number): string {
    if (depth > this.options.maxDepth) {
      return this.createLeafNode('...');
    }

    const nodeId = this.getNodeId(node);
    const nodeInfo = this.getNodeInfo(node);

    // Create node definition
    this.nodes.push(`${nodeId}${nodeInfo.shape}`);

    // Process children and create edges
    this.processChildren(node, nodeId, depth);

    return nodeId;
  }

  private getNodeInfo(node: ExpressionNode): { shape: string; label: string } {
    const position = this.options.showPosition ? `@${node.position}` : '';

    switch (node.type) {
      case NodeType.Assignment:
        return createNodeInfo(`{"=${position}"}`, '=');
      case NodeType.ArrayAccess:
        return createNodeInfo(`["[]${position}"]`, '[]');
      case NodeType.BinaryOperation:
        return createNodeInfo(`{"\\${node.operator}${position}"}`, `${node.operator}`);
      case NodeType.Conditional:
        return createNodeInfo(`{"?:${position}"}`, '?:');
      case NodeType.Literal:
        return createNodeInfo(`["${node.value}${position}"]`, node.value);
      case NodeType.Marker:
        return createNodeInfo(`>"${node.token.type}${position}"]`, TokenType[node.token.type]);
      case NodeType.NullishCoalescing:
        return createNodeInfo(`{"??${position}"}`, '??');
      case NodeType.StatementSequence:
        return createNodeInfo(`[";${position}"]`, 'sequence');
      case NodeType.StringLiteral:
        return createNodeInfo(`["'${node.value}'${position}"]`, `'${node.value}'`);
      case NodeType.UnaryOperation:
        return createNodeInfo(`{"${node.operator}${position}"}`, `${node.operator}`);

      case NodeType.Variable:
        const varName = node.names.join('.');
        return createNodeInfo(`[["${node.scope}.${varName}${position}"]]`, `${node.scope}.${varName}`);

      case NodeType.FunctionCall:
        const funcName = node.names.join('.');
        return createNodeInfo(`{{"${node.scope}.${funcName}()${position}"}}`, `${node.scope}.${funcName}()`);

      case NodeType.ResourceReference:
        const resName = node.names.join('.');
        return createNodeInfo(`[/"${node.scope}.${resName}${position}"/]`, `${node.scope}.${resName}`);

      default:
        return {
          shape: `["Unknown${position}"]`,
          label: 'Unknown',
        };
    }
  }

  private processChildren(node: ExpressionNode, parentId: string, depth: number): void {
    const children = this.getChildren(node);

    children.forEach(({ child, label }) => {
      const childId = this.processNode(child, depth + 1);
      const edgeLabel = label ? ` -->|${label}| ` : ' --> ';
      this.edges.push(`${parentId}${edgeLabel}${childId}`);
    });
  }

  private getChildren(node: ExpressionNode): Array<{ child: ExpressionNode; label?: string }> {
    switch (node.type) {
      case NodeType.UnaryOperation:
        return [{ child: node.operand, label: 'operand' }];

      case NodeType.BinaryOperation:
        return [
          { child: node.left, label: 'left' },
          { child: node.right, label: 'right' },
        ];

      case NodeType.Assignment:
        return [
          { child: node.left, label: 'target' },
          { child: node.right, label: 'value' },
        ];

      case NodeType.ArrayAccess:
        return [
          { child: node.array, label: 'array' },
          { child: node.index, label: 'index' },
        ];

      case NodeType.Conditional:
        const conditionalChildren = [
          { child: node.condition, label: 'condition' },
          { child: node.trueExpression, label: 'true' },
        ];
        if (node.falseExpression) {
          conditionalChildren.push({ child: node.falseExpression, label: 'false' });
        }
        return conditionalChildren;

      case NodeType.NullishCoalescing:
        return [
          { child: node.left, label: 'left' },
          { child: node.right, label: 'right' },
        ];

      case NodeType.FunctionCall:
        return node.arguments.map((arg, index) => ({
          child: arg,
          label: `arg${index}`,
        }));

      case NodeType.StatementSequence:
        return node.statements.map((stmt, index) => ({
          child: stmt,
          label: `stmt${index}`,
        }));

      default:
        return [];
    }
  }

  private createLeafNode(label: string): string {
    const nodeId = `node${this.nodeCounter++}`;
    this.nodes.push(`${nodeId}["${label}"]`);
    return nodeId;
  }
}

function createNodeInfo(shape: string, label: string): { shape: string; label: string } {
  if (shape.length === 6 || shape.length === 5) {
    if (shape.startsWith('{"') && shape.endsWith('"}')) {
      shape = shape.replace('{"', '{"\\');
    }
  }

  return { shape, label };
}

/**
 * Generates a Mermaid flowchart diagram from an AST node
 *
 * @param rootNode - The root AST node to visualize
 * @param options - Configuration options for the diagram
 * @returns A Mermaid flowchart diagram as a string
 *
 * @example
 * ```typescript
 * const ast = BinaryOperationNode.create({
 *   operator: '+',
 *   left: LiteralNode.create({ value: '1', position: 0 }),
 *   right: LiteralNode.create({ value: '2', position: 2 }),
 *   position: 1
 * });
 *
 * const diagram = generateMermaidDiagram(ast, {
 *   direction: 'TD',
 *   showPosition: true
 * });
 *
 * console.log(diagram);
 * // Output:
 * // flowchart TD
 * //     node0{"+@1"}
 * //     node1["1@0"]
 * //     node2["2@2"]
 * //     node0 -->|left| node1
 * //     node0 -->|right| node2
 * ```
 */
export function generateMermaidDiagram(rootNode: ExpressionNode, options: MermaidOptions = {}): string {
  const builder = new MermaidDiagramBuilder(options);
  return builder.generateDiagram(rootNode);
}

/**
 * Utility function to generate a compact Mermaid diagram
 */
export function generateCompactMermaidDiagram(rootNode: ExpressionNode, maxDepth: number = 3): string {
  return generateMermaidDiagram(rootNode, {
    compactMode: true,
    maxDepth,
    direction: 'LR',
  });
}

/**
 * Utility function to generate a detailed Mermaid diagram with positions
 */
export function generateDetailedMermaidDiagram(rootNode: ExpressionNode): string {
  return generateMermaidDiagram(rootNode, {
    showPosition: true,
    direction: 'TD',
  });
}
