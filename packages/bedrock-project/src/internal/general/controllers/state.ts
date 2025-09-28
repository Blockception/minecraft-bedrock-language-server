import { Types } from 'bc-minecraft-bedrock-types';

/** */
export interface State {
  /** */
  animations?: (Types.Conditional | string)[];
  /** */
  on_entry?: string[];
  /** */
  on_exit?: string[];
  /** */
  transitions?: Types.Conditional[];
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