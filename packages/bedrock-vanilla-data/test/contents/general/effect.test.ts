import { MinecraftData } from "../../../src/main";

describe("General", () => {
  it("effect", () => {
    expect(MinecraftData.General.Effects).toBeDefined();

    expect(MinecraftData.General.Effects.length).toBeGreaterThan(0);
  });
});
