import { Locatable, Documentated, Identifiable, Location } from '../types';
/**TODO add documentation
 *
 */
export interface BlockState {
    /** */
    property: string;
    /** */
    value: string;
}
/**TODO add documentation
 *
 */
export declare namespace BlockState {
    /**TODO add documentation
     *
     * @param data
     * @returns
     */
    function parse(data: string): BlockState | undefined;
    /**TODO add documentation
     *
     * @param property
     * @param value
     * @returns
     */
    function create(property: string, value: string): {
        property: string;
        value: string;
    };
}
/**TODO add documentation
 *
 */
export interface Block extends Locatable, Documentated, Identifiable {
    /** */
    states: BlockState[];
}
/**TODO add documentation
 *
 */
export declare namespace Block {
    /**TODO add documentation
     *
     * @param id
     * @param Location
     * @returns
     */
    function create(id: string, Location: Location): Block;
    /**TODO add documentation
     *
     * @param blockDescription
     * @returns
     */
    function getId(blockDescription: string): string;
    /**TODO add documentation
     *
     * @param blockDescription
     * @returns
     */
    function getStates(blockDescription: string): BlockState[];
    /**TODO add documentation
     *
     * @param blockDescription
     */
    function fromBlockDescriptor(blockDescription: string, Loc?: Location | undefined): Block;
}
