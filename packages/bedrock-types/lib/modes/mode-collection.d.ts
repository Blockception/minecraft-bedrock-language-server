/** The interface that marks a gamemode*/
export interface ModeCollection {
    /**The collection of different modes*/
    modes: Mode[];
    /**The name of the collection*/
    name: string;
}
/** The mode interface */
export interface Mode {
    /**The name of this mode*/
    name: string;
    /**The documentation of this mode*/
    documentation: string;
    /** */
    eduOnly?: boolean;
}
/** */
export declare namespace ModeCollection {
    /**Checks if the given object is implements ModeCollection
     * @param value
     * @returns
     */
    function is(value: any): value is ModeCollection;
    /**TODO add documentation
     *
     */
    function isValue(Collection: ModeCollection, value: string): boolean;
    /**TODO add documentation
     *
     * @param Collection
     * @param index
     * @returns
     */
    function get(Collection: ModeCollection, index: string | number): Mode | undefined;
}
/** */
export declare namespace Mode {
    /**TODO add documentation
     *
     * @param value
     * @returns
     */
    function is(value: any): value is Mode;
}
