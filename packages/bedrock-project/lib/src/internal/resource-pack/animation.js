"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Animations = exports.Animation = void 0;
/** */
var Animation;
(function (Animation) {
    /**
     *
     * @param value
     * @returns
     */
    function is(value) {
        return typeof value === "object";
    }
    Animation.is = is;
})(Animation || (exports.Animation = Animation = {}));
/** */
var Animations;
(function (Animations) {
    /**
     *
     * @param value
     * @returns
     */
    function is(value) {
        if (value && typeof value.format_version === "string" && typeof value.animations === "object")
            return true;
        return false;
    }
    Animations.is = is;
})(Animations || (exports.Animations = Animations = {}));
//# sourceMappingURL=animation.js.map