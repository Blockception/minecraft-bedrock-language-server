import { Types } from "bc-minecraft-bedrock-types";
import { DataSet } from "./data-set";
import { IDataSet } from "./i-data-set";
import { Pack } from "./pack";
import { PackCollection } from "./pack-collection";

/**
 * The class DataSetConnector description
 */
export class DataSetConnector<T extends Types.Identifiable & Types.Locatable, U extends Pack> implements IDataSet<T> {
  private _collection: PackCollection<U>;
  private _getDataset: (pack: U) => DataSet<T> | undefined;

  constructor(collection: PackCollection<U>, getDataset: (pack: U) => DataSet<T> | undefined) {
    this._collection = collection;
    this._getDataset = getDataset;
  }

  /** @inheritdoc */
  get(id: string | Types.Identifiable): T | undefined {
    const packs = this._collection.packs;
    if (!packs) return undefined;

    for (let I = 0; I < packs.length; I++) {
      const p = packs[I];

      const item = this._getDataset(p)?.get(id);
      if (item) return item;
    }

    return undefined;
  }

  /** @inheritdoc */
  has(id: string | Types.Identifiable): boolean {
    return this.get(id) !== undefined;
  }

  /**Loops over all items in the collection and call the specified function on them
   * @param callbackfn The function to call for each item
   * @param thisArg The this argument*/
  forEach(callbackfn: (value: T) => void, thisArg?: any): void {
    const packs = this._collection.packs;
    if (!packs) return undefined;

    for (let I = 0; I < packs.length; I++) {
      const p = packs[I];
      const dataset = this._getDataset(p);
      dataset?.forEach(callbackfn, thisArg);
    }
  }

  /** @inheritdoc */
  find(predicate: (value: T, key: string) => boolean): T | undefined {
    const packs = this._collection.packs;
    if (!packs) return undefined;

    for (let I = 0; I < packs.length; I++) {
      const p = packs[I];
      const dataset = this._getDataset(p);
      const out = dataset?.find(predicate);

      if (out) return out;
    }

    return undefined;
  }
}
