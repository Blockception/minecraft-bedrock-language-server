export function quoteString(data: string): string {
  if (data.includes("'")) {
    return `"${data}"`;
  }

  return `'${data}'`;
}