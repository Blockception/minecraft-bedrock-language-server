"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextureAtlas = void 0;
/** */
var TextureAtlas;
(function (TextureAtlas) {
    /**
     *
     * @param value
     * @returns
     */
    function is(value) {
        if (typeof value === "object") {
            if (typeof value.resource_pack_name === "string" && typeof value.texture_data === "object") {
                return true;
            }
        }
        return false;
    }
    TextureAtlas.is = is;
})(TextureAtlas || (exports.TextureAtlas = TextureAtlas = {}));
//# sourceMappingURL=texture-atlas.js.map