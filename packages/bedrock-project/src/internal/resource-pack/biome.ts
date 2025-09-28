import { ComponentContainer } from 'bc-minecraft-bedrock-types/lib/minecraft/components';
import { FormatVersion } from "../types/format-version";

/** */
export interface Biome extends Readonly<FormatVersion> {
  /** */
  format_version: string;
  /** */
  "minecraft:client_biome": {
    description: {
      identifier: string
    },
    components: ComponentContainer
  };
}


/**
 *
 */
export namespace Biome {
  /**
   *
   * @param value
   * @returns
   */
  export function is(value: any): value is Biome {
    if (typeof value === "object" && typeof value.format_version === "string" && typeof value["minecraft:client_biome"] === "object") {
      const desc = value["minecraft:client_biome"].description;

      if (typeof desc === "object" && typeof desc.identifier === "string" && typeof value['minecraft:client_biome'].components === 'object') {
        return true;
      }
    }

    return false;
  }
}
