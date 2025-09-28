import { Types } from "bc-minecraft-bedrock-types";
import { IDataSet } from "./i-data-set";

/** The base of any dataset */
export interface DataSetBase {
  /** Clears the entire dataset */
  clear(): void;

  /**
   * Delete the given item key from the location
   * @param key The objects identify key
   * @returns `true` or `false` wheter or not deletion was succesfull*/
  delete(key: string | Types.Identifiable): boolean;

  /**
   * Delete the items that come from the specified file
   * @param uri The filepath uri
   * @returns `true` or `false` wheter or not deletion was succesfull*/
  deleteFile(uri: string): boolean;

  /**
   * Delete the items that come from the specified file
   * @param uri The filepath uri
   * @returns `true` or `false` wheter or not deletion was succesfull*/
  deleteFolder(uri: string): boolean;

  /**
   * Checks if an object with the given id exists
   * @param key The objects identify key
   * @returns `true` or `false` wheter or not deletion was succesfull*/
  has(key: string | Types.Identifiable): boolean;
}

/** */
export class DataSet<T extends Types.Identifiable & Types.Locatable> implements DataSetBase, IDataSet<T> {
  private _data: Map<string, T>;

  constructor() {
    this._data = new Map<string, T>();
  }

  /** @inheritdoc */
  clear(): void {
    this._data.clear();
  }

  /** @inheritdoc */
  count(): number {
    return this._data.size;
  }

  /** @inheritdoc */
  delete(key: string | Types.Identifiable): boolean {
    if (typeof key !== "string") key = key.id;

    return this._data.delete(key);
  }

  /** @inheritdoc */
  deleteFile(uri: string): boolean {
    let out = false;

    this._data.forEach((item, key) => {
      if (item.location.uri === uri) {
        this._data.delete(key);
        out = true;
      }
    });

    return out;
  }

  /** @inheritdoc */
  deleteFolder(uri: string): boolean {
    let out = false;

    this._data.forEach((item, key) => {
      if (item.location.uri.startsWith(uri)) {
        this._data.delete(key);
        out = true;
      }
    });

    return out;
  }

  /**Loops over all items in the collection and call the specified function on them
   * @param callbackfn The function to call for each item
   * @param thisArg The this argument*/
  forEach(callbackfn: (value: T) => void, thisArg?: any): void {
    this._data.forEach(callbackfn, thisArg);
  }

  /**
   *
   * @param predicate
   * @returns
   */
  find(predicate: (value: T, key: string) => boolean): T | undefined {
    for (const item of this._data.entries()) {
      if (predicate(item[1], item[0])) return item[1];
    }

    return undefined;
  }

  /**
   *
   * @param key
   * @returns
   */
  get(key: string | Types.Identifiable): T | undefined {
    return this._data.get(Types.Identifiable.getId(key));
  }

  /** @inheritdoc */
  has(key: string | Types.Identifiable): boolean {
    return this._data.has(Types.Identifiable.getId(key));
  }

  /**
   *
   * @param value
   * @returns
   */
  set(value: T | T[] | undefined): this {
    if (value) {
      if (Array.isArray(value)) {
        value.forEach((i) => this._data.set(i.id, i));
      } else {
        this._data.set(value.id, value);
      }
    }

    return this;
  }
}
