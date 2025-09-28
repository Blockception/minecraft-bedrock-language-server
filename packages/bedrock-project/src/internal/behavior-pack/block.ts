import { ComponentContainer } from "bc-minecraft-bedrock-types/lib/minecraft/components";
import { FormatVersion } from "../types/format-version";

export interface Block extends Readonly<FormatVersion> {
  format_version: string;
  "minecraft:block": {
    description: {
      identifier: string;
      register_to_creative_menu?: boolean;
      is_experimental?: boolean;
      properties?: Record<string, string[] | number[] | boolean[]>;
    };
    permutations?: Permutation[];
    components: ComponentContainer;
    events?: Record<string, any>;
  };
}

export interface Permutation {
  condition?: string;
  components?: ComponentContainer;
}

/** */
export namespace Block {
  /**
   *
   * @param value
   * @returns
   */
  export function is(value: any): value is Block {
    if (value && typeof value.format_version === "string" && typeof value["minecraft:block"] === "object") {
      const b = value["minecraft:block"];

      if (
        typeof b.description === "object" &&
        typeof b.description.identifier === "string" &&
        typeof b.components === "object"
      ) {
        return true;
      }
    }

    return false;
  }
}
