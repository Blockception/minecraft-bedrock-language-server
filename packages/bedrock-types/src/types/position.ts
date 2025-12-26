/** */
export interface Position {
  /** */
  line: number;
  /** */
  character: number;
}

/** */
export namespace Position {
  /**
   * Type guard to check if a value is a valid Position object.
   * @param value The value to check
   * @returns True if the value has line and character number properties, false otherwise
   */
  export function is(value: any): value is Position {
    if (value && typeof value.line === 'number' && typeof value.character === 'number') return true;

    return false;
  }

  /**
   * Creates a new Position object with the specified line and character offset.
   * @param line The line number (defaults to 0)
   * @param character The character offset within the line (defaults to 0)
   * @returns A new Position object
   */
  export function create(line: number = 0, character: number = 0): Position {
    return { line: line, character: character };
  }

  const NewLine = '\n'.charCodeAt(0);

  /**Converts the position to an offset
   * @param position
   * @param text
   * @returns
   */
  export function toOffset(position: Position, text: string | { offsetAt(position: Position): number }): number {
    if (typeof text === 'object') return text.offsetAt(position);

    //Line count
    let count = 0;
    //Offset of the last newline found
    let index = 0;

    for (let i = 0; i < text.length; i++) {
      const c = text.charCodeAt(i);

      if (c == NewLine) {
        count++;
        index = i + 1;

        if (count >= position.line) {
          return index + position.character;
        }
      }
    }

    return position.character;
  }

  /**
   *
   * @param offset
   * @param text
   * @returns
   */
  export function toPosition(offset: number, text: string | { positionAt(offset: number): Position }): Position {
    if (typeof text === 'object') return text.positionAt(offset);

    //Line count
    let count = 0;
    //Offset of the last newline found
    let index = 0;

    for (let I = 0; I < offset; I++) {
      const c = text.charCodeAt(I);

      if (c == NewLine) {
        count++;
        index = I + 1;
      }
    }

    return Position.create(count, offset - index);
  }
}
