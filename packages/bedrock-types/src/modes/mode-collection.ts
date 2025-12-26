/** The interface that marks a gamemode*/
export interface ModeCollection {
  /**The collection of different modes*/
  modes: Mode[];
  /**The name of the collection*/
  name: string;
}

/** The mode interface */
export interface Mode {
  /**The name of this mode*/
  name: string;
  /**The documentation of this mode*/
  documentation: string;
  /** */
  eduOnly?: boolean;
}

/** */
export namespace ModeCollection {
  /**Checks if the given object is implements ModeCollection
   * @param value
   * @returns
   */
  export function is(value: any): value is ModeCollection {
    if (value) {
      const temp = value as ModeCollection;

      if (temp.name && temp.modes && Array.isArray(value.modes)) return true;
    }

    return false;
  }

  /**
   * Checks if a given value exists as a mode name in the collection.
   * @param Collection The mode collection to search
   * @param value The mode name to look for
   * @returns True if the value exists as a mode name, false otherwise
   */
  export function isValue(Collection: ModeCollection, value: string): boolean {
    const M = Collection.modes;

    for (let I = 0; I < M.length; I++) {
      const elem = M[I];

      if (elem.name === value) return true;
    }

    return false;
  }

  /**
   * Retrieves a mode from the collection by name or index.
   * @param Collection The mode collection to search
   * @param index The mode name (string) or array index (number) to retrieve
   * @returns The Mode object if found, undefined otherwise
   */
  export function get(Collection: ModeCollection, index: string | number): Mode | undefined {
    if (typeof index === 'string') {
      const M = Collection.modes;

      for (let I = 0; I < M.length; I++) {
        const elem = M[I];

        if (elem.name === index) return elem;
      }
    } else {
      return Collection.modes[index];
    }

    return undefined;
  }
}

/** */
export namespace Mode {
  /**
   * Type guard to check if a value is a valid Mode object.
   * @param value The value to check
   * @returns True if the value is a Mode with name and documentation strings, false otherwise
   */
  export function is(value: any): value is Mode {
    if (typeof value === 'object' && typeof value.name === 'string' && typeof value.documentation === 'string') {
      return true;
    }

    return false;
  }
}
