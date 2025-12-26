/**
 * The interface that governs if a object is identifiable
 */
export interface Identifiable {
  /**The identifier of this object*/
  id: string;
}

/**
 * Namespace containing utility functions for working with Identifiable objects.
 */
export namespace Identifiable {
  /**
   * Type guard to check if a value is a valid Identifiable object.
   * @param value The value to check
   * @returns True if the value has an id string property, false otherwise
   */
  export function is(value: any): value is Identifiable {
    return typeof value === 'object' && typeof value.id === 'string';
  }

  /**
   * Checks if an array of Identifiable items contains an item with the specified id.
   * @param items Array of Identifiable objects to search
   * @param id The identifier to search for
   * @returns True if an item with the id exists in the array, false otherwise
   */
  export function has<T extends Identifiable>(items: T[], id: string): boolean {
    return items.some((x) => x.id === id);
  }

  /**
   * Retrieves an Identifiable item from an array by its id.
   * @param items Array of Identifiable objects to search
   * @param id The identifier to search for
   * @returns The item with the matching id, or undefined if not found
   * @returns The id string
   */
  export function getId(carrier: string | Identifiable): string {
    if (typeof carrier === 'string') return carrier;

    return carrier.id;
  }
}
