/**
 * Convert property name to snake_case
 */
export declare function toSnakeCase(name: string): string;
/**
 * Convert object keys to snake_case recursively
 */
export declare function convertToSnakeCase(obj: unknown): unknown;
/**
 * Save array data to a TypeScript file
 */
export declare function saveArray<T>(type: string, typeLocation: string | null, name: string, data: T, filepath: string): void;
/**
 * Save single object data to a TypeScript file
 */
export declare function saveSingle<T>(type: string, typeLocation: string | null, name: string, data: T, filepath: string): void;
//# sourceMappingURL=typescript.d.ts.map