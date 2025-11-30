/**
 * Add item to list if not already present
 */
export function addOrSkip(items: string[], add: string): void {
  if (!items.includes(add)) {
    items.push(add);
  }
}
