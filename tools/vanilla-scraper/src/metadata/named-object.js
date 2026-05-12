"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNamedObject = createNamedObject;
exports.convertNamedObjectToString = convertNamedObjectToString;
exports.convertNamedObjectToEntity = convertNamedObjectToEntity;
/**
 * Create a new NamedObject
 */
function createNamedObject() {
    return {
        name: '',
        id: '',
    };
}
/**
 * Convert NamedObject to string (name)
 */
function convertNamedObjectToString(obj) {
    return obj.name;
}
/**
 * Convert NamedObject to BP Entity
 */
function convertNamedObjectToEntity(obj) {
    return {
        id: obj.name,
        events: [],
        families: [],
    };
}
//# sourceMappingURL=named-object.js.map