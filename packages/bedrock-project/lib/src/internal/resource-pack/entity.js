"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Entity = void 0;
/** */
var Entity;
(function (Entity) {
    /**
     *
     * @param value
     * @returns
     */
    function is(value) {
        const temp = value;
        if (typeof temp === "object" && typeof temp.format_version === "string" && typeof temp["minecraft:client_entity"] === "object") {
            const desc = temp["minecraft:client_entity"].description;
            if (typeof desc === "object" && typeof desc.identifier === "string")
                return true;
        }
        return false;
    }
    Entity.is = is;
})(Entity || (exports.Entity = Entity = {}));
//# sourceMappingURL=entity.js.map