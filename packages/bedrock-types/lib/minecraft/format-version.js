"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormatVersion = void 0;
/**
 * Parses the given data into a format version.
 */
var FormatVersion;
(function (FormatVersion) {
    /**
     * Parses the given data into a format version.
     * @param data The data to parse.
     * @returns The parsed format version.
     */
    function parse(data) {
        var _a, _b, _c;
        if (data === "")
            return [0, 0, 0];
        const parts = data.split(".");
        const major = parseInt((_a = parts[0]) !== null && _a !== void 0 ? _a : "0");
        const minor = parseInt((_b = parts[1]) !== null && _b !== void 0 ? _b : "0");
        const patch = parseInt((_c = parts[2]) !== null && _c !== void 0 ? _c : "0");
        return [major, minor, patch];
    }
    FormatVersion.parse = parse;
    function unwrap(value) {
        if (typeof value === "string")
            return parse(value);
        return value;
    }
    FormatVersion.unwrap = unwrap;
    function isEqual(a, b) {
        a = unwrap(a);
        b = unwrap(b);
        return a[0] === b[0] && a[1] === b[1] && a[2] === b[2];
    }
    FormatVersion.isEqual = isEqual;
    /**
     * Checks if a is lower then b
     * @example isLessThan("1.12.00", [1.30.0]) => true
     */
    function isLessThan(a, b) {
        a = unwrap(a);
        b = unwrap(b);
        if (a[0] < b[0])
            return true;
        if (a[0] > b[0])
            return false;
        if (a[1] < b[1])
            return true;
        if (a[1] > b[1])
            return false;
        if (a[2] < b[2])
            return true;
        if (a[2] > b[2])
            return false;
        return false;
    }
    FormatVersion.isLessThan = isLessThan;
    function isLessOrEqualThan(a, b) {
        a = unwrap(a);
        b = unwrap(b);
        if (a[0] < b[0])
            return true;
        if (a[0] > b[0])
            return false;
        if (a[1] < b[1])
            return true;
        if (a[1] > b[1])
            return false;
        if (a[2] < b[2])
            return true;
        if (a[2] > b[2])
            return false;
        return true;
    }
    FormatVersion.isLessOrEqualThan = isLessOrEqualThan;
    function isGreaterThan(a, b) {
        a = unwrap(a);
        b = unwrap(b);
        if (a[0] < b[0])
            return false;
        if (a[0] > b[0])
            return true;
        if (a[1] < b[1])
            return false;
        if (a[1] > b[1])
            return true;
        if (a[2] < b[2])
            return false;
        if (a[2] > b[2])
            return true;
        return false;
    }
    FormatVersion.isGreaterThan = isGreaterThan;
    function isGreaterOrEqualThan(a, b) {
        a = unwrap(a);
        b = unwrap(b);
        if (a[0] < b[0])
            return false;
        if (a[0] > b[0])
            return true;
        if (a[1] < b[1])
            return false;
        if (a[1] > b[1])
            return true;
        if (a[2] < b[2])
            return false;
        if (a[2] > b[2])
            return true;
        return true;
    }
    FormatVersion.isGreaterOrEqualThan = isGreaterOrEqualThan;
})(FormatVersion || (exports.FormatVersion = FormatVersion = {}));
//# sourceMappingURL=format-version.js.map