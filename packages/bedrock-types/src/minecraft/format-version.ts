/**
 * The format version of the given minecraft bedrock edition version.
 */
export type FormatVersion = `${string}.${string}.${string}` | `${string}.${string}`;
export type Version = [number, number, number];

/**
 * Parses the given data into a format version.
 */
export namespace FormatVersion {
  /**
   * Parses the given data into a format version.
   * @param data The data to parse.
   * @returns The parsed format version.
   */
  export function parse(data: string): Version {
    if (data === "") return [0, 0, 0];

    const parts = data.split(".");

    const major = parseInt(parts[0] ?? "0");
    const minor = parseInt(parts[1] ?? "0");
    const patch = parseInt(parts[2] ?? "0");

    return [major, minor, patch];
  }

  export function unwrap(value: Version | FormatVersion): Version {
    if (typeof value === "string") return parse(value);

    return value;
  }

  export function isEqual(a: Version | FormatVersion, b: Version | FormatVersion) {
    a = unwrap(a);
    b = unwrap(b);

    return a[0] === b[0] && a[1] === b[1] && a[2] === b[2];
  }

  /**
   * Checks if a is lower then b
   * @example isLessThan("1.12.00", [1.30.0]) => true
   */
  export function isLessThan(a: Version | FormatVersion, b: Version | FormatVersion) {
    a = unwrap(a);
    b = unwrap(b);

    if (a[0] < b[0]) return true;
    if (a[0] > b[0]) return false;
    if (a[1] < b[1]) return true;
    if (a[1] > b[1]) return false;
    if (a[2] < b[2]) return true;
    if (a[2] > b[2]) return false;

    return false;
  }

  export function isLessOrEqualThan(a: Version | FormatVersion, b: Version | FormatVersion) {
    a = unwrap(a);
    b = unwrap(b);

    if (a[0] < b[0]) return true;
    if (a[0] > b[0]) return false;
    if (a[1] < b[1]) return true;
    if (a[1] > b[1]) return false;
    if (a[2] < b[2]) return true;
    if (a[2] > b[2]) return false;

    return true;
  }

  export function isGreaterThan(a: Version | FormatVersion, b: Version | FormatVersion): boolean {
    a = unwrap(a);
    b = unwrap(b);

    if (a[0] < b[0]) return false;
    if (a[0] > b[0]) return true;
    if (a[1] < b[1]) return false;
    if (a[1] > b[1]) return true;
    if (a[2] < b[2]) return false;
    if (a[2] > b[2]) return true;

    return false;
  }

  export function isGreaterOrEqualThan(a: Version | FormatVersion, b: Version | FormatVersion): boolean {
    a = unwrap(a);
    b = unwrap(b);

    if (a[0] < b[0]) return false;
    if (a[0] > b[0]) return true;
    if (a[1] < b[1]) return false;
    if (a[1] > b[1]) return true;
    if (a[2] < b[2]) return false;
    if (a[2] > b[2]) return true;

    return true;
  }
}
