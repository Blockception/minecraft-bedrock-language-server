"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Biome = void 0;
/**
 *
 */
var Biome;
(function (Biome) {
    /**
     *
     * @param value
     * @returns
     */
    function is(value) {
        if (typeof value === "object" && typeof value.format_version === "string" && typeof value["minecraft:client_biome"] === "object") {
            const desc = value["minecraft:client_biome"].description;
            if (typeof desc === "object" && typeof desc.identifier === "string" && typeof value['minecraft:client_biome'].components === 'object') {
                return true;
            }
        }
        return false;
    }
    Biome.is = is;
})(Biome || (exports.Biome = Biome = {}));
//# sourceMappingURL=biome.js.map