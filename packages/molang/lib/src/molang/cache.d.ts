import { OffsetWord } from "bc-minecraft-bedrock-types/lib/types";
import { ExpressionNode } from "./syntax";
export declare class MolangSyntaxCache {
    private _data;
    constructor();
    build(code: OffsetWord): ExpressionNode[] | undefined;
    clear(): void;
    entries(): MapIterator<[string, ExpressionNode[]]>;
    syntaxes(): MapIterator<string>;
    expressions(): MapIterator<ExpressionNode[]>;
}
