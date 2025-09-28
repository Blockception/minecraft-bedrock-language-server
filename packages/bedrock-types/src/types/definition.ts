/**A Definition object
 * @example { "walk.anim": "animation.sheep.walk" }*/
export interface Definition {
  /**The reference is an internal reference to something that is to be used, such as animations / controllers*/
  [reference: string]: string;
}

/**The namespace that provides functionallity to definitions*/
export namespace Definition {
  /**
   * Counts the number of definitions in the given object
   * @param data The object to count the definitions in
   * @returns The number of definitions
   */
  export function count(data: Definition): number {
    return Object.getOwnPropertyNames(data).length;
  }

  /**Returns the idenfitication used
   * @param data The data to look through
   * @param index The index of the definition
   * @returns*/
  export function getId(data: Definition, index: number): string {
    const key = Object.getOwnPropertyNames(data)[index];

    return data[key];
  }

  /**Returns the idenfitication used
   * @param data The data to look through
   * @returns*/
  export function getIds(data: Definition): string[] {
    const out: string[] = [];
    const keys = Object.getOwnPropertyNames(data);

    for (let I = 0; I < keys.length; I++) {
      const k = keys[I];
      const value = data[k];

      if (typeof value === "string") out.push(value);
    }

    return out;
  }

  /**
   * @param data The data to look through
   * @param index The index of the definition
   * @returns
   */
  export function getReference(data: Definition, index: number): string {
    return Object.getOwnPropertyNames(data)[index];
  }

  /**
   * @param data The data to look through
   * @returns
   */
  export function getReferences(data: Definition): string[] {
    return Object.getOwnPropertyNames(data);
  }

  /**
   *
   * @param data
   * @param callbackfn
   * @returns
   */
  export function forEach(data: Definition | undefined, callbackfn: (reference: string, id: string, index: number, data: Definition) => void): void {
    if (!data) return;

    const keys = Object.getOwnPropertyNames(data);

    keys.forEach((reference, index) => {
      callbackfn(reference, data[reference], index, data);
    });
  }
}
