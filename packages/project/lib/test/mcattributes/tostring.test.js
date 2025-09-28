"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const main_1 = require("../../src/main");
const Text1 = `diagnostics.objectives=true
diagnostics.tags=false
diagnostics.json=true`;
describe("MCAttributes", () => {
    describe("tostring1", () => {
        const data = main_1.MCAttributes.parse(Text1);
        const content = main_1.MCAttributes.toString(data);
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
