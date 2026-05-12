"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.State = void 0;
var State;
(function (State) {
    function empty() {
        return {
            workspaces: {
                traversed: false,
            },
        };
    }
    State.empty = empty;
})(State || (exports.State = State = {}));
//# sourceMappingURL=state.js.map