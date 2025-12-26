/**The interface that governs if a object is identifiable*/
export interface Identifiable {
  /**The identifier of this object*/
  id: string;
}

/** */
export namespace Identifiable {
  /**
   * Type guard to check if a value is a valid Identifiable object.
   * @param value The value to check
   * @returns True if the value has an id string property, false otherwise
   */
  export function is(value: any): value is Identifiable {
    if (typeof value === 'object' && typeof value.id === 'string') return true;

    return false;
  }

  /**
   * Checks if an array of Identifiable items contains an item with the specified id.
   * @param items Array of Identifiable objects to search
   * @param id The identifier to search for
   * @returns True if an item with the id exists in the array, false otherwise
   */
  export function has<T extends Identifiable>(items: T[], id: string): boolean {
    for (let I = 0; I < items.length; I++) {
      const elem = items[I];

      if (elem.id == id) return true;
    }

    return false;
  }

  /**
   * Retrieves an Identifiable item from an array by its id.
   * @param items Array of Identifiable objects to search
   * @param id The identifier to search for
   * @returns The item with the matching id, or undefined if not found
   */
  export function get<T extends Identifiable>(items: T[], id: string): T | undefined {
    for (let I = 0; I < items.length; I++) {
      const elem = items[I];

      if (elem.id === id) return elem;
    }

    return undefined;
  }

  /**
   * Extracts the id from either a string or an Identifiable object.
   * @param carrier Either a string id or an Identifiable object
   * @returns The id string
   */
  export function getId(carrier: string | Identifiable): string {
    if (typeof carrier === 'string') return carrier;

    return carrier.id;
  }
}
