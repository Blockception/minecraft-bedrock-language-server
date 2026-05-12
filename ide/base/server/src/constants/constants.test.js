"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ide_shared_1 = require("@blockception/ide-shared");
describe('Constants', () => {
    test('values', () => {
        expect(ide_shared_1.Languages.McFunctionIdentifier).toEqual(ide_shared_1.Languages.McFunctionIdentifier.toLowerCase());
    });
    test('Tool Identification', () => {
        expect(ide_shared_1.ToolIdentification.length).toBeLessThan(32);
    });
});
//# sourceMappingURL=constants.test.js.map