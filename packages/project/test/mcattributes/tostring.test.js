"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const src_1 = require("../../src");
const Text1 = `diagnostics.objectives=true
diagnostics.tags=false
diagnostics.json=true`;
describe('MCAttributes', () => {
    describe('tostring1', () => {
        const data = src_1.MCAttributes.parse(Text1);
        const content = src_1.MCAttributes.toString(data);
        const lines = Text1.split('\n');
        lines
            .map((item) => item.trim())
            .forEach((item) => {
            it(`${item} is present`, () => {
                expect(content.includes(item)).toBeTruthy();
            });
        });
    });
});
//# sourceMappingURL=tostring.test.js.map