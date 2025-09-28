/** */
export interface OffsetWord {
  /** */
  text: string;
  /** */
  offset: number;
}

/**
 *
 */
export namespace OffsetWord {
  /**
   * Creates a new OffsetWord
   * @param text The text to use
   * @param number The offset to use
   * @returns A new OffsetWord
   */
  export function create(text: string, offset?: number): OffsetWord {
    offset = offset || 0;
    return { text, offset };
  }

  /**
   *
   * @param value
   * @returns
   */
  export function is(value: any): value is OffsetWord {
    if (typeof value === "object" && typeof value.text === "string" && typeof value.offset === "number") return true;

    return false;
  }
}
