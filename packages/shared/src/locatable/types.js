"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Locatable = void 0;
const location_1 = require("../location");
/**
 * Namespace containing utility functions for working with Locatable objects.
 */
var Locatable;
(function (Locatable) {
    /**
     * Type guard to check if a value is a valid Locatable object.
     * @param value The value to check
     * @returns True if the value has a valid location property, false otherwise
     */
    function is(value) {
        if (value && location_1.Location.is(value.location)) {
            return true;
        }
        return false;
    }
    Locatable.is = is;
    /**
     * Creates an empty Locatable object with a default empty location.
     * @returns A new Locatable object with an empty URI and position 0
     */
    function empty() {
        return {
            location: { uri: '', position: 0 },
        };
    }
    Locatable.empty = empty;
})(Locatable || (exports.Locatable = Locatable = {}));
//# sourceMappingURL=types.js.map