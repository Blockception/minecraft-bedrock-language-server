"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const main_1 = require("../../src/main");
const utillity_1 = require("../utillity");
const path = require("path");
const Text1 = `diagnostics.objectives=true
diagnostics.tags=false
diagnostics.json=true`;
describe("MCAttributes", () => {
    describe("parse1", () => {
        const parse = main_1.MCAttributes.parse(Text1);
        expect(parse).toMatchSnapshot();
    });
    it("loadSync file1", () => {
        const filepath = path.join(utillity_1.TestFilesFolder, "mcattributes", "file1.mcattributes");
        const attributes = main_1.MCAttributes.loadSync(filepath);
        expect(attributes).toMatchSnapshot();
    });
    it("load file2", async () => {
        const filepath = path.join(utillity_1.TestFilesFolder, "mcattributes", "file2.mcattributes");
        const attributes = await main_1.MCAttributes.load(filepath);
        expect(attributes).toMatchSnapshot();
    });
});
