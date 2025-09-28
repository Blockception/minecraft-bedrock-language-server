export function contains<T>(set: Set<T>, predicate: (item: T) => boolean): boolean {
  for (const entry of set.values()) {
    if (predicate(entry)) return true;
  }

  return false;
}
