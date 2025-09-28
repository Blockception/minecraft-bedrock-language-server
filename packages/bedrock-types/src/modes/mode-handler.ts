import { Mode, ModeCollection } from "./mode-collection";

/**TODO add documentation
 *
 */
export class ModeHandler implements ModeCollection {
  /**The collection of different modes*/
  public modes: Mode[];
  /**The name of the collection*/
  public name: string;

  constructor(collection: ModeCollection) {
    this.modes = collection.modes;
    this.name = collection.name;
  }

  /**TODO add documentation
   *
   * @param value
   * @returns
   */
  isValue(value: string): boolean {
    return ModeCollection.isValue(this, value);
  }

  /**TODO add documentation
   *
   * @param index
   * @returns
   */
  get(index: string | number): Mode | undefined {
    return ModeCollection.get(this, index);
  }

  /**TODO add documentation
   *
   * @param callbackfn
   * @param thisArg
   * @returns
   */
  foreach(callbackfn: (value: Mode, index: number, array: Mode[]) => void, thisArg?: any): void {
    return this.modes.forEach(callbackfn, thisArg);
  }
}
