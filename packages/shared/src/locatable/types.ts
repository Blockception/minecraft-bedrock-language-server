import { Location } from '../location';

/**An object that carries a location*/
export interface Locatable {
  /**The location of the object in memory*/
  location: Location;
}

/**
 * Namespace containing utility functions for working with Locatable objects.
 */
export namespace Locatable {
  /**
   * Type guard to check if a value is a valid Locatable object.
   * @param value The value to check
   * @returns True if the value has a valid location property, false otherwise
   */
  export function is(value: any): value is Locatable {
    if (value && Location.is(value.location)) {
      return true;
    }

    return false;
  }

  /**
   * Creates an empty Locatable object with a default empty location.
   * @returns A new Locatable object with an empty URI and position 0
   */
  export function empty(): Locatable {
    return {
      location: { uri: '', position: 0 },
    };
  }
}
