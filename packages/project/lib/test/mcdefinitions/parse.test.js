"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utillity_1 = require("../utillity");
const path = require("path");
const main_1 = require("../../src/main");
const Text1 = `tag=allowed
tag=!denied`;
describe("MCDefinition", () => {
    it("parse1", () => {
        const definitions = main_1.MCDefinition.parse(Text1);
        expect(definitions).toMatchSnapshot();
    });
    it("loadSync file1", () => {
        const filepath = path.join(utillity_1.TestFilesFolder, "mcdefinitions", "file1.mcdefinitions");
        const definitions = main_1.MCDefinition.loadSync(filepath);
        expect(definitions).toMatchSnapshot();
    });
    it("load file2", async () => {
        const filepath = path.join(utillity_1.TestFilesFolder, "mcdefinitions", "file2.mcdefinitions");
        const definitions = await main_1.MCDefinition.load(filepath);
        expect(definitions).toMatchSnapshot();
    });
});
