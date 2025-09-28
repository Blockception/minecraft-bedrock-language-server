"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntityEnumProperty = exports.EntityIntProperty = exports.EntityFloatProperty = exports.EntityBoolProperty = void 0;
var EntityBoolProperty;
(function (EntityBoolProperty) {
    function is(value) {
        if (typeof value !== "object")
            return false;
        if (value.type !== "bool")
            return false;
        return true;
    }
    EntityBoolProperty.is = is;
})(EntityBoolProperty || (exports.EntityBoolProperty = EntityBoolProperty = {}));
var EntityFloatProperty;
(function (EntityFloatProperty) {
    function is(value) {
        if (typeof value !== "object")
            return false;
        if (value.type !== "float")
            return false;
        return true;
    }
    EntityFloatProperty.is = is;
})(EntityFloatProperty || (exports.EntityFloatProperty = EntityFloatProperty = {}));
var EntityIntProperty;
(function (EntityIntProperty) {
    function is(value) {
        if (typeof value !== "object")
            return false;
        if (value.type !== "int")
            return false;
        return true;
    }
    EntityIntProperty.is = is;
})(EntityIntProperty || (exports.EntityIntProperty = EntityIntProperty = {}));
var EntityEnumProperty;
(function (EntityEnumProperty) {
    function is(value) {
        if (typeof value !== "object")
            return false;
        if (value.type !== "enum")
            return false;
        return true;
    }
    EntityEnumProperty.is = is;
})(EntityEnumProperty || (exports.EntityEnumProperty = EntityEnumProperty = {}));
//# sourceMappingURL=properties.js.map