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

  /**TODO add documentation
   *
   */
  export function isValue(Collection: ModeCollection, value: string): boolean {
    const M = Collection.modes;

    for (let I = 0; I < M.length; I++) {
      const elem = M[I];

      if (elem.name === value) return true;
    }

    return false;
  }

  /**TODO add documentation
   *
   * @param Collection
   * @param index
   * @returns
   */
  export function get(Collection: ModeCollection, index: string | number): Mode | undefined {
    if (typeof index === "string") {
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
  /**TODO add documentation
   *
   * @param value
   * @returns
   */
  export function is(value: any): value is Mode {
    if (typeof value === "object" && typeof value.name === "string" && typeof value.documentation === "string") {
      return true;
    }

    return false;
  }
}
