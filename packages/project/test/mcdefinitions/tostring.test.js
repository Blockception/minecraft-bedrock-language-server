"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const src_1 = require("../../src");
const Text1 = `tag=allowed
tag=!denied
family=npc
family=enemy`;
describe('MCDefinitions', () => {
    describe('tostring1', () => {
        const data = src_1.MCDefinition.parse(Text1);
        const content = src_1.MCDefinition.toString(data);
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