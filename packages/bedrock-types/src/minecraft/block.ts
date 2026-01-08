import { Documentated, Identifiable, Locatable, Location } from 'bc-minecraft-bedrock-shared';

/**
 * Represents a single block state property with its value.
 * Block states are key-value pairs that define specific properties of a Minecraft block (e.g., facing=north, open=true).
 */
export interface BlockState {
  /** The name of the block state property */
  property: string;
  /** The value of the block state property */
  value: string;
}

/**
 * Namespace containing utility functions for working with BlockState objects.
 */
export namespace BlockState {
  /**
   * Parses a string representation of a block state into a BlockState object.
   * Expected format is "property=value".
   * @param data The string to parse (e.g., "facing=north")
   * @returns A BlockState object if parsing succeeds, undefined otherwise
   */
  export function parse(data: string): BlockState | undefined {
    const index = data.indexOf('=');

    if (index > -1) {
      const k = data.slice(0, index);
      const v = data.slice(index + 1);

      return { property: k, value: v };
    }

    return undefined;
  }

  /**
   * Creates a new BlockState object from a property name and value.
   * @param property The name of the block state property
   * @param value The value of the block state property
   * @returns A new BlockState object
   */
  export function create(property: string, value: string) {
    return {
      property: property,
      value: value,
    };
  }
}

/**
 * Represents a Minecraft block with its identifier, location, and optional block states.
 * Extends Locatable (has a location), Documentated (has documentation), and Identifiable (has an id).
 */
export interface Block extends Locatable, Documentated, Identifiable {
  /** The collection of block states associated with this block */
  states: BlockState[];
}

/**
 * Namespace containing utility functions for working with Block objects.
 */
export namespace Block {
  /**
   * Creates a new Block object with the given identifier and location.
   * @param id The block identifier (e.g., "minecraft:stone")
   * @param Location The location where this block is referenced
   * @returns A new Block object with an empty states array
   */
  export function create(id: string, Location: Location): Block {
    return {
      id: id,
      states: [],
      location: Location,
    };
  }

  /**
   * Extracts the block identifier from a block description string.
   * If the description contains block states (indicated by '['), returns only the ID portion.
   * @param blockDescription A block description string (e.g., "minecraft:stone[variant=granite]")
   * @returns The block identifier without states (e.g., "minecraft:stone")
   */
  export function getId(blockDescription: string): string {
    const index = blockDescription.indexOf('[');

    if (index > -1) {
      return blockDescription.slice(0, index);
    }

    return blockDescription;
  }

  /**
   * Extracts all block states from a block description string.
   * Parses the content between '[' and ']' and splits by comma.
   * @param blockDescription A block description string (e.g., "minecraft:stone[variant=granite,smooth=true]")
   * @returns An array of BlockState objects parsed from the description
   */
  export function getStates(blockDescription: string): BlockState[] {
    const out: BlockState[] = [];
    let startIndex = blockDescription.indexOf('[');

    if (startIndex > -1) {
      startIndex++;
      let endIndex = blockDescription.indexOf(']', startIndex + 1);

      if (endIndex < startIndex) endIndex = blockDescription.length;

      const parts = blockDescription.slice(startIndex, endIndex).split(',');

      for (let I = 0; I < parts.length; I++) {
        const b = BlockState.parse(parts[I]);
        if (b) out.push(b);
      }
    }

    return out;
  }

  /**
   * Creates a Block object from a complete block descriptor string.
   * Parses both the block identifier and any block states from the descriptor.
   * @param blockDescription A complete block descriptor (e.g., "minecraft:stone[variant=granite,smooth=true]")
   * @param Loc Optional location for the block; if not provided, creates an empty location
   * @returns A new Block object with the parsed id and states
   */
  export function fromBlockDescriptor(blockDescription: string, Loc: Location | undefined = undefined): Block {
    if (!Loc) Loc = Location.empty();

    const out: BlockState[] = [];
    let id: string;
    let startIndex = blockDescription.indexOf('[');

    if (startIndex > -1) {
      id = blockDescription.slice(0, startIndex);
      startIndex++;
      let endIndex = blockDescription.indexOf(']', startIndex + 1);

      if (endIndex < startIndex) endIndex = blockDescription.length;

      const parts = blockDescription.slice(startIndex, endIndex).split(',');

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
