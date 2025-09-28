import { Types } from "bc-minecraft-bedrock-types";
import * as General from "../general/controllers/state";
import { FormatVersion } from "../types/format-version";

/** */
export interface AnimationControllers extends Readonly<FormatVersion> {
  /** */
  format_version: string;
  /** */
  animation_controllers: {
    /** */
    [controller: string]: AnimationController;
  };
}

/** */
export namespace AnimationControllers {
  /**
   *
   * @param value
   * @returns
   */
  export function is(value: any): value is AnimationControllers {
    if (
      typeof value === "object" &&
      typeof value.format_version === "string" &&
      typeof value.animation_controllers === "object"
    )
      return true;

    return false;
  }
}

/** */
export interface AnimationController {
  /** */
  initial_state?: string;
  /** */
  states: Record<string, State>;
}

/** */
export namespace AnimationController {
  /**
   *
   * @param value
   * @returns
   */
  export function is(value: any): value is AnimationController {
    if (typeof value === "object" && typeof value.states === "object") return true;

    return false;
  }
}

/** */
export interface State extends General.State {
  /** */
  blend_transition?: number;
  /** */
  blend_via_shortest_path?: boolean;
  /** */
  particle_effects?: { effect?: string; locator?: string }[];
  /** */
  sound_effects?: { effect?: string }[];
  /** */
  variables?: Types.Definition;
}

/** */
export namespace State {
  /**
   *
   * @param value
   * @returns
   */
  export function is(value: any): value is State {
    if (typeof value === "object") return true;

    return false;
  }
}
