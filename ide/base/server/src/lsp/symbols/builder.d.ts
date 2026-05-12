import { BaseObject } from 'bc-minecraft-bedrock-types';
import { CancellationToken, Range, SymbolInformation, SymbolKind } from 'vscode-languageserver';
type forEachCarrier<T> = {
    forEach: (callbackfn: (value: T) => void, thisArg?: any) => void;
};
export declare class SymbolBuilder {
    query: string | undefined;
    items: SymbolInformation[];
    kind: SymbolKind;
    containerName: string | undefined;
    private range;
    private token;
    constructor(query: string | undefined, token: CancellationToken);
    push(item: SymbolInformation): number;
    new(name: string, kind?: SymbolKind, range?: Range, uri?: string, containerName?: string): SymbolInformation;
    add(item: BaseObject): SymbolInformation | undefined;
    generate<T extends BaseObject>(data: forEachCarrier<T>, kind: SymbolKind): void;
}
export {};
//# sourceMappingURL=builder.d.ts.map