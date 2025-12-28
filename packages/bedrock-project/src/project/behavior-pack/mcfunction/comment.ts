export function GetComment(line: string): string {
  const index = line.indexOf('#');

  if (index < 0) return '';

  return line.slice(index + 1, line.length);
}
