"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModelModernSpec = exports.ModelModern = exports.ModelLegacySpec = exports.ModelLegacy = exports.Model = void 0;
/** */
var Model;
(function (Model) {
    function is(value) {
        if (ModelModern.is(value) || ModelLegacy.is(value))
            return true;
        return false;
    }
    Model.is = is;
})(Model || (exports.Model = Model = {}));
/** */
var ModelLegacy;
(function (ModelLegacy) {
    /**
     *
     * @param value
     * @returns
     */
    function is(value) {
        if (typeof value === "object" && (value.format_version === "1.8.0" || value.format_version === "1.10.0")) {
            return true;
        }
        return false;
    }
    ModelLegacy.is = is;
})(ModelLegacy || (exports.ModelLegacy = ModelLegacy = {}));
var ModelLegacySpec;
(function (ModelLegacySpec) {
    /**
     *
     * @param value
     * @returns
     */
    function is(value) {
        if (typeof value === "object" && Array.isArray(value.bones)) {
            return true;
        }
        return false;
    }
    ModelLegacySpec.is = is;
})(ModelLegacySpec || (exports.ModelLegacySpec = ModelLegacySpec = {}));
/** */
var ModelModern;
(function (ModelModern) {
    /**
     *
     * @param value
     * @returns
     */
    function is(value) {
        if (typeof value === "object" && typeof value.format_version === "string" && Array.isArray(value["minecraft:geometry"])) {
            return true;
        }
        return false;
    }
    ModelModern.is = is;
})(ModelModern || (exports.ModelModern = ModelModern = {}));
/** */
var ModelModernSpec;
(function (ModelModernSpec) {
    /**
     *
     * @param value
     * @returns
     */
    function is(value) {
        if (typeof value === "object" && typeof value.description === "object") {
            if (typeof value.description.identifier === "string")
                return true;
        }
        return false;
    }
    ModelModernSpec.is = is;
})(ModelModernSpec || (exports.ModelModernSpec = ModelModernSpec = {}));
//# sourceMappingURL=model.js.map