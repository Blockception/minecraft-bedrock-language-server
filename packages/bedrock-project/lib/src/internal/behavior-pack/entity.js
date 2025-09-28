"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Entity = void 0;
/** */
var Entity;
(function (Entity) {
    /**
     *
     * @param value
     */
    function is(value) {
        if (typeof value === "object" &&
            typeof value.format_version === "string" &&
            typeof value["minecraft:entity"] === "object") {
            const b = value["minecraft:entity"];
            if (typeof b.description === "object" &&
                typeof b.description.identifier === "string" &&
                typeof b.components === "object") {
                return true;
            }
        }
        return false;
    }
    Entity.is = is;
})(Entity || (exports.Entity = Entity = {}));
//# sourceMappingURL=entity.js.map