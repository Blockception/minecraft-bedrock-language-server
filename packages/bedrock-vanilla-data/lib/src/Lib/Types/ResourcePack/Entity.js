"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Entity = void 0;
/**
 *
 */
var Entity;
(function (Entity) {
    /**
     *
     * @param value
     * @returns
     */
    function is(value) {
        if (value) {
            if (typeof value.id === "string" && Array.isArray(value.animations))
                return true;
        }
        return false;
    }
    Entity.is = is;
})(Entity || (exports.Entity = Entity = {}));
//# sourceMappingURL=Entity.js.map