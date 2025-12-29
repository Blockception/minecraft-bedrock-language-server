import { JsonPath } from '../json-path';
import { OffsetWord } from '../offset-word';
import { Position } from '../position';
import { Range } from '../range';

/**The type of a document location */
export type DocumentLocation = Position | OffsetWord | JsonPath | number;

/** A string or document object that can provide text */
export type TextOrDoc = string | { getText(): string };

/** Converts TextOrDoc to string */
function ToText(value: TextOrDoc): string {
  return typeof value === 'string' ? value : value.getText();
}

/**
 * Document location utilities
 */
export namespace DocumentLocation {
  /**
   * Converts a DocumentLocation to an offset number.
   * @param data The document location to convert (number, string path, Position, or OffsetWord)
   */
  export function toOffset(data: number): number;
  /**
   * Converts a DocumentLocation to an offset number.
   * @param data The document location to convert (number, string path, Position, or OffsetWord)
   */
  export function toOffset(data: OffsetWord): number;
  /**
   * Converts a DocumentLocation to an offset number.
   * @param loc The document location to convert (number, string path, Position, or OffsetWord)
   * @param text The text content or document object needed for conversion
   * @returns The offset number representing the location
   */
  export function toOffset(data: DocumentLocation, text: TextOrDoc): number;

  /**
   * Converts a DocumentLocation to an offset number.
   * @param loc The document location to convert (number, string path, Position, or OffsetWord)
   * @param text The text content or document object needed for conversion
   * @returns The offset number representing the location
   */
  export function toOffset(loc: DocumentLocation, text?: TextOrDoc): number {
    switch (typeof loc) {
      case 'number':
        return loc;

      //Json path
      case 'string':
        if (text === undefined) throw new Error('text or document must be provided');
        return JsonPath.resolve(text, loc);

      //Position
      case 'object':
        if (OffsetWord.is(loc)) {
          return loc.offset;
        }

        if (text === undefined) throw new Error('text or document must be provided');
        return Position.toOffset(loc, ToText(text));

      default:
        return 0;
    }
  }

  /**
   * Converts a DocumentLocation to a Position object.
   * Handles conversion from numbers, JSON paths, and Position/OffsetWord objects.
   * @param data The document location to convert (number, string path, Position, or OffsetWord)
   * @param text The text content or document object needed for conversion
   * @returns A Position object representing the location
   */
  export function toPosition(data: DocumentLocation, text: TextOrDoc): Position {
    switch (typeof data) {
      case 'number':
        return Position.toPosition(data, ToText(text));

      //Json path
      case 'string':
        return Position.toPosition(JsonPath.resolve(text, data), ToText(text));

      //Position
      case 'object':
        if (OffsetWord.is(data)) {
          return Position.toPosition(data.offset, data.text);
        }

        return data;

      default:
        return Position.create(0, 0);
    }
  }

  /**
   * Converts a DocumentLocation to a Range object.
   * @param data The document location to convert (OffsetWord)
   */
  export function toRange(data: OffsetWord): Range;
  /**
   * Converts a DocumentLocation to a Range object.
   * @param data The document location to convert (number, string path, Position)
   * @param text The text content or document object needed for conversion
   * @param length The length of the range
   * @returns A Range object representing the location
   */
  export function toRange(data: DocumentLocation, text: TextOrDoc, length: number): Range;

  /**
   * Converts a DocumentLocation to a Range object.
   * @param data The document location to convert (number, string path, Position)
   * @param text The text content or document object needed for conversion
   * @param length The length of the range
   * @returns A Range object representing the location
   */
  export function toRange(data: DocumentLocation, text?: TextOrDoc, length?: number): Range {
    if (OffsetWord.is(data)) {
      const t = data.text;
      return Range.create(Position.toPosition(data.offset, t), Position.toPosition(data.offset + t.length, t));
    }
    if (text === undefined) throw new Error('requires text or document');
    if (length === undefined) throw new Error('requires length');

    const startindex = toOffset(data, text);
    const endindex = startindex + length;
    const t = ToText(text);

    return Range.create(Position.toPosition(startindex, t), Position.toPosition(endindex, t));
  }
}
