import { Types } from "bc-minecraft-bedrock-types";

export interface IDataSet<T extends Types.Identifiable> {
  /**
   * retrieves the matching id item in the data set
   * @param id The identication of the item to check
   */
  get(id: string | Types.Identifiable): T | undefined;

  /**
   * Loops over all the items in the dataset
   * @param callbackfn The function to call on each item
   * @param thisArg The this arg to set
   */
  forEach(callbackfn: (value: T) => void, thisArg?: any): void;

  /**
   * Checks if the dataset contains the specified item
   * @param id The identication of the item to check
   */
  has(id: string | Types.Identifiable): boolean;

  /**
   * Tries to find the specified item in the collection
   * @param predicate The function to determine if the item is found
   */
  find(predicate: (value: T, key: string) => boolean): T | undefined;
}
