"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const main_1 = require("../../src/main");
const Text1 = `OutputFolder
Temp
Template/something
!BP/**/*.json`;
describe("MCIgnore", () => {
    const data = main_1.MCIgnore.parse(Text1);
    const content = main_1.MCIgnore.toString(data);
    const lines = Text1.split("\n");
    lines
        .map((item) => item.trim())
        .forEach((item) => {
        it(`${item} is present`, () => {
            expect(content.includes(item)).toBeTruthy();
        });
    });
});
