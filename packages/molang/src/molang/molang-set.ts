import { OffsetWord } from "bc-minecraft-bedrock-types/lib/types";
import { MolangSyntaxCache } from "./cache";
import { isMolang, isValidMolang } from "./functions";
import { ExpressionNode, FunctionCallNode, NodeType, ResourceReferenceNode, VariableNode, walk } from "./syntax";

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
    exp.forEach((e) => walk(e, this.walkFn.bind(this)));
  }

  private walkFn(node: ExpressionNode): void {
    switch (node.type) {
      case NodeType.Assignment:
        this.checkAssigned(node.left);
        break;
      case NodeType.FunctionCall:
        this.functions.add(node);
        break;
      case NodeType.ResourceReference:
      case NodeType.Variable:
        if (this.assigned.has(node)) break;
        this.using.add(node);
        break;
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
    if (typeof object === "string") {
      if (isMolang(object)) {
        this.add(OffsetWord.create(object, originalText.indexOf(object)));
        return this;
      }
    }

    for (const [, value] of Object.entries(object)) {
      if (typeof value === "string") {
        if (isMolang(value)) {
          this.add(OffsetWord.create(value, originalText.indexOf(value)));
        }
      } else if (typeof value === "object") {
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
