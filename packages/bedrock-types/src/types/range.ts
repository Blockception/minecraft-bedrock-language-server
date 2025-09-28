import { Position } from "./position";

/** */
export interface Range {
  /** */
  start: Position;
  /** */
  end: Position;
}

/** */
export namespace Range {
  /**TODO add documentation
   *
   * @param value
   * @returns
   */
  export function is(value: any): value is Position {
    if (value && Position.is(value.start) && Position.is(value.end)) return true;

    return false;
  }

  /**TODO add documentation
   *
   * @param start
   * @param end
   * @returns
   */
  export function create(start: Position, end: Position): Range {
    return { start: start, end: end };
  }

  /**TODO add documentation
   *
   * @param start
   * @param end
   * @returns
   */
  export function createR(startLine: number, startOffset: number, endLine: number, endOffset: number): Range {
    return { start: { character: startOffset, line: startLine }, end: { character: endOffset, line: endLine } };
  }
}
