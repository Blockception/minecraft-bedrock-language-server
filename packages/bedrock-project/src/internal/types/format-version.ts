/** */
export interface FormatVersion {
  /** */
  format_version: string;
}

/** */
export namespace FormatVersion {
  /**
   *
   * @param value
   * @returns
   */
  export function is(value: any): value is FormatVersion {
    if (value && typeof value.format_version === "string") return true;

    return false;
  }

  /**
   *
   * @param value
   * @returns
   */
  export function get(value: FormatVersion | number[] | string): { major: number; minor: number; patch: number } {
    const out = { major: 0, minor: 0, patch: 0 };

    if (Array.isArray(value)) {
      switch (value.length) {
        default:
        case 3:
          out.major = value[2];
          out.minor = value[1];
          out.patch = value[0];
          break;

        case 2:
          out.minor = value[1];
          out.patch = value[0];
          break;

        case 1:
          out.patch = value[0];
          break;

        case 0:
          break;
      }
    } else if (typeof value === "object" && typeof value.format_version === "string") {
      value = value.format_version;
    }

    if (typeof value === "string") {
      const s = value.split(".");
      const max = Math.min(s.length, 3);

      switch (max) {
        case 3:
          out.major = Number.parseInt(s[2]);
          out.minor = Number.parseInt(s[1]);
          out.patch = Number.parseInt(s[0]);
          break;

        case 2:
          out.minor = Number.parseInt(s[1]);
          out.patch = Number.parseInt(s[0]);
          break;

        case 1:
          out.patch = Number.parseInt(s[0]);
          break;
      }
    }

    return out;
  }
}
