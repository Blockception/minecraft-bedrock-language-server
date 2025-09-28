"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
describe("String", () => {
    const valid = ["foo", "bar", '"im valid now"'];
    const invalid = ["im not valid"];
    test.each(valid)("$s should return true", (value) => {
        expect(_1.String.is(value)).toBeTruthy();
    });
    test.each(invalid)("$s should return false", (value) => {
        expect(_1.String.is(value)).toBeFalsy();
    });
});
//# sourceMappingURL=string.test.js.map