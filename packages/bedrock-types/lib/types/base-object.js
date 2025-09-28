"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseObject = void 0;
const location_1 = require("./location");
var BaseObject;
(function (BaseObject) {
    /** */
    function is(value) {
        if (typeof value === "object") {
            if (typeof value.id !== "string")
                return false;
            if (!location_1.Location.is(value.location))
                return false;
            return true;
        }
        return false;
    }
    BaseObject.is = is;
})(BaseObject || (exports.BaseObject = BaseObject = {}));
//# sourceMappingURL=base-object.js.map