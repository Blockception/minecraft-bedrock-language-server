/** */
export interface TextureAtlas {
  /** */
  resource_pack_name: string;
  /** */
  texture_data: Record<string, TextureData>;
  /** */
  texture_name?: string;
  /** */
  padding?: number;
  /** */
  num_mip_levels?: number;
}

/** */
export namespace TextureAtlas {
  /**
   *
   * @param value
   * @returns
   */
  export function is(value: any): value is TextureAtlas {
    if (typeof value === "object") {
      if (typeof value.resource_pack_name === "string" && typeof value.texture_data === "object") {
        return true;
      }
    }

    return false;
  }
}

/** */
export interface TextureData {
  /** */
  textures: string | string[];
}
