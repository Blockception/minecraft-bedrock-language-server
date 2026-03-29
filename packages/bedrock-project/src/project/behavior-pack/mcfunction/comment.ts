export function GetComment(line: string): string {
  const trimmed = line.trimStart();

  if (!trimmed.startsWith('#')) return '';

  const index = line.length - trimmed.length;
  return line.slice(index + 1, line.length);
}
