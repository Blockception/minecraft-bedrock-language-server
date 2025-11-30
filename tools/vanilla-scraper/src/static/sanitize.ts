export function ensureProperties<T>(items: T[], constructofn: () => T): T[] {
  return items.map((item) => {
    return {
      ...constructofn(),
      ...item,
    };
  });
}
