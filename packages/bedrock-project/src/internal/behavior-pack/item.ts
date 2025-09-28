import { FormatVersion } from "../types/format-version";

/** */
export interface Item extends Readonly<FormatVersion> {
  /** */
  format_version: string;
  /** */
  "minecraft:item": {
    /** */
    description: {
      /** */
      identifier: string;
      /** */
      category?: string;
      /** */
      is_experimental?: boolean;
    };
    /** */
    components: Record<string, any>;
    /** */
    events?: Record<string, any>;
  };
}

/** */
export namespace Item {
  /**
   *
   * @param value
   * @returns
   */
  export function is(value: any): value is Item {
    if (value && typeof value.format_version === "string" && typeof value["minecraft:item"] === "object") {
      const b = value["minecraft:item"];

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
