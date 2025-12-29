/**
 * Represents a word or text fragment at a specific offset in a document.
 * Useful for tracking text selections and their positions.
 */
export interface OffsetWord {
  /**The text content of the word*/
  text: string;
  /**The zero-based character offset where the word begins*/
  offset: number;
}

/**
 * Namespace containing utility functions for working with OffsetWord objects.
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
   * Type guard to check if a value is a valid OffsetWord object.
   * @param value The value to check
   * @returns True if the value has text (string) and offset (number) properties, false otherwise
   */
  export function is(value: any): value is OffsetWord {
    if (typeof value === 'object' && typeof value.text === 'string' && typeof value.offset === 'number') return true;

    return false;
  }
}
