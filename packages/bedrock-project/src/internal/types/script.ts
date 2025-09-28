import { Types } from "bc-minecraft-bedrock-types";

/**A universal script component for RP and BP scripts*/
export interface Script {
  /**What animation / controllers to animate*/
  animate?: Types.Conditional[];
  /**Initialization of variables once*/
  initialize?: string[];
  /**Initialization of before animations*/
  pre_animation?: string[];
  /**Variables and their settings*/
  variables?: Types.Definition;
}

/** */
export namespace Script {
  /**
   *
   * @param value
   * @returns
   */
  export function is(value: any): value is Script {
    if (value) {
      if (Array.isArray(value.animate) || Array.isArray(value.initialize) || Array.isArray(value.pre_animation) || typeof value.variables === "object") return true;
    }

    return false;
  }
}

/** */
export interface ScriptContainer {
  /** */
  scripts?: Script;
  /** */
  animations?: Types.Definition;
}

/** */
export namespace ScriptContainer {
  /**
   *
   * @param value
   * @returns*/
  export function is(value: any): value is ScriptContainer {
    if (value) {
      if (typeof value.scripts === "object" || typeof value.animations === "object") return true;
    }

    return false;
  }
}
