import { FormatVersion } from "../types/format-version";

/** */
export interface SoundDefinitions extends Readonly<FormatVersion> {
  /** */
  format_version: string;
  /** */
  sound_definitions: Record<string, SoundDefinition>;
}

/** */
export interface SoundDefinition {
  /** */
  category: string;
  /** */
  sounds: (string | SoundSpec)[];
}

/** */
export interface SoundSpec {
  /**The relative path to the file */
  name?: string;

  /** Whenever or not the file needs to be streamed */
  stream?: boolean;
}

/** */
export namespace SoundDefinitions {
  /**
   *
   * @param value
   * @returns
   */
  export function is(value: any): value is SoundDefinitions {
    if (
      typeof value === "object" &&
      typeof value.format_version === "string" &&
      typeof value.sound_definitions === "object"
    ) {
      return true;
    }

    return false;
  }
}
