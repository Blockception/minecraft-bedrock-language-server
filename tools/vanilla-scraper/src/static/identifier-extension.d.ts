import { IIdentifier } from '../interfaces';
/**
 * Check if array has an item with the given ID
 */
export declare function hasId<T extends IIdentifier>(data: T[], findId: string, startIndex?: number): boolean;
/**
 * Clean and deduplicate IIdentifier list, keeping last occurrence of each ID
 */
export declare function cleanIdentifiers<T extends IIdentifier>(data: T[], excluded?: T[]): T[];
/**
 * Clean and deduplicate string list
 */
export declare function cleanStrings(data: string[]): string[];
/**
 * Duplicate list with items without minecraft: prefix
 */
export declare function duplicateWithoutNamespace(items: string[]): string[];
//# sourceMappingURL=identifier-extension.d.ts.map