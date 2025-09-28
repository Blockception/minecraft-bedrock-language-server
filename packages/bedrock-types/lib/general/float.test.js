"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
describe("Float", () => {
    const valid = ["0.2", "-0.2", "-.2", ".2", "123456.987654", "-123456.987654", "-.987654", ".987654"];
    test.each(valid)("is %s should return false", (item) => {
        expect(_1.Float.is(item)).toBeTruthy();
    });
    const invalid = ["foo"];
    test.each(invalid)("is %s should return false", (item) => {
        expect(_1.Float.is(item)).toBeFalsy();
    });
});
//# sourceMappingURL=float.test.js.map