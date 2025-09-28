"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Conditional = void 0;
/**
 * The namespace of the conditional
 */
var Conditional;
(function (Conditional) {
    /**Returns the identification
     * @param data
     * @returns*/
    function getId(data) {
        var _a;
        if (typeof data === "string")
            return data;
        return (_a = Object.getOwnPropertyNames(data)[0]) !== null && _a !== void 0 ? _a : "";
    }
    Conditional.getId = getId;
    /**
     *
     * @param data
     * @returns
     */
    function getCondition(data) {
        var _a;
        if (typeof data === "string")
            return "1.0";
        const id = Object.getOwnPropertyNames(data)[0];
        if (id)
            return (_a = data[id]) !== null && _a !== void 0 ? _a : "1.0";
        return "1.0";
    }
    Conditional.getCondition = getCondition;
    /**
     *
     * @param data
     * @param callbackfn
     * @returns
     */
    function forEach(data, callbackfn) {
        if (!data)
            return;
        data.forEach((item, index) => {
            var _a;
            if (typeof item === "string") {
                callbackfn(item, "1.0", index, data);
                return;
            }
            //Is an conditional
            const id = Object.getOwnPropertyNames(item)[0];
            if (id)
                callbackfn(id, (_a = item[id]) !== null && _a !== void 0 ? _a : "1.0", index, data);
        });
    }
    Conditional.forEach = forEach;
})(Conditional || (exports.Conditional = Conditional = {}));
//# sourceMappingURL=conditional.js.map