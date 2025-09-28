"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utillity_1 = require("../utillity");
const path = require("path");
const main_1 = require("../../src/main");
describe("MCProject", () => {
    it("loadSync p1", () => {
        const folder = path.join(utillity_1.TestFilesFolder, "mcproject", "p1");
        const project = main_1.MCProject.loadSync(folder);
        expect(project).toMatchSnapshot();
    });
    it("load file2", async () => {
        const folder = path.join(utillity_1.TestFilesFolder, "mcproject", "p1");
        const project = await main_1.MCProject.load(folder);
        expect(project).toMatchSnapshot();
    });
    it("loadSync not existing", () => {
        const folder = path.join(utillity_1.TestFilesFolder, "mcproject", "non_existing");
        const project = main_1.MCProject.loadSync(folder);
        expect(project).toMatchSnapshot();
    });
    it("load not existing", async () => {
        const folder = path.join(utillity_1.TestFilesFolder, "mcproject", "non_existing");
        const project = await main_1.MCProject.load(folder);
        expect(project).toMatchSnapshot();
    });
});
