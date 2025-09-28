"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Locatable = void 0;
const location_1 = require("./location");
/** */
var Locatable;
(function (Locatable) {
    /**TODO add documentation
     *
     * @param value
     * @returns
     */
    function is(value) {
        if (value && location_1.Location.is(value.location)) {
            return true;
        }
        return false;
    }
    Locatable.is = is;
    /**TODO add documentation
     *
     * @returns
     */
    function empty() {
        return {
            location: { uri: "", position: 0 },
        };
    }
    Locatable.empty = empty;
})(Locatable || (exports.Locatable = Locatable = {}));
//# sourceMappingURL=locatable.js.map