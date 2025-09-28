/** */
export declare enum FileType {
    /** */
    manifest = 0,
    /** */
    skins = 1,
    /** */
    texture = 2,
    /** */
    unknown = 3
}
/** */
export declare namespace FileType {
    /**Detects resource pack resource, already assumed the path belongs to a resource pack
     * @param uri the decoded uri, expects slashes to be '/'*/
    function detect(uri: string): FileType;
}
