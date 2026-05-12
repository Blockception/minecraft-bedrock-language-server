import { Identifiable } from 'bc-minecraft-bedrock-shared';
import { Defined } from 'bc-minecraft-bedrock-project';
import { Documentated } from 'bc-minecraft-bedrock-shared';
import { CancellationToken, CompletionItem, CompletionItemKind, WorkDoneProgressReporter } from 'vscode-languageserver';
export type GenerateFunction<T> = (item: T) => string;
export interface IForEach<T> {
    forEach(callbackfn: (value: T) => void, thisArg?: any): void;
}
export declare function createBuilder(token: CancellationToken, workDoneProgress: WorkDoneProgressReporter): CompletionBuilder;
export interface CompletionBuilder {
    /**
     * Adds a new completion item
     * @param item The item to add, will be sanitized
     * @returns The added and sanitized item
     */
    add(item: CompletionItem): CompletionItem;
    /**
     * Check if the request has been cancelled
     * @returns True if the builder is done
     * @returns False if the builder is not done
     */
    isCancelled(): boolean;
    /**
     * Returns all the items
     */
    getItems(): CompletionItem[];
    /**
     * Generate a completion item from the dataset / collection
     * @param dataset The dataset to generate from
     * @param generatefn The function to generate the documentation
     * @param kind The kind of completion item
     * @param query The query to filter the dataset
     */
    generate<T extends Identifiable | string>(dataset: IForEach<T> | Defined | undefined, generatefn: GenerateFunction<T>): CompletionItem[];
    generate<T extends Identifiable | string>(dataset: IForEach<T> | Defined | undefined, generatefn: GenerateFunction<T>, kind: CompletionItemKind): CompletionItem[];
    generate<T extends Identifiable | string>(dataset: IForEach<T> | Defined | undefined, generatefn: GenerateFunction<T>, kind: CompletionItemKind | undefined, query: string | undefined): CompletionItem[];
    /**
     * Returns a new builder with the events added
     * @param before The event to run before adding the item and sanitizing it
     * @param after The event to run after adding the item and sanitizing it
     */
    withEvents(before?: (item: CompletionItem) => void, after?: (item: CompletionItem) => void): CompletionBuilder;
    /**
     * Returns a new builder with the default values added
     * @param base The default values to add
     */
    withDefaults(base: Partial<CompletionItem>): CompletionBuilder;
}
type BaseCompletionBuilder = Pick<CompletionBuilder, 'add' | 'isCancelled' | 'getItems'>;
export declare class BaseBuilder implements BaseCompletionBuilder {
    private _items;
    private _token;
    protected _workDoneProgress: WorkDoneProgressReporter;
    constructor(token: CancellationToken, workDoneProgress: WorkDoneProgressReporter, items?: CompletionItem[]);
    /** @inheritdoc */
    add(item: CompletionItem): CompletionItem;
    /** @inheritdoc */
    isCancelled(): boolean;
    /** @inheritdoc */
    getItems(): CompletionItem[];
}
export declare class EventedBuilder implements BaseCompletionBuilder {
    private _builder;
    private _before;
    private _after;
    constructor(builder: BaseCompletionBuilder, before: (item: CompletionItem) => void, after: (item: CompletionItem) => void);
    /** @inheritdoc */
    add(item: CompletionItem): CompletionItem;
    /** @inheritdoc */
    isCancelled(): boolean;
    /** @inheritdoc */
    getItems(): CompletionItem[];
}
export declare class WrappedBuilder implements CompletionBuilder {
    private builder;
    constructor(builder: BaseCompletionBuilder);
    /** @inheritdoc */
    add(item: CompletionItem): CompletionItem;
    /** @inheritdoc */
    isCancelled(): boolean;
    /** @inheritdoc */
    getItems(): CompletionItem[];
    generateItem<T extends Identifiable & Documentated>(item: T, generatefn: (item: T) => string, kind?: CompletionItemKind): CompletionItem;
    /** @inheritdoc */
    generate<T extends Identifiable>(dataset: IForEach<T | string> | undefined, generatefn: (item: T) => string, kind?: CompletionItemKind, query?: string | undefined): CompletionItem[];
    private createFilter;
    /** @inheritdoc */
    withEvents(before?: (item: CompletionItem) => void, after?: (item: CompletionItem) => void): CompletionBuilder;
    /** @inheritdoc */
    withDefaults(base: Partial<CompletionItem>): CompletionBuilder;
}
export {};
//# sourceMappingURL=builder.d.ts.map