import { MolangData } from "../../src/main";

describe("Data sanity check", () => {
  it("Animations is defined", () => expect(MolangData.Animations).toBeDefined());
  it("AnimationsControllers is defined", () => expect(MolangData.AnimationsControllers).toBeDefined());
  it("Blocks is defined", () => expect(MolangData.Blocks).toBeDefined());
  it("Entities is defined", () => expect(MolangData.Entities).toBeDefined());
  it("FeaturesRules is defined", () => expect(MolangData.FeaturesRules).toBeDefined());
  it("General is defined", () => expect(MolangData.General).toBeDefined());
  it("Items is defined", () => expect(MolangData.Items).toBeDefined());
  it("Particle is defined", () => expect(MolangData.Particles).toBeDefined());
  it("RenderControllers is defined", () => expect(MolangData.RenderControllers).toBeDefined());
});
