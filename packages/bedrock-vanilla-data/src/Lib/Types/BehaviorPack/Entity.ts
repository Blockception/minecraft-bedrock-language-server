import { Identifiable } from "../Identifiable";

/**
 *
 */
export interface Entity extends Identifiable {
  /**
   *
   */
  events: string[];

  /**
   *
   */
  families: string[];
}

/**
 *
 */
export namespace Entity {
  /**
   *
   * @param value
   * @returns
   */
  export function is(value: any): value is Entity {
    if (value) {
      if (typeof value.id === "string" && Array.isArray(value.events)) return true;
    }

    return false;
  }
}
