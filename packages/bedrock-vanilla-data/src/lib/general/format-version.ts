export type FormatVersion = `${string}.${string}.${string}` | `${string}.${string}`;

export interface FormatVersionData {
  latest: FormatVersion;
  versions: FormatVersion[];
}
