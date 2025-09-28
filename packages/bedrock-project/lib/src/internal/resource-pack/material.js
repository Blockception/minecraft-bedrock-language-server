"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Material = void 0;
/** */
var Material;
(function (Material) {
    function is(value) {
        if (typeof value === "object" && typeof value.format_version === "string") {
            return true;
        }
        return false;
    }
    Material.is = is;
})(Material || (exports.Material = Material = {}));
//# sourceMappingURL=material.js.map