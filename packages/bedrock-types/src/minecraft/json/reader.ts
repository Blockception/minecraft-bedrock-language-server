import { CompactJson } from "./compact";

export class CompactJsonReader<T extends CompactJson.IBase> {
  protected _data: T;

  /**
   * Creates a new instance of the CompactJsonReader class
   * @param data The data to read
   */
  constructor(data: T) {
    this._data = data;
  }

  /** The type of the node */
  get type(): T["type"] {
    return this._data.type;
  }

  /** The offset this node was found at */
  get offset(): number {
    return this._data.offset;
  }

  /** If the value of this node is negative or not */
  get negative(): boolean {
    return this._data.negative;
  }

  /** The value of the node */
  get value(): T["value"] {
    return this._data.value;
  }

  /** The key of the node */
  get key(): T["key"] {
    return (this._data as any).key;
  }

  /** Checks if this reader is a string or not */
  isString(): this is CompactJsonReader<CompactJson.IString> {
    return CompactJson.isString(this._data);
  }

  /** Checks if this reader is a object or not */
  isObject(): this is CompactJsonReader<CompactJson.IObject> {
    return CompactJson.isObject(this._data);
  }

  /** Checks if this reader is a array or not */
  isArray(): this is CompactJsonReader<CompactJson.IArray> {
    return CompactJson.isArray(this._data);
  }

  /** Checks if this reader is a array or object or not */
  isArrayOrObject(): this is CompactJsonReader<CompactJson.IArray | CompactJson.IObject> {
    return CompactJson.isArrayOrObject(this._data);
  }

  /**
   * Checks if this node has a key
   * @returns True if this node has a key
   */
  hasKey(): this is T & CompactJson.IKeyNode {
    return CompactJson.hasKey(this._data);
  }

  /**
   * Gets the name of child nodes
   * @returns The names of the child nodes
   */
  names(): string[] {
    const data = this._data;
    const names: string[] = [];

    if (CompactJson.isString(data)) {
      return names;
    }

    for (const item of data.value) {
      if (CompactJson.hasKey(item)) {
        names.push(item.key);
      }
    }

    return names;
  }

  /**
   * Gets the value of the node at the specified index
   * @param name The name of the node to get
   * @returns The value of the node
   */
  get(name: string): CompactJsonReader<CompactJson.IKeyNode>[] {
    const result: CompactJsonReader<CompactJson.IKeyNode>[] = [];
    const data = this._data;

    if (CompactJson.isString(data)) {
      return result;
    }

    for (const item of data.value) {
      if (CompactJson.hasKey(item) && item.key === name) {
        result.push(new CompactJsonReader(item as CompactJson.IKeyNode));
      }
    }

    return result;
  }

  /**
   * loops through all the items in the node
   * @param callbackfn The callback function to call for each item
   * @returns The result of the callback function
   */
  forEach(callbackfn: (value: CompactJsonReader<CompactJson.INode>, index: number) => void) {
    const data = this._data;

    if (CompactJson.isString(data)) {
      return;
    }

    for (let i = 0; i < data.value.length; i++) {
      callbackfn(new CompactJsonReader(data.value[i] as CompactJson.IKeyNode), i);
    }
  }

  /**
   * Check if the node has a child node with the specified name
   * @param name The name of the node to check
   * @returns True if the node has a child node with the specified name
   */
  contains(name: string): boolean {
    const data = this._data;

    if (CompactJson.isString(data)) {
      return false;
    }

    for (const item of data.value) {
      if (CompactJson.hasKey(item) && item.key === name) {
        return true;
      }
    }

    return false;
  }
}
