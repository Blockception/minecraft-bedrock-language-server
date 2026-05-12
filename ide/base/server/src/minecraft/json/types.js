"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isBool = isBool;
exports.isNumber = isNumber;
exports.santizeValue = santizeValue;
function isBool(value) {
    return value === 'true' || value === 'false';
}
function isNumber(value) {
    return !isNaN(Number(value));
}
/**
 * Sanitizes the values as json values, numbers, boolean get left alone. while other get converted to string
 * @param value
 * @returns
 */
function santizeValue(value) {
    if (isBool(value) || isNumber(value)) {
        return value;
    }
    return `"${value}"`;
}
//# sourceMappingURL=types.js.map