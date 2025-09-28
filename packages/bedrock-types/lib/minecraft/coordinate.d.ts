/** */
export declare namespace Coordinate {
    /**The regex pattern that matches a coordinate */
    const pattern: RegExp;
    /**Checks if the given text value is a valid coordinate
     * @param value The valued to compare to
     * @returns True or false if the text represents a coordinate*/
    function is(text: string): boolean;
}
