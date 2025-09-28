import { OffsetWord } from "bc-minecraft-bedrock-types/lib/types";
import { MolangSyntaxCache } from "./cache";
import { FunctionCallNode, ResourceReferenceNode, VariableNode } from "./syntax";
/** The interface for the molang set */
export declare class MolangSet {
    cache: MolangSyntaxCache;
    assigned: Set<ResourceReferenceNode | VariableNode>;
    functions: Set<FunctionCallNode>;
    using: Set<ResourceReferenceNode | VariableNode>;
    constructor();
    /**
     * adds the data from the molang code if it is valid molang
     * @param molang
     */
    addIf(molang: OffsetWord): void;
    /**
     *
     * @param molang
     * @returns
     */
    add(molang: OffsetWord): void;
    private walkFn;
    private checkAssigned;
    harvest(object: Record<string, any> | string, originalText: string): this;
    static harvest(object: Record<string, any> | string, originalText: string): MolangSet;
}
