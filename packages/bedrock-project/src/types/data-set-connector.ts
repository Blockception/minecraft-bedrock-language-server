
import { Identifiable, Locatable } from 'bc-minecraft-bedrock-shared';
import { DataSet } from './data-set';
import { findInPacks } from './find-in-packs';
import { IDataSet } from './i-data-set';
import { Pack } from './pack';
import { PackCollection } from './pack-collection';

/**
 * Connects a {@link PackCollection} to a specific {@link DataSet} field on each pack,
 * exposing a unified {@link IDataSet} view across all packs in the collection.
 *
 * **Lookup order / priority**: packs are queried in the order they appear in
 * {@link PackCollection.packs}. When multiple packs contain an item with the
 * same ID the pack that appears *first* wins and its value is returned. This is
 * the intended behaviour – pack priority is determined by insertion order.
 */
export class DataSetConnector<T extends Identifiable & Locatable, U extends Pack> implements IDataSet<T> {
  private _collection: PackCollection<U>;
  private _getDataset: (pack: U) => DataSet<T> | undefined;

  constructor(collection: PackCollection<U>, getDataset: (pack: U) => DataSet<T> | undefined) {
    this._collection = collection;
    this._getDataset = getDataset;
  }

  /** @inheritdoc */
  get(id: string | Identifiable): T | undefined {
    const packs = this._collection.packs;
    if (!packs) return undefined;

    return findInPacks(packs, (p) => this._getDataset(p)?.get(id));
  }

  /** @inheritdoc */
  has(id: string | Identifiable): boolean {
    return this.get(id) !== undefined;
  }

  /**Loops over all items in the collection and call the specified function on them
   * @param callbackfn The function to call for each item
   * @param thisArg The this argument*/
  forEach(callbackfn: (value: T) => void, thisArg?: any): void {
    const packs = this._collection.packs;
    if (!packs) return undefined;

    // All packs must be visited (no early-exit), so Array.forEach is used here.
    packs.forEach((p) => this._getDataset(p)?.forEach(callbackfn, thisArg));
  }

  /** @inheritdoc */
  find(predicate: (value: T, key: string) => boolean): T | undefined {
    const packs = this._collection.packs;
    if (!packs) return undefined;

    return findInPacks(packs, (p) => this._getDataset(p)?.find(predicate));
  }
}
