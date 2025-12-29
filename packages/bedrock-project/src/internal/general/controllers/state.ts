import { Conditional } from '@blockception/packages-shared';


/** */
export interface State {
  /** */
  animations?: (Conditional | string)[];
  /** */
  on_entry?: string[];
  /** */
  on_exit?: string[];
  /** */
  transitions?: Conditional[];
}

/** */
export namespace State {
  /**
   *
   * @param value
   * @returns
   */
  export function is(value: any): value is State {
    if (typeof value === 'object') return true;

    return false;
  }
}
