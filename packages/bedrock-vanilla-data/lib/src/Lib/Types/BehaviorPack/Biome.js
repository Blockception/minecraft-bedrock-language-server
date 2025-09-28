"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Biome = void 0;
/**The namespace that provides functions for biomes*/
var Biome;
(function (Biome) {
    /**Checks if the given object implements the biome interface
     * @param value The object to check
     * @returns true or false if the object implements biome
     */
    function is(value) {
        if (value) {
            if (typeof value.id === "string" && Array.isArray(value.properties))
                return true;
        }
        return false;
    }
    Biome.is = is;
})(Biome || (exports.Biome = Biome = {}));
//# sourceMappingURL=Biome.js.map