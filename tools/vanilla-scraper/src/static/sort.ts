import { IIdentifier } from '../interfaces';
import { INamed } from '../interfaces';

/**
 * String comparison function for sorting
 */
export function stringSort(x: string, y: string): number {
  return x.localeCompare(y);
}

/**
 * Sort comparison function for INamed objects
 */
export function namedSort<T extends INamed>(x: T, y: T): number {
  return stringSort(x.name, y.name);
}

/**
 * Sort comparison function for IIdentifier objects
 */
export function idSort<T extends IIdentifier>(x: T, y: T): number {
  return stringSort(x.id, y.id);
}
