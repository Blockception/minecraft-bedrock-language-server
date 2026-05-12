"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Util = void 0;
const pack_type_1 = require("./pack-type");
/**
 *
 */
var Util;
(function (Util) {
    /**
     *
     * @param pack
     * @returns
     */
    function GetPackType(pack) {
        return pack.type;
    }
    Util.GetPackType = GetPackType;
    /**
     *
     * @param pack
     * @returns
     */
    function IsResourcePack(pack) {
        return pack.type === pack_type_1.PackType.resource_pack;
    }
    Util.IsResourcePack = IsResourcePack;
    /**
     *
     * @param pack
     * @returns
     */
    function IsBehaviorPack(pack) {
        return pack.type === pack_type_1.PackType.behavior_pack;
    }
    Util.IsBehaviorPack = IsBehaviorPack;
    /**
     *
     * @param pack
     * @returns
     */
    function IsWorldPack(pack) {
        return pack.type === pack_type_1.PackType.world;
    }
    Util.IsWorldPack = IsWorldPack;
})(Util || (exports.Util = Util = {}));
//# sourceMappingURL=util.js.map