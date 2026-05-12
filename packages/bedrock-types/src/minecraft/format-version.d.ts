/**
 * The format version of the given minecraft bedrock edition version.
 */
export type FormatVersion = `${string}.${string}.${string}` | `${string}.${string}`;
export type Version = [number, number, number];
type Versioned = FormatVersion | Version | string;
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
    function unwrap(value: Versioned): Version;
    function isEqual(a: Versioned, b: Versioned): boolean;
    /**
     * Checks if a is lower then b
     * @example isLessThan("1.12.00", [1.30.0]) => true
     */
    function isLessThan(a: Versioned, b: Versioned): boolean;
    function isLessOrEqualThan(a: Versioned, b: Versioned): boolean;
    function isGreaterThan(a: Versioned, b: Versioned): boolean;
    function isGreaterOrEqualThan(a: Versioned, b: Versioned): boolean;
}
export {};
//# sourceMappingURL=format-version.d.ts.map