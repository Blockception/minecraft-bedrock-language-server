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
export declare namespace TextureAtlas {
    /**
     *
     * @param value
     * @returns
     */
    function is(value: any): value is TextureAtlas;
}
/** */
export interface TextureData {
    /** */
    textures: string | string[];
}
