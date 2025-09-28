"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
describe("Integer", () => {
    const valid = ["-123456", "123456"];
    const invalid = ["foo"];
    test.each(valid)("$s should return true", (value) => {
        expect(_1.Integer.is(value)).toBeTruthy();
    });
    test.each(invalid)("$s should return false", (value) => {
        expect(_1.Integer.is(value)).toBeFalsy();
    });
});
//# sourceMappingURL=integer.test.js.map