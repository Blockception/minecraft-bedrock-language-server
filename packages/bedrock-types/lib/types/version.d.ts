/** A version object*/
export interface Version {
    /**The major version*/
    major: number;
    /**The minor version*/
    minor: number;
    /**The patch version*/
    patch: number;
}
/**
 * A namespace containing functions for working with version numbers.
 */
export declare namespace Version {
    /**
     * Determines whether the given value is a valid Version object.
     * @param value - The value to check.
     * @returns True if the value is a valid Version object, false otherwise.
     */
    function is(value: any): value is Version;
    /**
     * Parses a version string into a Version object.
     * @param value - The version string to parse.
     * @returns A Version object representing the parsed version string.
     */
    function parse(value: string): Version;
    /**
     * Creates a Version object from an array of version numbers.
     * @param version - An array of version numbers.
     * @returns A Version object representing the given version numbers.
     */
    function fromArray(version: number[]): Version;
    /**
     * Converts a Version object to a string.
     * @param value - The Version object to convert.
     * @returns A string representation of the given Version object.
     */
    function toString(value: Version): string;
    /**
     * Compares two Version objects, or two version strings, or two arrays of version numbers.
     * @param a - The first version to compare.
     * @param b - The second version to compare.
     * @returns 1 if a is greater than b, -1 if b is greater than a, or 0 if they are equal.
     */
    function compare(a: Version | string | number[], b: Version | string | number[]): number;
}
