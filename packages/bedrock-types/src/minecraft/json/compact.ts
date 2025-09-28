import { OffsetWord } from "../../types";
import { findCommaOrEnd, trimBraces, trimWithOffset } from "./grammar";

/**
 * Namespace that governs minecraft "compact json"
 */
export namespace CompactJson {
  /** The type of a node */
  export enum Type {
    /** A string */
    String = 0,
    /** An object */
    Object = 1,
    /** An array */
    Array = 2,
  }

  /** The base of an node */
  export interface IBase {
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
  export type INode = IObject | IArray | IString;
  /** A node that has a key value */
  export type IKeyNode = { key: string } & INode;

  /**
   * Returns true if the node is a key node
   * @param value The value to check
   * @returns True if the node is a key node
   */
  export function hasKey<T extends IBase>(value: any): value is T & { key: string } {
    return typeof value.key === "string";
  }

  /**
   * Returns true if the node is a string node
   * @param value The value to check
   * @returns True if the node is a string node
   */
  export function isString(value: IBase): value is IString {
    return value.type === Type.String;
  }

  /**
   * Returns true if the node is an object node
   * @param value The value to check
   * @returns True if the node is an object node
   */
  export function isObject(value: IBase): value is IObject {
    return value.type === Type.Object;
  }

  /**
   * Returns true if the node is an object array
   * @param value The value to check
   * @returns True if the node is an object array
   */
  export function isArray(value: IBase): value is IArray {
    return value.type === Type.Array;
  }

  /**
   * Returns true if the node is an array of object node
   * @param value The value to check
   * @returns True if the node is an array of object node
   */
  export function isArrayOrObject(value: IBase): value is IArray | IObject {
    return isArray(value) || isObject(value);
  }

  /** A string node */
  export interface IString extends IBase {
    /** The type of this node */
    type: Type.String;
    /** The value of this node */
    value: string;
  }

  /** An object node */
  export interface IObject extends IBase {
    /** The type of this node */
    type: Type.Object;
    /** The value of this node */
    value: IKeyNode[];
  }

  /** An array node */
  export interface IArray extends IBase {
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
  export function stringify(node: INode | IKeyNode): string {
    const value = stringifyValue(node);

    if (hasKey(node)) {
      return `${node.key}=${value}`;
    }

    return value;
  }

  /**
   *
   * @param node
   * @returns
   */
  export function stringifyValue(node: INode): string {
    switch (node.type) {
      case Type.String:
        return node.value;
      case Type.Object:
        return `{${node.value.map(stringify).join(",")}}`;
      case Type.Array:
        return `[${node.value.map(stringify).join(",")}]`;
    }
  }

  /**
   *
   * @returns
   */
  export function empty(): IString {
    return {
      key: "",
      type: Type.String,
      offset: 0,
      negative: false,
      value: "",
    };
  }

  /**
   * Transform the items of a node into a @see {@link OffsetWord}
   * @param node The node to transform
   * @returns The offset word
   */
  export function toOffsetWord(node: INode | IKeyNode): OffsetWord {
    return {
      offset: node.offset,
      text: stringify(node),
    };
  }

  /**
   * Transform only the value of the items of a node into a @see {@link OffsetWord}
   * Transform the items of a node
   * @param node The node to transform
   * @returns The offset word
   */
  export function valueToOffsetWord(node: INode | IKeyNode): OffsetWord {
    let offset = node.offset;
    if (hasKey(node)) {
      offset += node.key.length + 1;
    }
    if (node.negative) {
      offset ++;
    }

    return {
      offset: offset,
      text: stringifyValue(node),
    };
  }

  /**
   * Transforms a node into a keyed node
   * @param node The node to transform
   * @param key The key to use
   * @returns The transformed node
   */
  export function toKeyed<T extends INode>(node: T, key: string): T & IKeyNode {
    const result = node as IKeyNode & T;
    result.key = key;

    return result;
  }

  /**
   * Parses a string into a node
   * @param text The text to parse
   * @param offset The offset of the text starts at
   * @returns The parsed node
   */
  export function parse(text: string, offset: number = 0): INode {
    let negative = false;
    let node: INode;
    [text, offset] = trimWithOffset(text, offset);

    if (text.startsWith("!")) {
      negative = true;
      text = text.slice(1);
    }

    if (text.startsWith("[")) {
      node = {
        type: Type.Array,
        offset: offset + 1,
        negative: negative,
        value: [],
      };

      text = trimBraces(text);
      offset += 1;
      parseItems(text, offset, node);
    } else if (text.startsWith("{")) {
      node = {
        type: Type.Object,
        offset: offset + 1,
        negative: negative,
        value: [],
      };

      text = trimBraces(text);
      offset += 1;
      parseItems(text, offset, node as any);
    } else {
      node = {
        type: Type.String,
        offset: offset,
        negative: negative,
        value: text,
      };
    }

    return node;
  }
}

/**
 * Parses a list of items into nodes
 * @param text The text to parse
 * @param offset The offset of the text starts at
 * @param receiver The node to add the items to
 */
function parseItems(text: string, offset: number, receiver: CompactJson.IArray) {
  let index = findCommaOrEnd(text);
  [text, offset] = trimWithOffset(text, offset);

  while (index > 0) {
    const attr = text.slice(0, index);

    if (attr.startsWith("{") || attr.endsWith("[")) {
      const node = CompactJson.parse(attr, offset);
      receiver.value.push(node);
    } else {
      const equalIndex = attr.indexOf("=");

      if (equalIndex > 0) {
        const key = attr.slice(0, equalIndex).trim();
        const value = attr.slice(equalIndex + 1);

        const node = CompactJson.parse(value, offset + equalIndex + 1) as CompactJson.IKeyNode;
        node.key = key;
        node.offset = offset;
        receiver.value.push(node);
      } else {
        const value = attr;

        const node = CompactJson.parse(value, offset);
        receiver.value.push(node);
      }
    }

    text = text.slice(index + 1);
    offset += index + 1;
    index = findCommaOrEnd(text);
  }
}
