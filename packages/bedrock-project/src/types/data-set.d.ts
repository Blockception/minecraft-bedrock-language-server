import { Identifiable, Locatable } from 'bc-minecraft-bedrock-shared';
import { IDataSet } from './i-data-set';
/** The base of any dataset */
export interface DataSetBase {
    /** Clears the entire dataset */
    clear(): void;
    /**
     * Delete the given item key from the location
     * @param key The objects identify key
     * @returns `true` or `false` wheter or not deletion was succesfull*/
    delete(key: string | Identifiable): boolean;
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
    has(key: string | Identifiable): boolean;
}
/** */
export declare class DataSet<T extends Identifiable & Locatable> implements DataSetBase, IDataSet<T> {
    private _data;
    constructor();
    /** @inheritdoc */
    clear(): void;
    /** @inheritdoc */
    count(): number;
    /** @inheritdoc */
    delete(key: string | Identifiable): boolean;
    /** @inheritdoc */
    deleteFile(uri: string): boolean;
    /** @inheritdoc */
    deleteFolder(uri: string): boolean;
    /**Loops over all items in the collection and call the specified function on them
     * @param callbackfn The function to call for each item
     * @param thisArg The this argument*/
    forEach(callbackfn: (value: T) => void, thisArg?: any): void;
    /**
     *
     * @param predicate
     * @returns
     */
    find(predicate: (value: T, key: string) => boolean): T | undefined;
    /**
     *
     * @param key
     * @returns
     */
    get(key: string | Identifiable): T | undefined;
    /** @inheritdoc */
    has(key: string | Identifiable): boolean;
    /**
     *
     * @param value
     * @returns
     */
    set(value: T | T[] | undefined): this;
}
//# sourceMappingURL=data-set.d.ts.map