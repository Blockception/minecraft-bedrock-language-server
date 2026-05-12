/**
 * Represents a path string used to locate elements within JSON documents.
 * Paths use forward slashes as separators (e.g., "/property/subproperty").
 */
export type JsonPath = string;
/**
 * Namespace containing utility functions for working with JSON paths.
 */
export declare namespace JsonPath {
    /**The separator character used in JSON paths*/
    const seperator = "/";
    /**
     * Resolves a JSON path to an offset position in the text.
     * Searches for path components in the text and returns the position of the last found component.
     * @param text The text content or an object with a getText() method
     * @param path The JSON path to resolve (e.g., "/property/subproperty")
     * @returns The character offset in the text where the path resolves to
     */
    function resolve(text: string | {
        getText(): string;
    }, path: JsonPath): number;
    /**
     * Creates a JSON path from multiple path segments.
     * @param path Variable number of path segments to join
     * @returns A JSON path string with segments joined by the separator
     */
    function create(...path: string[]): JsonPath;
    /**
     * Type guard to check if a value is a valid JsonPath (string).
     * @param value The value to check
     * @returns True if the value is a string, false otherwise
     */
    function is(value: any): value is JsonPath;
}
//# sourceMappingURL=types.d.ts.map