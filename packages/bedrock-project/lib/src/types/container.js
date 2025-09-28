"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Container = void 0;
const bc_minecraft_project_1 = require("bc-minecraft-project");
/** */
var Container;
(function (Container) {
    /**
     *
     * @param value
     * @returns
     */
    function is(value) {
        if (value && bc_minecraft_project_1.MCProject.is(value.context))
            return true;
        return false;
    }
    Container.is = is;
})(Container || (exports.Container = Container = {}));
//# sourceMappingURL=container.js.map