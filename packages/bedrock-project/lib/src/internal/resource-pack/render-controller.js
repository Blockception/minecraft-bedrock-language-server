"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RenderControllers = void 0;
var RenderControllers;
(function (RenderControllers) {
    function is(value) {
        if (typeof value === "object") {
            if (typeof value.format_version === "string" && typeof value.render_controllers === "object") {
                return true;
            }
        }
        return false;
    }
    RenderControllers.is = is;
})(RenderControllers || (exports.RenderControllers = RenderControllers = {}));
//# sourceMappingURL=render-controller.js.map