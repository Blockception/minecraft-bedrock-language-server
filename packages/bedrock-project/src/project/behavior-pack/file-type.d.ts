/***/
export declare enum FileType {
    /***/
    animation = 0,
    /***/
    animation_controller = 1,
    /***/
    biome = 2,
    /***/
    block = 3,
    /***/
    dialogue = 4,
    /***/
    entity = 5,
    /***/
    feature = 6,
    /***/
    feature_rule = 7,
    /***/
    function = 8,
    /***/
    item = 9,
    /***/
    item_catalog = 10,
    /***/
    loot_table = 11,
    /***/
    manifest = 12,
    /***/
    script = 13,
    /***/
    spawn_rule = 14,
    /***/
    recipe = 15,
    /***/
    structure = 16,
    /***/
    trading = 17,
    /***/
    voxel_shape = 18,
    /***/
    unknown = 19
}
export declare namespace FileType {
    /**Detects behavior pack file type, already assumed the path belongs to a behavior pack
     * @param uri The filepath to examine, expects slashes to be '/'*/
    function detect(uri: string): FileType;
}
//# sourceMappingURL=file-type.d.ts.map