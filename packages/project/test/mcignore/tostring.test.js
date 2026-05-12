"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const src_1 = require("../../src");
const Text1 = `OutputFolder
Temp
Template/something
!BP/**/*.json`;
describe('MCIgnore', () => {
    const data = src_1.MCIgnore.parse(Text1);
    const content = src_1.MCIgnore.toString(data);
    const lines = Text1.split('\n');
    lines
        .map((item) => item.trim())
        .forEach((item) => {
        it(`${item} is present`, () => {
            expect(content.includes(item)).toBeTruthy();
        });
    });
});
//# sourceMappingURL=tostring.test.js.map