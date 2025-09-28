import { Locatable, Documentated, Identifiable, Location } from '../types';

/**TODO add documentation
 *
 */
export interface BlockState {
  /** */
  property: string;
  /** */
  value: string;
}

/**TODO add documentation
 *
 */
export namespace BlockState {
  /**TODO add documentation
   *
   * @param data
   * @returns
   */
  export function parse(data: string): BlockState | undefined {
    const index = data.indexOf("=");

    if (index > -1) {
      const k = data.slice(0, index);
      const v = data.slice(index + 1);

      return { property: k, value: v };
    }

    return undefined;
  }

  /**TODO add documentation
   *
   * @param property
   * @param value
   * @returns
   */
  export function create(property: string, value: string) {
    return {
      property: property,
      value: value,
    };
  }
}

/**TODO add documentation
 *
 */
export interface Block extends Locatable, Documentated, Identifiable {
  /** */
  states: BlockState[];
}

/**TODO add documentation
 *
 */
export namespace Block {
  /**TODO add documentation
   *
   * @param id
   * @param Location
   * @returns
   */
  export function create(id: string, Location: Location): Block {
    return {
      id: id,
      states: [],
      location: Location,
    };
  }

  /**TODO add documentation
   *
   * @param blockDescription
   * @returns
   */
  export function getId(blockDescription: string): string {
    const index = blockDescription.indexOf("[");

    if (index > -1) {
      return blockDescription.slice(0, index);
    }

    return blockDescription;
  }

  /**TODO add documentation
   *
   * @param blockDescription
   * @returns
   */
  export function getStates(blockDescription: string): BlockState[] {
    const out: BlockState[] = [];
    let startIndex = blockDescription.indexOf("[");

    if (startIndex > -1) {
      startIndex++;
      let endIndex = blockDescription.indexOf("]", startIndex + 1);

      if (endIndex < startIndex) endIndex = blockDescription.length;

      const parts = blockDescription.slice(startIndex, endIndex).split(",");

      for (let I = 0; I < parts.length; I++) {
        const b = BlockState.parse(parts[I]);
        if (b) out.push(b);
      }
    }

    return out;
  }

  /**TODO add documentation
   *
   * @param blockDescription
   */
  export function fromBlockDescriptor(blockDescription: string, Loc: Location | undefined = undefined): Block {
    if (!Loc) Loc = Location.empty();

    const out: BlockState[] = [];
    let id: string;
    let startIndex = blockDescription.indexOf("[");

    if (startIndex > -1) {
      id = blockDescription.slice(0, startIndex);
      startIndex++;
      let endIndex = blockDescription.indexOf("]", startIndex + 1);

      if (endIndex < startIndex) endIndex = blockDescription.length;

      const parts = blockDescription.slice(startIndex, endIndex).split(",");

      for (let I = 0; I < parts.length; I++) {
        const b = BlockState.parse(parts[I]);
        if (b) out.push(b);
      }
    } else {
      id = blockDescription;
    }

    const block = Block.create(id, Loc);
    block.states = out;

    return block;
  }
}
