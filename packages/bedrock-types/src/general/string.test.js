"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const string_1 = require("./string");
describe('String', () => {
    const valid = ['foo', 'bar', '"im valid now"'];
    const invalid = ['im not valid'];
    test.each(valid)('$s should return true', (value) => {
        expect(string_1.String.is(value)).toBeTruthy();
    });
    test.each(invalid)('$s should return false', (value) => {
        expect(string_1.String.is(value)).toBeFalsy();
    });
});
//# sourceMappingURL=string.test.js.map