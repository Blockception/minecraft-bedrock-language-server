import { IIdentifier } from '../interfaces';
import { idSort, stringSort } from './sort';

/**
 * Check if array has an item with the given ID
 */
export function hasId<T extends IIdentifier>(data: T[], findId: string, startIndex = 0): boolean {
  for (let i = startIndex; i < data.length; i++) {
    if (data[i].id === findId) {
      return true;
    }
  }
  return false;
}

/**
 * Clean and deduplicate IIdentifier list, keeping last occurrence of each ID
 */
export function cleanIdentifiers<T extends IIdentifier>(data: T[], excluded?: T[]): T[] {
  const out: T[] = [];

  // Walk backwards to keep last occurrence
  for (let i = data.length - 1; i >= 0; i--) {
    const item = data[i];
    const id = item.id;

    // Skip if excluded or already in output
    if (excluded && hasId(excluded, id)) {
      continue;
    }
    if (hasId(out, id)) {
      continue;
    }

    out.push(item);
  }

  out.sort(idSort);
  return out;
}

/**
 * Clean and deduplicate string list
 */
export function cleanStrings(data: string[]): string[] {
  const unique = [...new Set(data)];
  unique.sort(stringSort);
  return unique;
}

/**
 * Duplicate list with items without minecraft: prefix
 */
export function duplicateWithoutNamespace(items: string[]): string[] {
  const result: string[] = [...items];

  for (const item of items) {
    if (item.startsWith('minecraft:')) {
      result.push(item.substring(10));
    }
  }

  return result;
}
