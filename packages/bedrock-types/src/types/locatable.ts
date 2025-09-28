import { Location } from "./location";

/**An object that carries a location*/
export interface Locatable {
  /**The location of the object in memory*/
  location: Location;
}

/** */
export namespace Locatable {
  /**TODO add documentation
   *
   * @param value
   * @returns
   */
  export function is(value: any): value is Locatable {
    if (value && Location.is(value.location)) {
      return true;
    }

    return false;
  }

  /**TODO add documentation
   *
   * @returns
   */
  export function empty(): Locatable {
    return {
      location: { uri: "", position: 0 },
    };
  }
}
