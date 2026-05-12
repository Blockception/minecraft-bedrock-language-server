"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UI = void 0;
/** Utility functions for working with UI definition objects. */
var UI;
(function (UI) {
    /**
     * Checks if a value is a UI definition object (has at least one object-valued property or a namespace)
     * @param value
     * @returns
     */
    function is(value) {
        if (typeof value !== 'object' || value === null)
            return false;
        const keys = Object.keys(value);
        // A UI file has a namespace string field or object-valued element definitions
        for (const key of keys) {
            if (key === 'namespace') {
                if (typeof value[key] === 'string')
                    return true;
            }
            else if (typeof value[key] === 'object' && value[key] !== null) {
                return true;
            }
        }
        return false;
    }
    UI.is = is;
})(UI || (exports.UI = UI = {}));
//# sourceMappingURL=ui.js.map