import { ComponentContainer } from 'bc-minecraft-bedrock-types/lib/minecraft/components';
import { FormatVersion } from "../types/format-version";

/** */
export interface SpawnRule extends Readonly<FormatVersion> {
  /** */
  format_version: string;
  /** */
  "minecraft:spawn_rules": {
    description: {
      identifier: string
      population_control: string
    },
    conditions: ComponentContainer[]
  };
}

/**
 *
 */
export namespace SpawnRule {
  /**
   *
   * @param value
   * @returns
   */
  export function is(value: any): value is SpawnRule {
    if (typeof value === "object" && typeof value.format_version === "string" && typeof value["minecraft:spawn_rules"] === "object") {
      const desc = value["minecraft:spawn_rules"].description;

      if (typeof desc === "object" && typeof desc.identifier === "string" && Array.isArray(value['minecraft:spawn_rules'].conditions)) {
        return true;
      }
    }

    return false;
  }
}
