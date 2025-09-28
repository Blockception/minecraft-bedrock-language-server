"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const main_1 = require("../../src/main");
const utillity_1 = require("../utillity");
const path = require("path");
describe("MCProject", () => {
    it("is it1", () => {
        const project = main_1.MCProject.createEmpty();
        expect(project).toMatchSnapshot();
    });
    it("is p1", () => {
        const folder = path.join(utillity_1.TestFilesFolder, "mcproject", "p1");
        const project = main_1.MCProject.loadSync(folder);
        expect(project).toMatchSnapshot();
    });
    it("is async p1", async () => {
        const folder = path.join(utillity_1.TestFilesFolder, "mcproject", "p1");
        const project = await main_1.MCProject.load(folder);
        expect(project).toMatchSnapshot();
    });
});
