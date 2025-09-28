"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PackType = void 0;
/** */
var PackType;
(function (PackType) {
    /** */
    PackType[PackType["resource_pack"] = 0] = "resource_pack";
    /** */
    PackType[PackType["behavior_pack"] = 1] = "behavior_pack";
    /** */
    PackType[PackType["skin_pack"] = 2] = "skin_pack";
    /** */
    PackType[PackType["world"] = 3] = "world";
    /** */
    PackType[PackType["unknown"] = 4] = "unknown";
})(PackType || (exports.PackType = PackType = {}));
/** Detects the type of general data from the given uri
 * @param uri The filepath to examine, expects slashes to be '/'*/
(function (PackType) {
    /** */
    PackType.BehaviorPackMatch = /[/\\].*(behav(ior|iour)([ _-]|)pack|behav(ior|iour)|bp).*[/\\]/i;
    /** */
    PackType.ResourcePackMatch = /[/\\].*(resource([ _-]|)pack|resource|rp).*[/\\]/i;
    /** */
    PackType.WorldMatch = /[/\\].*(world([ _-]|)template|world|wp|db).*[/\\]/i;
    /** */
    PackType.SkinPack = /[/\\].*(skin([ _-]|)pack).*[/\\]/i;
    /**
     *
     * @param uri
     */
    function detect(uri) {
        if (PackType.BehaviorPackMatch.test(uri))
            return PackType.behavior_pack;
        if (PackType.ResourcePackMatch.test(uri))
            return PackType.resource_pack;
        if (PackType.WorldMatch.test(uri))
            return PackType.world;
        if (PackType.SkinPack.test(uri))
            return PackType.skin_pack;
        return PackType.unknown;
    }
    PackType.detect = detect;
    /**
     *
     * @param pack
     * @returns
     */
    function toString(pack) {
        switch (pack) {
            case PackType.behavior_pack:
                return "behavior";
            case PackType.resource_pack:
                return "resource";
            case PackType.skin_pack:
                return "skin";
            case PackType.world:
                return "world";
            case PackType.unknown:
            default:
                return "unknown";
        }
    }
    PackType.toString = toString;
    /**
     *
     * @param pack
     * @returns
     */
    function toStringShort(pack) {
        switch (pack) {
            case PackType.behavior_pack:
                return "bp";
            case PackType.resource_pack:
                return "rp";
            case PackType.skin_pack:
                return "sp";
            case PackType.world:
                return "wp";
            case PackType.unknown:
            default:
                return "unknown";
        }
    }
    PackType.toStringShort = toStringShort;
})(PackType || (exports.PackType = PackType = {}));
//# sourceMappingURL=pack-type.js.map