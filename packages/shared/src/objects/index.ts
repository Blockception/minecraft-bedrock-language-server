/**
 * Safely gets the keys of an object, returning an empty array if the value is null/undefined.
 * @param obj The object to get keys from
 * @returns Array of keys, or empty array if obj is null/undefined
 */
export function safeObjectKeys<T extends object>(obj: T | null | undefined): Array<keyof T> {
  if (obj == null) return [];
  return Object.keys(obj) as Array<keyof T>;
}

/**
 * Safely gets the entries of an object, returning an empty array if the value is null/undefined.
 * @param obj The object to get entries from
 * @returns Array of [key, value] tuples, or empty array if obj is null/undefined
 */
export function safeObjectEntries<T extends object>(
  obj: T | null | undefined
): Array<[keyof T, T[keyof T]]> {
  if (obj == null) return [];
  return Object.entries(obj) as Array<[keyof T, T[keyof T]]>;
}

/**
 * Safely gets the values of an object, returning an empty array if the value is null/undefined.
 * @param obj The object to get values from
 * @returns Array of values, or empty array if obj is null/undefined
 */
export function safeObjectValues<T extends object>(obj: T | null | undefined): Array<T[keyof T]> {
  if (obj == null) return [];
  return Object.values(obj);
}
