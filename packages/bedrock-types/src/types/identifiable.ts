/**The interface that governs if a object is identifiable*/
export interface Identifiable {
  /**The identifier of this object*/
  id: string;
}

/** */
export namespace Identifiable {
  /**TODO add documentation
   *
   * @param value
   * @returns
   */
  export function is(value: any): value is Identifiable {
    if (typeof value === "object" && typeof value.id === "string") return true;

    return false;
  }

  /**TODO add documentation
   *
   * @param items
   * @param id
   * @returns
   */
  export function has<T extends Identifiable>(items: T[], id: string): boolean {
    for (let I = 0; I < items.length; I++) {
      const elem = items[I];

      if (elem.id == id) return true;
    }

    return false;
  }

  /**TODO add documentation
   *
   * @param items
   * @param id
   * @returns
   */
  export function get<T extends Identifiable>(items: T[], id: string): T | undefined {
    for (let I = 0; I < items.length; I++) {
      const elem = items[I];

      if (elem.id === id) return elem;
    }

    return undefined;
  }

  /**TODO add documentation
   *
   * @param carrier
   * @returns
   */
  export function getId(carrier: string | Identifiable): string {
    if (typeof carrier === "string") return carrier;

    return carrier.id;
  }
}
