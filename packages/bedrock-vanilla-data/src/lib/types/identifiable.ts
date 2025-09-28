/**The interface that governs if a object is identifiable*/
export interface Identifiable {
  /**The identifier of this object*/
  id: string;
}

/**
 *
 */
export namespace Identifiable {
  /**
   *
   * @param value
   * @returns
   */
  export function is(value: any): value is Identifiable {
    if (value && typeof value.id === "string") return true;

    return false;
  }

  /**
   *
   * @param items
   * @param find
   */
  export function find(items: Identifiable[], findID: string | Identifiable): number {
    const id = typeof findID === "string" ? findID : findID.id;

    for (let index = 0; index < items.length; index++) {
      if (items[index].id === id) return index;
    }

    return -1;
  }

  /**
   *
   * @param items
   * @param find
   */
  export function has(items: Identifiable[], findID: string | Identifiable): boolean {
    return find(items, findID) >= 0;
  }

  /**
   *
   * @param items
   * @param find
   */
  export function get<T extends Identifiable>(items: T[], findID: string | Identifiable): T | undefined {
    const id = typeof findID === "string" ? findID : findID.id;

    for (let index = 0; index < items.length; index++) {
      if (items[index].id === id) return items[index];
    }

    return undefined;
  }
}
