import { OffsetWord } from "../../types";
/**
 * Namespace that governs minecraft "compact json"
 */
export declare namespace CompactJson {
    /** The type of a node */
    enum Type {
        /** A string */
        String = 0,
        /** An object */
        Object = 1,
        /** An array */
        Array = 2
    }
    /** The base of an node */
    interface IBase {
        /** The offset this node was found */
        offset: number;
        /** If this value is negative check */
        negative: boolean;
        /** The type of the node */
        type: Type.String | Type.Object | Type.Array;
        /** The value of the node */
        value: string | IBase[];
        /** The key of the node */
        key?: string | undefined;
    }
    /** The different types of nodes */
    type INode = IObject | IArray | IString;
    /** A node that has a key value */
    type IKeyNode = {
        key: string;
    } & INode;
    /**
     * Returns true if the node is a key node
     * @param value The value to check
     * @returns True if the node is a key node
     */
    function hasKey<T extends IBase>(value: any): value is T & {
        key: string;
    };
    /**
     * Returns true if the node is a string node
     * @param value The value to check
     * @returns True if the node is a string node
     */
    function isString(value: IBase): value is IString;
    /**
     * Returns true if the node is an object node
     * @param value The value to check
     * @returns True if the node is an object node
     */
    function isObject(value: IBase): value is IObject;
    /**
     * Returns true if the node is an object array
     * @param value The value to check
     * @returns True if the node is an object array
     */
    function isArray(value: IBase): value is IArray;
    /**
     * Returns true if the node is an array of object node
     * @param value The value to check
     * @returns True if the node is an array of object node
     */
    function isArrayOrObject(value: IBase): value is IArray | IObject;
    /** A string node */
    interface IString extends IBase {
        /** The type of this node */
        type: Type.String;
        /** The value of this node */
        value: string;
    }
    /** An object node */
    interface IObject extends IBase {
        /** The type of this node */
        type: Type.Object;
        /** The value of this node */
        value: IKeyNode[];
    }
    /** An array node */
    interface IArray extends IBase {
        /** The type of this node */
        type: Type.Array;
        /** The value of this node */
        value: (INode | IKeyNode)[];
    }
    /**
     *
     * @param node
     * @returns
     */
    function stringify(node: INode | IKeyNode): string;
    /**
     *
     * @param node
     * @returns
     */
    function stringifyValue(node: INode): string;
    /**
     *
     * @returns
     */
    function empty(): IString;
    /**
     * Transform the items of a node into a @see {@link OffsetWord}
     * @param node The node to transform
     * @returns The offset word
     */
    function toOffsetWord(node: INode | IKeyNode): OffsetWord;
    /**
     * Transform only the value of the items of a node into a @see {@link OffsetWord}
     * Transform the items of a node
     * @param node The node to transform
     * @returns The offset word
     */
    function valueToOffsetWord(node: INode | IKeyNode): OffsetWord;
    /**
     * Transforms a node into a keyed node
     * @param node The node to transform
     * @param key The key to use
     * @returns The transformed node
     */
    function toKeyed<T extends INode>(node: T, key: string): T & IKeyNode;
    /**
     * Parses a string into a node
     * @param text The text to parse
     * @param offset The offset of the text starts at
     * @returns The parsed node
     */
    function parse(text: string, offset?: number): INode;
}
