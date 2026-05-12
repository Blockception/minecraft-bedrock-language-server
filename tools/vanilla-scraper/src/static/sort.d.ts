import { IIdentifier } from '../interfaces';
import { INamed } from '../interfaces';
/**
 * String comparison function for sorting
 */
export declare function stringSort(x: string, y: string): number;
/**
 * Sort comparison function for INamed objects
 */
export declare function namedSort<T extends INamed>(x: T, y: T): number;
/**
 * Sort comparison function for IIdentifier objects
 */
export declare function idSort<T extends IIdentifier>(x: T, y: T): number;
//# sourceMappingURL=sort.d.ts.map