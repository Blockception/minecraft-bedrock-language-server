"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("./constants");
describe('Constants', () => {
    test('values', () => {
        expect(constants_1.Languages.McFunctionIdentifier).toEqual(constants_1.Languages.McFunctionIdentifier.toLowerCase());
    });
    test('Tool Identification', () => {
        expect(constants_1.ToolIdentification.length).toBeLessThan(32);
    });
});
//# sourceMappingURL=constants.test.js.map