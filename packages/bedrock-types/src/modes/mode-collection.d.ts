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
    /**
     * Checks if a given value exists as a mode name in the collection.
     * @param Collection The mode collection to search
     * @param value The mode name to look for
     * @returns True if the value exists as a mode name, false otherwise
     */
    function isValue(Collection: ModeCollection, value: string): boolean;
    /**
     * Retrieves a mode from the collection by name or index.
     * @param Collection The mode collection to search
     * @param index The mode name (string) or array index (number) to retrieve
     * @returns The Mode object if found, undefined otherwise
     */
    function get(Collection: ModeCollection, index: string | number): Mode | undefined;
}
/** */
export declare namespace Mode {
    /**
     * Type guard to check if a value is a valid Mode object.
     * @param value The value to check
     * @returns True if the value is a Mode with name and documentation strings, false otherwise
     */
    function is(value: any): value is Mode;
}
//# sourceMappingURL=mode-collection.d.ts.map