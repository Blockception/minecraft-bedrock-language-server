/**
 * Delegate type for converting JSON document to output items
 */
export type ConvertJson<T> = (doc: object, receiver: T[]) => void;
/**
 * Delegate type for converting file to output items
 */
export type ConvertFile<T> = (filepath: string, receiver: T[]) => void;
/**
 * Process all JSON files in a folder with a JSON converter
 */
export declare function fromFolderJson<T>(func: ConvertJson<T> | null, receiver: T[], folder: string): void;
/**
 * Process all JSON files in a folder with a file converter
 */
export declare function fromFolderFile<T>(func: ConvertFile<T> | null, receiver: T[], folder: string): void;
/**
 * Process a single file with a file converter
 */
export declare function fromFileFile<T>(func: ConvertFile<T> | null, receiver: T[], filepath: string): void;
/**
 * Process a single file with a JSON converter
 */
export declare function fromFileJson<T>(func: ConvertJson<T>, receiver: T[], filepath: string): void;
//# sourceMappingURL=convert.d.ts.map