"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.State = exports.AnimationController = exports.AnimationControllers = void 0;
/** */
var AnimationControllers;
(function (AnimationControllers) {
    /**
     *
     * @param value
     * @returns
     */
    function is(value) {
        if (typeof value === "object" &&
            typeof value.format_version === "string" &&
            typeof value.animation_controllers === "object")
            return true;
        return false;
    }
    AnimationControllers.is = is;
})(AnimationControllers || (exports.AnimationControllers = AnimationControllers = {}));
/** */
var AnimationController;
(function (AnimationController) {
    /**
     *
     * @param value
     * @returns
     */
    function is(value) {
        if (typeof value === "object" && typeof value.states === "object")
            return true;
        return false;
    }
    AnimationController.is = is;
})(AnimationController || (exports.AnimationController = AnimationController = {}));
/** */
var State;
(function (State) {
    /**
     *
     * @param value
     * @returns
     */
    function is(value) {
        if (typeof value === "object")
            return true;
        return false;
    }
    State.is = is;
})(State || (exports.State = State = {}));
//# sourceMappingURL=animation-controller.js.map