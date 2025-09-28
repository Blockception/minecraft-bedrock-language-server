import { Mode, ModeCollection } from "./mode-collection";
/**TODO add documentation
 *
 */
export declare class ModeHandler implements ModeCollection {
    /**The collection of different modes*/
    modes: Mode[];
    /**The name of the collection*/
    name: string;
    constructor(collection: ModeCollection);
    /**TODO add documentation
     *
     * @param value
     * @returns
     */
    isValue(value: string): boolean;
    /**TODO add documentation
     *
     * @param index
     * @returns
     */
    get(index: string | number): Mode | undefined;
    /**TODO add documentation
     *
     * @param callbackfn
     * @param thisArg
     * @returns
     */
    foreach(callbackfn: (value: Mode, index: number, array: Mode[]) => void, thisArg?: any): void;
}
