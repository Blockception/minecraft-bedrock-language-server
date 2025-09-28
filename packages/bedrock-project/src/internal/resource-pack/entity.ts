import { Types } from "bc-minecraft-bedrock-types";
import { FormatVersion } from "../types/format-version";
import { ScriptContainer } from "../types";

/** */
export interface Entity extends Readonly<FormatVersion> {
  /** */
  readonly format_version: string;
  /** */
  "minecraft:client_entity": EntityContainer;
}

/** */
export interface EntityContainer {
  /** */
  description: EntityDescription;
}

/** */
export interface EntityDescription extends ScriptContainer {
  /** */
  identifier: string;
  /** */
  materials?: Types.Definition;
  /** */
  animations?: Types.Definition;
  /** */
  animation_controllers?: (string | Types.Definition)[];
  /** */
  particle_effects?: Types.Definition;
  /** */
  geometry?: Types.Definition;
  /** */
  render_controllers?: (string | Types.Definition)[];
  /** */
  sound_effects?: Types.Definition;
  /** */
  textures?: Types.Definition;
}

/** */
export namespace Entity {
  /**
   *
   * @param value
   * @returns
   */
  export function is(value: any): value is Entity {
    const temp = <Entity>value;
    if (typeof temp === "object" && typeof temp.format_version === "string" && typeof temp["minecraft:client_entity"] === "object") {
      const desc = temp["minecraft:client_entity"].description;

      if (typeof desc === "object" && typeof desc.identifier === "string") return true;
    }

    return false;
  }
}
