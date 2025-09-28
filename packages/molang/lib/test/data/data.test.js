"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const main_1 = require("../../src/main");
describe("Data sanity check", () => {
    it("Animations is defined", () => expect(main_1.MolangData.Animations).toBeDefined());
    it("AnimationsControllers is defined", () => expect(main_1.MolangData.AnimationsControllers).toBeDefined());
    it("Blocks is defined", () => expect(main_1.MolangData.Blocks).toBeDefined());
    it("Entities is defined", () => expect(main_1.MolangData.Entities).toBeDefined());
    it("FeaturesRules is defined", () => expect(main_1.MolangData.FeaturesRules).toBeDefined());
    it("General is defined", () => expect(main_1.MolangData.General).toBeDefined());
    it("Items is defined", () => expect(main_1.MolangData.Items).toBeDefined());
    it("Particle is defined", () => expect(main_1.MolangData.Particles).toBeDefined());
    it("RenderControllers is defined", () => expect(main_1.MolangData.RenderControllers).toBeDefined());
});
//# sourceMappingURL=data.test.js.map