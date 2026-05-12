"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeneralInfo = void 0;
const types_1 = require("../../../types");
/**
 *
 */
var GeneralInfo;
(function (GeneralInfo) {
    /**
     *
     * @param id
     * @param location
     * @param documentation
     * @returns
     */
    function create(id, location, documentation = undefined) {
        id = types_1.Text.UnQuote(id);
        return {
            id: id,
            location: location,
            documentation: documentation,
        };
    }
    GeneralInfo.create = create;
})(GeneralInfo || (exports.GeneralInfo = GeneralInfo = {}));
//# sourceMappingURL=general-info.js.map