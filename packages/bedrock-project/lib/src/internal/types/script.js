"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScriptContainer = exports.Script = void 0;
/** */
var Script;
(function (Script) {
    /**
     *
     * @param value
     * @returns
     */
    function is(value) {
        if (value) {
            if (Array.isArray(value.animate) || Array.isArray(value.initialize) || Array.isArray(value.pre_animation) || typeof value.variables === "object")
                return true;
        }
        return false;
    }
    Script.is = is;
})(Script || (exports.Script = Script = {}));
/** */
var ScriptContainer;
(function (ScriptContainer) {
    /**
     *
     * @param value
     * @returns*/
    function is(value) {
        if (value) {
            if (typeof value.scripts === "object" || typeof value.animations === "object")
                return true;
        }
        return false;
    }
    ScriptContainer.is = is;
})(ScriptContainer || (exports.ScriptContainer = ScriptContainer = {}));
//# sourceMappingURL=script.js.map