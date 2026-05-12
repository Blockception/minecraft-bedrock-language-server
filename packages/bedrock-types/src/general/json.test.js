"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const json_1 = require("./json");
describe('Json', () => {
    const isObject = ['{"rawtext":[{"text":"example"}]}', '{"rawtext":[{"text":"example}]}'];
    const isObjectInvalid = ['{"rawtext":[{"text":"example"}]', '{"rawtext"'];
    test.each(isObject)('isObject($s) should return true', (value) => {
        expect(json_1.Json.isObject(value)).toBeTruthy();
    });
    test.each(isObjectInvalid)('isObject($s) should return false', (value) => {
        expect(json_1.Json.isObject(value)).toBeFalsy();
    });
    const isArray = ['["rawtext",[{"text":"example"}]]'];
    const isArrayInvalid = ['example:something,hello:1', '[foo:1'];
    isArray.forEach((value) => {
        it(`isArray(${value}) should return true`, () => {
            expect(json_1.Json.isArray(value)).toBeTruthy();
        });
    });
    isArrayInvalid.forEach((value) => {
        it(`isArray(${value}) should return false`, () => {
            expect(json_1.Json.isArray(value)).toBeFalsy();
        });
    });
});
//# sourceMappingURL=json.test.js.map