import { CompactJson } from "./compact";
export declare class CompactJsonReader<T extends CompactJson.IBase> {
    protected _data: T;
    /**
     * Creates a new instance of the CompactJsonReader class
     * @param data The data to read
     */
    constructor(data: T);
    /** The type of the node */
    get type(): T["type"];
    /** The offset this node was found at */
    get offset(): number;
    /** If the value of this node is negative or not */
    get negative(): boolean;
    /** The value of the node */
    get value(): T["value"];
    /** The key of the node */
    get key(): T["key"];
    /** Checks if this reader is a string or not */
    isString(): this is CompactJsonReader<CompactJson.IString>;
    /** Checks if this reader is a object or not */
    isObject(): this is CompactJsonReader<CompactJson.IObject>;
    /** Checks if this reader is a array or not */
    isArray(): this is CompactJsonReader<CompactJson.IArray>;
    /** Checks if this reader is a array or object or not */
    isArrayOrObject(): this is CompactJsonReader<CompactJson.IArray | CompactJson.IObject>;
    /**
     * Checks if this node has a key
     * @returns True if this node has a key
     */
    hasKey(): this is T & CompactJson.IKeyNode;
    /**
     * Gets the name of child nodes
     * @returns The names of the child nodes
     */
    names(): string[];
    /**
     * Gets the value of the node at the specified index
     * @param name The name of the node to get
     * @returns The value of the node
     */
    get(name: string): CompactJsonReader<CompactJson.IKeyNode>[];
    /**
     * loops through all the items in the node
     * @param callbackfn The callback function to call for each item
     * @returns The result of the callback function
     */
    forEach(callbackfn: (value: CompactJsonReader<CompactJson.INode>, index: number) => void): void;
    /**
     * Check if the node has a child node with the specified name
     * @param name The name of the node to check
     * @returns True if the node has a child node with the specified name
     */
    contains(name: string): boolean;
}
