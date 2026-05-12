"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ide_shared_1 = require("@blockception/ide-shared");
describe('Constants', () => {
    it('values', () => {
        expect(ide_shared_1.Languages.McFunctionIdentifier).toEqual(ide_shared_1.Languages.McFunctionIdentifier.toLowerCase());
    });
    it('Tool Identification', () => {
        expect(ide_shared_1.ToolIdentification.length).toBeLessThanOrEqual(32);
    });
});
//# sourceMappingURL=constants.test.js.map