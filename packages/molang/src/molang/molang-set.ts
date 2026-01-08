import { OffsetWord } from 'bc-minecraft-bedrock-shared';
import { MolangSyntaxCache } from './cache';
import { isMolang, isValidMolang } from './functions';
import { ExpressionNode, FunctionCallNode, NodeType, ResourceReferenceNode, VariableNode } from './syntax';

/** The interface for the molang set */
export class MolangSet {
  public cache = new MolangSyntaxCache();
  public assigned = new Set<ResourceReferenceNode | VariableNode>();
  public functions = new Set<FunctionCallNode>();
  public using = new Set<ResourceReferenceNode | VariableNode>();

  constructor() {}

  /**
   * adds the data from the molang code if it is valid molang
   * @param molang
   */
  addIf(molang: OffsetWord) {
    if (isValidMolang(molang.text)) this.add(molang);
  }

  /**
   *
   * @param molang
   * @returns
   */
  add(molang: OffsetWord) {
    const exp = this.cache.build(molang);
    if (exp === undefined) return;
    exp.forEach((e) => this.walkChildren(e));
  }

  private walkFn(node: ExpressionNode, skipUsing: boolean = false): void {
    switch (node.type) {
      case NodeType.Assignment:
        this.checkAssigned(node.left);
        break;
      case NodeType.FunctionCall:
        this.functions.add(node);
        break;
      case NodeType.NullishCoalescing:
        // The left side of ?? is expected to potentially be undefined, so don't mark it as "using"
        // But we still need to walk it to collect functions, assignments, etc.
        this.walkChildren(node.left, true);
        // The right side should be walked normally
        this.walkChildren(node.right, false);
        break;
      case NodeType.ResourceReference:
      case NodeType.Variable:
        if (this.assigned.has(node)) break;
        if (!skipUsing) {
          this.using.add(node);
        }
        break;
    }
  }

  private walkChildren(node: ExpressionNode, skipUsing: boolean = false): void {
    const objs: ExpressionNode[] = [node];

    for (let i = 0; i < objs.length; i++) {
      const n = objs[i];
      if (n === undefined) continue;
      this.walkFn(n, skipUsing);

      // For NullishCoalescing nodes, don't add children to the queue since walkFn handles them
      if (n.type === NodeType.NullishCoalescing) continue;

      objs.push(...ExpressionNode.getChildern(n));
    }
  }

  private checkAssigned(node: ExpressionNode): void {
    switch (node.type) {
      case NodeType.ResourceReference:
      case NodeType.Variable:
        this.assigned.add(node);
        break;
    }
  }

  harvest(object: Record<string, any> | string, originalText: string): this {
    if (typeof object === 'string') {
      if (isMolang(object)) {
        this.add(OffsetWord.create(object, originalText.indexOf(object)));
        return this;
      }
    }

    for (const [, value] of Object.entries(object)) {
      if (typeof value === 'string') {
        if (isMolang(value)) {
          this.add(OffsetWord.create(value, originalText.indexOf(value)));
        }
      } else if (typeof value === 'object') {
        if (Array.isArray(value)) {
          value.forEach((v) => this.harvest(v, originalText));
        } else {
          this.harvest(value, originalText);
        }
      }
    }

    return this;
  }

  static harvest(object: Record<string, any> | string, originalText: string): MolangSet {
    return new MolangSet().harvest(object, originalText);
  }
}
