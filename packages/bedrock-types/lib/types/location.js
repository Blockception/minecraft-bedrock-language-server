"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Location = void 0;
/** */
var Location;
(function (Location) {
    /**TODO add documentation
     *
     * @param value
     * @returns
     */
    function is(value) {
        if (typeof value === "object") {
            if (typeof value.uri === "string" && typeof value.position !== "undefined")
                return true;
        }
        return false;
    }
    Location.is = is;
    /**TODO add documentation
     *
     * @param uri
     * @param position
     * @returns
     */
    function create(uri, position = 0) {
        return { uri: uri, position: position };
    }
    Location.create = create;
    /**TODO add documentation
     *
     * @returns
     */
    function empty() {
        return create("");
    }
    Location.empty = empty;
})(Location || (exports.Location = Location = {}));
//# sourceMappingURL=location.js.map