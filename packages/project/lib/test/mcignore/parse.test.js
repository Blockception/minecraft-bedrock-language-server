"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utillity_1 = require("../utillity");
const main_1 = require("../../src/main");
const path = require("path");
const Text1 = `OutputFolder
Temp
Template/something
!BP/**/*.json`;
describe("MCIgnore", () => {
    it("parse1", () => {
        const ignores = main_1.MCIgnore.parse(Text1);
        expect(ignores).toMatchSnapshot();
    });
    it("loadSync file1", () => {
        const filepath = path.join(utillity_1.TestFilesFolder, "mcignore", "file1.mcignore");
        const ignores = main_1.MCIgnore.loadSync(filepath);
        expect(ignores).toMatchSnapshot();
    });
    it("load file2", async () => {
        const filepath = path.join(utillity_1.TestFilesFolder, "mcignore", "file2.mcignore");
        const ignores = await main_1.MCIgnore.load(filepath);
        expect(ignores).toMatchSnapshot();
    });
});
