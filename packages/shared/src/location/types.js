"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Location = void 0;
/**
 * Namespace containing utility functions for working with Location objects.
 */
var Location;
(function (Location) {
    /**
     * Type guard to check if a value is a valid Location object.
     * @param value The value to check
     * @returns True if the value has uri (string) and position properties, false otherwise
     */
    function is(value) {
        if (typeof value === 'object') {
            if (typeof value.uri === 'string' && typeof value.position !== 'undefined')
                return true;
        }
        return false;
    }
    Location.is = is;
    /**
     * Creates a new Location object with the specified URI and position.
     * @param uri The document URI
     * @param position The position within the document (defaults to 0)
     * @returns A new Location object
     */
    function create(uri, position = 0) {
        return { uri: uri, position: position };
    }
    Location.create = create;
    /**
     * Creates an empty Location object with an empty URI.
     * @returns A new Location object with an empty URI and position 0
     */
    function empty() {
        return create('');
    }
    Location.empty = empty;
})(Location || (exports.Location = Location = {}));
//# sourceMappingURL=types.js.map