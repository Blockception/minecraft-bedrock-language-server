import { FormatVersion } from "../types/format-version";

/** */
export interface Animation {
  /** */
  animation_length?: number;
  /** */
  anim_time_update?: number | string;
  /** */
  loop?: boolean | "hold_on_last_frame";

  /** */
  bones?: Record<"string", BoneAnimation>;
  /** */
  particle_effects?: Record<string, EffectLocator | EffectLocator[]>;
  /** */
  sound_effects?: Record<string, Effect | Effect[]>;
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

// Vector that can be molang
type Vec3 = [number | string, number | string, number | string];

export interface BoneAnimation {
  rotation?: Vec3 | Record<string, Vec3 | string> | string;
  position?: Vec3 | Record<string, Vec3 | string> | string;
  scale?: Vec3 | Record<string, Vec3 | string> | string;
}

export interface EffectLocator {
  effect?: string;
  locator?: string;
}

export interface Effect {
  effect?: string;
}
