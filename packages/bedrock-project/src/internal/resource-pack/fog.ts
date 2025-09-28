import { FormatVersion } from "../types/format-version";

/** */
export interface Fog extends Readonly<FormatVersion> {
  /** */
  format_version: string;
  /** */
  "minecraft:fog_settings": FogContainer;
}

/** */
export interface FogContainer {
  /** */
  description: FogDescription;
  /** */
  distance?: {
    air?: FogDistance;
    water?: FogDistance;
    lava?: FogDistance;
    lava_resistance?: FogDistance;
    powder_snow?: FogDistance;
    weather?: FogDistance;
  };
  /** */
  volumetric?: any;
}

/** */
export interface FogDescription {
  /** */
  identifier: string;
}

/** */
export interface FogDistance {
  /** */
  fog_start?: number;
  /** */
  fog_end?: number;
  /** */
  fog_color?: string;
  /** */
  render_distance_type?: "fixed" | "render";
}

/**
 *
 */
export namespace Fog {
  /**
   *
   * @param value
   * @returns
   */
  export function is(value: any): value is Fog {
    if (typeof value === "object" && typeof value.format_version === "string" && typeof value["minecraft:fog_settings"] === "object") {
      const desc = value["minecraft:fog_settings"].description;

      if (typeof desc === "object" && typeof desc.identifier === "string") {
        return true;
      }
    }

    return false;
  }
}
