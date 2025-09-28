"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Attachable = void 0;
/** */
var Attachable;
(function (Attachable) {
    /**
     *
     * @param value
     * @returns
     */
    function is(value) {
        if (value &&
            typeof value === "object" &&
            typeof value.format_version === "string" &&
            typeof value["minecraft:attachable"] === "object") {
            const desc = value["minecraft:attachable"].description;
            if (typeof desc === "object" && typeof desc.identifier === "string")
                return true;
        }
        return false;
    }
    Attachable.is = is;
})(Attachable || (exports.Attachable = Attachable = {}));
//# sourceMappingURL=attachable.js.map