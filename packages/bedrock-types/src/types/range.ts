import { Position } from './position';

/** */
export interface Range {
  /** */
  start: Position;
  /** */
  end: Position;
}

/** */
export namespace Range {
  /**
   * Type guard to check if a value is a valid Range object.
   * @param value The value to check
   * @returns True if the value has valid start and end Position objects, false otherwise
   */
  export function is(value: any): value is Range {
    if (value && Position.is(value.start) && Position.is(value.end)) return true;

    return false;
  }

  /**
   * Creates a new Range object from start and end Position objects.
   * @param start The starting position of the range
   * @param end The ending position of the range
   * @returns A new Range object
   */
  export function create(start: Position, end: Position): Range {
    return { start: start, end: end };
  }

  /**
   * Creates a new Range object from raw line and character offset values.
   * @param startLine The line number of the start position
   * @param startOffset The character offset of the start position
   * @param endLine The line number of the end position
   * @param endOffset The character offset of the end position
   * @returns A new Range object
   */
  export function createR(startLine: number, startOffset: number, endLine: number, endOffset: number): Range {
    return { start: { character: startOffset, line: startLine }, end: { character: endOffset, line: endLine } };
  }
}
