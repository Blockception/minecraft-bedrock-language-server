import { FormatVersion } from "../types/format-version";

/** */
export interface Material extends Readonly<FormatVersion> {
  /** */
  format_version: string;
  /** */
  [material: string]: any;
}
/** */
export namespace Material {
  export function is(value: any): value is Material {
    if (typeof value === "object" && typeof value.format_version === "string") {
      return true;
    }

    return false;
  }
}
