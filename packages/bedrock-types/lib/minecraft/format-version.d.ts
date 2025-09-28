/**
 * The format version of the given minecraft bedrock edition version.
 */
export type FormatVersion = `${string}.${string}.${string}` | `${string}.${string}`;
export type Version = [number, number, number];
/**
 * Parses the given data into a format version.
 */
export declare namespace FormatVersion {
    /**
     * Parses the given data into a format version.
     * @param data The data to parse.
     * @returns The parsed format version.
     */
    function parse(data: string): Version;
    function unwrap(value: Version | FormatVersion): Version;
    function isEqual(a: Version | FormatVersion, b: Version | FormatVersion): boolean;
    /**
     * Checks if a is lower then b
     * @example isLessThan("1.12.00", [1.30.0]) => true
     */
    function isLessThan(a: Version | FormatVersion, b: Version | FormatVersion): boolean;
    function isLessOrEqualThan(a: Version | FormatVersion, b: Version | FormatVersion): boolean;
    function isGreaterThan(a: Version | FormatVersion, b: Version | FormatVersion): boolean;
    function isGreaterOrEqualThan(a: Version | FormatVersion, b: Version | FormatVersion): boolean;
}
