"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const integer_1 = require("./integer");
describe('Integer', () => {
    const valid = ['-123456', '123456'];
    const invalid = ['foo'];
    test.each(valid)('$s should return true', (value) => {
        expect(integer_1.Integer.is(value)).toBeTruthy();
    });
    test.each(invalid)('$s should return false', (value) => {
        expect(integer_1.Integer.is(value)).toBeFalsy();
    });
});
//# sourceMappingURL=integer.test.js.map