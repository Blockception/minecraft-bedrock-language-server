"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Fog = void 0;
/**
 *
 */
var Fog;
(function (Fog) {
    /**
     *
     * @param value
     * @returns
     */
    function is(value) {
        if (typeof value === "object" && typeof value.format_version === "string" && typeof value["minecraft:fog_settings"] === "object") {
            const desc = value["minecraft:fog_settings"].description;
            if (typeof desc === "object" && typeof desc.identifier === "string") {
                return true;
            }
        }
        return false;
    }
    Fog.is = is;
})(Fog || (exports.Fog = Fog = {}));
//# sourceMappingURL=fog.js.map