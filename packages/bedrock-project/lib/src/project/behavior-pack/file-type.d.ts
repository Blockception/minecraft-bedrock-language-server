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
    entity = 4,
    /***/
    feature = 5,
    /***/
    feature_rule = 6,
    /***/
    function = 7,
    /***/
    item = 8,
    /***/
    item_catalog = 9,
    /***/
    loot_table = 10,
    /***/
    manifest = 11,
    /***/
    script = 12,
    /***/
    spawn_rule = 13,
    /***/
    recipe = 14,
    /***/
    structure = 15,
    /***/
    trading = 16,
    /***/
    unknown = 17
}
export declare namespace FileType {
    /**Detects behavior pack file type, already assumed the path belongs to a behavior pack
     * @param uri The filepath to examine, expects slashes to be '/'*/
    function detect(uri: string): FileType;
}
