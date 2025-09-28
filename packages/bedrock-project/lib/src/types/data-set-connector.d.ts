import { Types } from "bc-minecraft-bedrock-types";
import { DataSet } from "./data-set";
import { IDataSet } from "./i-data-set";
import { Pack } from "./pack";
import { PackCollection } from "./pack-collection";
/**
 * The class DataSetConnector description
 */
export declare class DataSetConnector<T extends Types.Identifiable & Types.Locatable, U extends Pack> implements IDataSet<T> {
    private _collection;
    private _getDataset;
    constructor(collection: PackCollection<U>, getDataset: (pack: U) => DataSet<T> | undefined);
    /** @inheritdoc */
    get(id: string | Types.Identifiable): T | undefined;
    /** @inheritdoc */
    has(id: string | Types.Identifiable): boolean;
    /**Loops over all items in the collection and call the specified function on them
     * @param callbackfn The function to call for each item
     * @param thisArg The this argument*/
    forEach(callbackfn: (value: T) => void, thisArg?: any): void;
    /** @inheritdoc */
    find(predicate: (value: T, key: string) => boolean): T | undefined;
}
