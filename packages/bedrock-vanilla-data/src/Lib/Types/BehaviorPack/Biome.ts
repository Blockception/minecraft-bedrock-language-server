import { Identifiable } from "../Identifiable";

/**The biome interface*/
export interface Biome extends Identifiable {
  /**The tags of that this biome has*/
  tags: string[];
}

/**The namespace that provides functions for biomes*/
export namespace Biome {
  /**Checks if the given object implements the biome interface
   * @param value The object to check
   * @returns true or false if the object implements biome
   */
  export function is(value: any): value is Biome {
    if (value) {
      if (typeof value.id === "string" && Array.isArray(value.properties)) return true;
    }

    return false;
  }
}
