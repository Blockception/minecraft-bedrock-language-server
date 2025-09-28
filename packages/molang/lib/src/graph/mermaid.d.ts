import { ExpressionNode } from "../molang/syntax/nodes";
interface MermaidOptions {
    direction?: "TD" | "TB" | "BT" | "RL" | "LR";
    showPosition?: boolean;
    maxDepth?: number;
    compactMode?: boolean;
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
export declare function generateMermaidDiagram(rootNode: ExpressionNode, options?: MermaidOptions): string;
/**
 * Utility function to generate a compact Mermaid diagram
 */
export declare function generateCompactMermaidDiagram(rootNode: ExpressionNode, maxDepth?: number): string;
/**
 * Utility function to generate a detailed Mermaid diagram with positions
 */
export declare function generateDetailedMermaidDiagram(rootNode: ExpressionNode): string;
export {};
