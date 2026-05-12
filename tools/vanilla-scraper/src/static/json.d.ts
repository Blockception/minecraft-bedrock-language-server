export interface JsonDocumentOptions {
    allowTrailingCommas?: boolean;
    skipComments?: boolean;
}
/**
 * Load and parse a JSON file
 */
export declare function load<T>(filepath: string): T | null;
/**
 * Load and parse a JSON file, returning a new instance if file doesn't exist
 */
export declare function loadEnsure<T>(filepath: string): T[];
/**
 * Load a JSON file containing a string array, returning an empty array if file doesn't exist.
 * Handles both plain string arrays and arrays of objects with an 'id' or 'name' property.
 */
export declare function loadStringArray(filepath: string): string[];
/**
 * Save data to a JSON file
 */
export declare function save<T>(data: T, filepath: string): void;
/**
 * Parse a JSON document from a file
 */
export declare function getDoc(filepath: string): object | null;
//# sourceMappingURL=json.d.ts.map