/** A version object*/
export interface Version {
  /**The major version*/
  major: number;
  /**The minor version*/
  minor: number;
  /**The patch version*/
  patch: number;
}

/**
 * A namespace containing functions for working with version numbers.
 */
export namespace Version {
  /**
   * Determines whether the given value is a valid Version object.
   * @param value - The value to check.
   * @returns True if the value is a valid Version object, false otherwise.
   */
  export function is(value: any): value is Version {
    if (typeof value === "object") {
      if (typeof value.major !== "number") return false;
      if (typeof value.minor !== "number") return false;
      if (typeof value.patch !== "number") return false;

      return true;
    }

    return false;
  }

  /**
   * Parses a version string into a Version object.
   * @param value - The version string to parse.
   * @returns A Version object representing the parsed version string.
   */
  export function parse(value: string): Version {
    const out: Version = {
      major: 0,
      minor: 0,
      patch: 0,
    };

    const p = value.split(".");

    switch (p.length) {
      default:
      case 3:
        out.patch = Number.parseInt(p[2]);
        // fallthrough
      case 2:
        out.minor = Number.parseInt(p[1]);
        // fallthrough
      case 1:
        out.major = Number.parseInt(p[0]);
        // fallthrough
      case 0:
        break;
    }

    return out;
  }

  /**
   * Creates a Version object from an array of version numbers.
   * @param version - An array of version numbers.
   * @returns A Version object representing the given version numbers.
   */
  export function fromArray(version: number[]): Version {
    const out: Version = {
      major: 0,
      minor: 0,
      patch: 0,
    };

    switch (version.length) {
      default:
      case 3:
        out.patch = version[2];
        // fallthrough
      case 2:
        out.minor = version[1];
        // fallthrough
      case 1:
        out.major = version[0];
        // fallthrough
      case 0:
        break;
    }

    return out;
  }

  /**
   * Converts a Version object to a string.
   * @param value - The Version object to convert.
   * @returns A string representation of the given Version object.
   */
  export function toString(value: Version): string {
    return `${value.major}.${value.minor}.${value.patch}`;
  }

  /**
   * Compares two Version objects, or two version strings, or two arrays of version numbers.
   * @param a - The first version to compare.
   * @param b - The second version to compare.
   * @returns 1 if a is greater than b, -1 if b is greater than a, or 0 if they are equal.
   */
  export function compare(a: Version | string | number[], b: Version | string | number[]): number {
    if (typeof a === "string") {
      a = Version.parse(a);
    } else if (Array.isArray(a)) {
      a = Version.fromArray(a);
    }

    if (typeof b === "string") {
      b = Version.parse(b);
    } else if (Array.isArray(b)) {
      b = Version.fromArray(b);
    }

    let r: number;
    if ((r = Math.sign(a.major - b.major)) !== 0) return r;
    if ((r = Math.sign(a.minor - b.minor)) !== 0) return r;

    return Math.sign(a.patch - b.patch);
  }
}
