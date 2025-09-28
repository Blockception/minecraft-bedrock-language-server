/** */
export declare enum PackType {
    /** */
    resource_pack = 0,
    /** */
    behavior_pack = 1,
    /** */
    skin_pack = 2,
    /** */
    world = 3,
    /** */
    unknown = 4
}
/** Detects the type of general data from the given uri
 * @param uri The filepath to examine, expects slashes to be '/'*/
export declare namespace PackType {
    /** */
    const BehaviorPackMatch: RegExp;
    /** */
    const ResourcePackMatch: RegExp;
    /** */
    const WorldMatch: RegExp;
    /** */
    const SkinPack: RegExp;
    /**
     *
     * @param uri
     */
    function detect(uri: string): PackType;
    /**
     *
     * @param pack
     * @returns
     */
    function toString(pack?: PackType): string;
    /**
     *
     * @param pack
     * @returns
     */
    function toStringShort(pack?: PackType): string;
}
