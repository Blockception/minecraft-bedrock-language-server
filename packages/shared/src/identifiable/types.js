"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Identifiable = void 0;
/**
 * Namespace containing utility functions for working with Identifiable objects.
 */
var Identifiable;
(function (Identifiable) {
    /**
     * Type guard to check if a value is a valid Identifiable object.
     * @param value The value to check
     * @returns True if the value has an id string property, false otherwise
     */
    function is(value) {
        return typeof value === 'object' && typeof value.id === 'string';
    }
    Identifiable.is = is;
    /**
     * Checks if an array of Identifiable items contains an item with the specified id.
     * @param items Array of Identifiable objects to search
     * @param id The identifier to search for
     * @returns True if an item with the id exists in the array, false otherwise
     */
    function has(items, id) {
        return items.some((x) => x.id === id);
    }
    Identifiable.has = has;
    /**
     * Retrieves an Identifiable item from an array by its id.
     * @param items Array of Identifiable objects to search
     * @param id The identifier to search for
     * @returns The item with the matching id, or undefined if not found
     * @returns The id string
     */
    function getId(carrier) {
        if (typeof carrier === 'string')
            return carrier;
        return carrier.id;
    }
    Identifiable.getId = getId;
})(Identifiable || (exports.Identifiable = Identifiable = {}));
//# sourceMappingURL=types.js.map