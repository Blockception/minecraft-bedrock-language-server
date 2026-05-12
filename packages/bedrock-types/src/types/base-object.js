"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseObject = void 0;
const bc_minecraft_bedrock_shared_1 = require("bc-minecraft-bedrock-shared");
var BaseObject;
(function (BaseObject) {
    /** */
    function is(value) {
        if (typeof value === 'object') {
            if (typeof value.id !== 'string')
                return false;
            if (!bc_minecraft_bedrock_shared_1.Location.is(value.location))
                return false;
            return true;
        }
        return false;
    }
    BaseObject.is = is;
})(BaseObject || (exports.BaseObject = BaseObject = {}));
//# sourceMappingURL=base-object.js.map