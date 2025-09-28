import { Identifiable } from "../Identifiable";

/**
 *
 */
export interface Item extends Identifiable {
  /**
   *
   */
  max_damage: number;
}

/**
 *
 */
export namespace Item {
  /**
   *
   * @param value
   * @returns
   */
  export function is(value: any): value is Item {
    if (value) {
      if (typeof value.id === "string" && typeof value.max_damage === "number") return true;
    }

    return false;
  }
}
