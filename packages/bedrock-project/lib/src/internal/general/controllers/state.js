"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.State = void 0;
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
//# sourceMappingURL=state.js.map