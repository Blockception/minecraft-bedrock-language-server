"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateMermaidDiagram = generateMermaidDiagram;
exports.generateCompactMermaidDiagram = generateCompactMermaidDiagram;
exports.generateDetailedMermaidDiagram = generateDetailedMermaidDiagram;
const nodes_1 = require("../molang/syntax/nodes");
const tokens_1 = require("../molang/syntax/tokens");
class MermaidDiagramBuilder {
    constructor(options = {}) {
        var _a, _b, _c, _d;
        this.nodeCounter = 0;
        this.nodeMap = new Map();
        this.nodes = ['start@{ shape: sm-circ, label: "Small start" }'];
        this.edges = ["start-->node0"];
        this.options = {
            direction: (_a = options.direction) !== null && _a !== void 0 ? _a : "TD",
            showPosition: (_b = options.showPosition) !== null && _b !== void 0 ? _b : false,
            maxDepth: (_c = options.maxDepth) !== null && _c !== void 0 ? _c : Infinity,
            compactMode: (_d = options.compactMode) !== null && _d !== void 0 ? _d : false,
        };
    }
    /**
     * Generates a Mermaid flowchart diagram from an AST node
     */
    generateDiagram(rootNode) {
        this.reset();
        this.processNode(rootNode, 0);
        const header = `---
config:
    theme: redux
---
flowchart ${this.options.direction}`;
        const nodeDefinitions = this.nodes.join("\n    ");
        const edgeDefinitions = this.edges.join("\n    ");
        return `${header}\n    ${nodeDefinitions}\n    ${edgeDefinitions}`;
    }
    reset() {
        this.nodeCounter = 0;
        this.nodeMap.clear();
        this.nodes = ['start@{ shape: sm-circ, label: "Small start" }'];
        this.edges = ["start-->node0"];
    }
    getNodeId(node) {
        if (!this.nodeMap.has(node)) {
            this.nodeMap.set(node, `node${this.nodeCounter++}`);
        }
        return this.nodeMap.get(node);
    }
    processNode(node, depth) {
        if (depth > this.options.maxDepth) {
            return this.createLeafNode("...");
        }
        const nodeId = this.getNodeId(node);
        const nodeInfo = this.getNodeInfo(node);
        // Create node definition
        this.nodes.push(`${nodeId}${nodeInfo.shape}`);
        // Process children and create edges
        this.processChildren(node, nodeId, depth);
        return nodeId;
    }
    getNodeInfo(node) {
        const position = this.options.showPosition ? `@${node.position}` : "";
        switch (node.type) {
            case nodes_1.NodeType.Assignment:
                return createNodeInfo(`{"=${position}"}`, "=");
            case nodes_1.NodeType.ArrayAccess:
                return createNodeInfo(`["[]${position}"]`, "[]");
            case nodes_1.NodeType.BinaryOperation:
                return createNodeInfo(`{"\\${node.operator}${position}"}`, `${node.operator}`);
            case nodes_1.NodeType.Conditional:
                return createNodeInfo(`{"?:${position}"}`, "?:");
            case nodes_1.NodeType.Literal:
                return createNodeInfo(`["${node.value}${position}"]`, node.value);
            case nodes_1.NodeType.Marker:
                return createNodeInfo(`>"${node.token.type}${position}"]`, tokens_1.TokenType[node.token.type]);
            case nodes_1.NodeType.NullishCoalescing:
                return createNodeInfo(`{"??${position}"}`, "??");
            case nodes_1.NodeType.StatementSequence:
                return createNodeInfo(`[";${position}"]`, "sequence");
            case nodes_1.NodeType.StringLiteral:
                return createNodeInfo(`["'${node.value}'${position}"]`, `'${node.value}'`);
            case nodes_1.NodeType.UnaryOperation:
                return createNodeInfo(`{"${node.operator}${position}"}`, `${node.operator}`);
            case nodes_1.NodeType.Variable:
                const varName = node.names.join(".");
                return createNodeInfo(`[["${node.scope}.${varName}${position}"]]`, `${node.scope}.${varName}`);
            case nodes_1.NodeType.FunctionCall:
                const funcName = node.names.join(".");
                return createNodeInfo(`{{"${node.scope}.${funcName}()${position}"}}`, `${node.scope}.${funcName}()`);
            case nodes_1.NodeType.ResourceReference:
                const resName = node.names.join(".");
                return createNodeInfo(`[/"${node.scope}.${resName}${position}"/]`, `${node.scope}.${resName}`);
            default:
                return {
                    shape: `["Unknown${position}"]`,
                    label: "Unknown",
                };
        }
    }
    processChildren(node, parentId, depth) {
        const children = this.getChildren(node);
        children.forEach(({ child, label }) => {
            const childId = this.processNode(child, depth + 1);
            const edgeLabel = label ? ` -->|${label}| ` : " --> ";
            this.edges.push(`${parentId}${edgeLabel}${childId}`);
        });
    }
    getChildren(node) {
        switch (node.type) {
            case nodes_1.NodeType.UnaryOperation:
                return [{ child: node.operand, label: "operand" }];
            case nodes_1.NodeType.BinaryOperation:
                return [
                    { child: node.left, label: "left" },
                    { child: node.right, label: "right" },
                ];
            case nodes_1.NodeType.Assignment:
                return [
                    { child: node.left, label: "target" },
                    { child: node.right, label: "value" },
                ];
            case nodes_1.NodeType.ArrayAccess:
                return [
                    { child: node.array, label: "array" },
                    { child: node.index, label: "index" },
                ];
            case nodes_1.NodeType.Conditional:
                const conditionalChildren = [
                    { child: node.condition, label: "condition" },
                    { child: node.trueExpression, label: "true" },
                ];
                if (node.falseExpression) {
                    conditionalChildren.push({ child: node.falseExpression, label: "false" });
                }
                return conditionalChildren;
            case nodes_1.NodeType.NullishCoalescing:
                return [
                    { child: node.left, label: "left" },
                    { child: node.right, label: "right" },
                ];
            case nodes_1.NodeType.FunctionCall:
                return node.arguments.map((arg, index) => ({
                    child: arg,
                    label: `arg${index}`,
                }));
            case nodes_1.NodeType.StatementSequence:
                return node.statements.map((stmt, index) => ({
                    child: stmt,
                    label: `stmt${index}`,
                }));
            default:
                return [];
        }
    }
    createLeafNode(label) {
        const nodeId = `node${this.nodeCounter++}`;
        this.nodes.push(`${nodeId}["${label}"]`);
        return nodeId;
    }
}
function createNodeInfo(shape, label) {
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
function generateMermaidDiagram(rootNode, options = {}) {
    const builder = new MermaidDiagramBuilder(options);
    return builder.generateDiagram(rootNode);
}
/**
 * Utility function to generate a compact Mermaid diagram
 */
function generateCompactMermaidDiagram(rootNode, maxDepth = 3) {
    return generateMermaidDiagram(rootNode, {
        compactMode: true,
        maxDepth,
        direction: "LR",
    });
}
/**
 * Utility function to generate a detailed Mermaid diagram with positions
 */
function generateDetailedMermaidDiagram(rootNode) {
    return generateMermaidDiagram(rootNode, {
        showPosition: true,
        direction: "TD",
    });
}
//# sourceMappingURL=mermaid.js.map