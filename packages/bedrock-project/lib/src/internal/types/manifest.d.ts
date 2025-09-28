import { PackType } from "../../project/pack-type";
import { TextDocument } from "../../types";
/**
 *
 */
export interface Manifest {
    /**
     *
     */
    format_version: string;
    /**
     *
     */
    header: ManifestHeader;
    /**
     *
     */
    modules?: ManifestModule[];
    /**
     *
     */
    metadata?: ManifestMetadata;
}
/**
 *
 */
export interface ManifestHeader {
    /**This is the name of the pack as it appears within Minecraft. This is a required field.*/
    name: string;
    /**This is a short description of the pack. It will appear in the game below the name of the pack. We recommend keeping it to 1-2 lines.*/
    description: string;
    /**This is a special type of identifier that uniquely identifies this pack from any other pack. UUIDs are written in the format xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx where each x is a hexadecimal value (0-9 or a-f). We recommend using an online service to generate this and guarantee their uniqueness,*/
    uuid: string;
    /**This is the version of your pack in the format [majorVersion, minorVersion, revision]. The version number is used when importing a pack that has been imported before. The new pack will replace the old one if the version is higher, and ignored if it's the same or lower.*/
    version: number[];
    /**This option is required for any world templates. This will lock the player from modifying the options of the world.*/
    lock_template_options?: boolean;
    /**This is the version of the base game your world template requires, specified as [majorVersion, minorVersion, revision]. We use this to determine what version of the base game resource and behavior packs to apply when your content is used.*/
    base_game_version?: number[];
    /**This is the minimum version of the game that this pack was written for. This is a required field for resource and behavior packs. This helps the game identify whether any backwards compatibility is needed for your pack. You should always use the highest version currently available when creating packs.*/
    min_engine_version?: number[];
}
/** */
export interface ManifestModule {
    /** */
    module_name?: string;
    /** */
    type?: string;
    /** */
    uuid?: string;
    /** */
    version: number[];
}
/** */
export declare namespace ManifestModule {
    /** */
    const TypeResource = "resources";
    /** */
    const TypeData = "data";
    /** */
    const TypeWorld = "world_template";
    /** */
    const TypeSkinPack = "skin_pack";
}
/** */
export interface ManifestMetadata {
    /** */
    authors?: string[];
    license?: string;
    url?: string;
    generated_with?: {
        [tool_name: string]: string[];
    };
}
/** */
export declare namespace Manifest {
    function is(value: any): value is Manifest;
    /**
     *
     * @param m
     * @returns
     */
    function isWorldManifest(m: Manifest): boolean;
    /**
     *
     * @param m
     * @returns
     */
    function isResourceManifest(m: Manifest): boolean;
    /**
     *
     * @param m
     * @returns
     */
    function isBehaviorManifest(m: Manifest): boolean;
    /**
     *
     * @param m
     * @returns
     */
    function isSkinpackManifest(m: Manifest): boolean;
    /**
     *
     * @param m
     * @returns
     */
    function detectType(m: Manifest): PackType;
    /**
     *
     * @param uri
     * @returns
     */
    function getManifest(uri: string, getDocument: (uri: string) => TextDocument | undefined): Manifest | undefined;
    function detectTypeUri(manifestUri: string, manifest: Manifest): PackType;
}
