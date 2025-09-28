"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const main_1 = require("../../src/main");
const Text1 = `tag=allowed
tag=!denied
family=npc
family=enemy`;
describe("MCDefinitions", () => {
    describe("tostring1", () => {
        const data = main_1.MCDefinition.parse(Text1);
        const content = main_1.MCDefinition.toString(data);
        const lines = Text1.split("\n");
        lines
            .map((item) => item.trim())
            .forEach((item) => {
            it(`${item} is present`, () => {
                expect(content.includes(item)).toBeTruthy();
            });
        });
    });
});
