import { FormatVersion } from "../types";

/** */
export interface Animation {
  /** */
  animation_length?: number;
  /** */
  loop?: boolean;
  /** */
  timeline?: Record<string, string | string[]>;
}

/** */
export namespace Animation {
  /**
   *
   * @param value
   * @returns
   */
  export function is(value: any): value is Animation {
    return typeof value === "object";
  }
}

/** */
export interface Animations extends Readonly<FormatVersion> {
  /** */
  format_version: string;

  /** */
  animations: {
    /** */
    [animation: string]: Animation;
  };
}

/** */
export namespace Animations {
  /**
   *
   * @param value
   * @returns
   */
  export function is(value: any): value is Animations {
    if (value && typeof value.format_version === "string" && typeof value.animations === "object") return true;

    return false;
  }
}
