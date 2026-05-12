"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Conditional = void 0;
/**
 * The namespace of the conditional
 */
var Conditional;
(function (Conditional) {
    /**
     * Returns the identification of the conditional
     * @param data Either a conditional object or a string
     * @returns Returns the identification string (property key) or the string itself
     */
    function getId(data) {
        if (typeof data === 'string')
            return data;
        return Object.getOwnPropertyNames(data)[0] ?? '';
    }
    Conditional.getId = getId;
    /**
     * Returns the condition value of the conditional
     * @param data Either a conditional object or a string
     * @returns Returns the condition value or 1.0 if a string was provided
     */
    function getCondition(data) {
        if (typeof data === 'string')
            return '1.0';
        const id = Object.getOwnPropertyNames(data)[0];
        if (id)
            return data[id] ?? '1.0';
        return '1.0';
    }
    Conditional.getCondition = getCondition;
    /**
     * Iterates through each conditional or string in the provided array
     * @param data An array of conditional objects or strings
     * @param callbackfn A callback function that is called for each item
     */
    function forEach(data, callbackfn) {
        if (!data)
            return;
        data.forEach((item, index) => {
            if (typeof item === 'string') {
                callbackfn(item, '1.0', index, data);
                return;
            }
            //Is an conditional
            const id = Object.getOwnPropertyNames(item)[0];
            if (id)
                callbackfn(id, item[id] ?? '1.0', index, data);
        });
    }
    Conditional.forEach = forEach;
})(Conditional || (exports.Conditional = Conditional = {}));
//# sourceMappingURL=types.js.map