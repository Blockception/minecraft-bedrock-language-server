/** */
export declare enum FileType {
    /** */
    animation = 0,
    /** */
    animation_controller = 1,
    /** */
    attachable = 2,
    /** */
    block_culling_rules = 3,
    /**The file biomes_client */
    biomes_client = 4,
    /** */
    block = 5,
    /** */
    entity = 6,
    /** */
    fog = 7,
    /** */
    item = 8,
    /** */
    manifest = 9,
    /** */
    material = 10,
    /** */
    model = 11,
    /** */
    music_definitions = 12,
    /** */
    particle = 13,
    /** */
    render_controller = 14,
    /** */
    sounds = 15,
    /**The file sound_definitions*/
    sounds_definitions = 16,
    /** */
    texture = 17,
    /** */
    texture_flipbook_atlas = 18,
    /**The file texture_item_atlas*/
    texture_item_atlas = 19,
    /**The file terrain_texture.json */
    texture_terrain_atlas = 20,
    /** */
    unknown = 21
}
/** */
export declare namespace FileType {
    /**Detects resource pack resource, already assumed the path belongs to a resource pack
     * @param uri the decoded uri, expects slashes to be '/'*/
    function detect(uri: string): FileType;
}
