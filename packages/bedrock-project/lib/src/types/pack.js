"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pack = void 0;
/** */
var Pack;
(function (Pack) {
    /**
     *
     * @param value
     * @returns
     */
    function is(value) {
        if (typeof value === "object" && typeof value.folder === "string" && typeof value.process === "function") {
            return true;
        }
        return false;
    }
    Pack.is = is;
})(Pack || (exports.Pack = Pack = {}));
//# sourceMappingURL=pack.js.map