/**A Definition object
 * @example { "walk.anim": "animation.sheep.walk" }*/
export interface Definition {
    /**The reference is an internal reference to something that is to be used, such as animations / controllers*/
    [reference: string]: string;
}
/**The namespace that provides functionallity to definitions*/
export declare namespace Definition {
    /**
     * Counts the number of definitions in the given object
     * @param data The object to count the definitions in
     * @returns The number of definitions
     */
    function count(data: Definition): number;
    /**Returns the idenfitication used
     * @param data The data to look through
     * @param index The index of the definition
     * @returns*/
    function getId(data: Definition, index: number): string;
    /**Returns the idenfitication used
     * @param data The data to look through
     * @returns*/
    function getIds(data: Definition): string[];
    /**
     * @param data The data to look through
     * @param index The index of the definition
     * @returns
     */
    function getReference(data: Definition, index: number): string;
    /**
     * @param data The data to look through
     * @returns
     */
    function getReferences(data: Definition): string[];
    /**
     *
     * @param data
     * @param callbackfn
     * @returns
     */
    function forEach(data: Definition | undefined, callbackfn: (reference: string, id: string, index: number, data: Definition) => void): void;
}
