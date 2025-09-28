import { MCProject } from "bc-minecraft-project";
import { BehaviorPack } from "../../../src/main";
import { Manifest } from "../../../src/internal/types";

describe("BehaviorPack", () => {
  describe("sanity check", () => {
    const BP = new BehaviorPack.BehaviorPack("c:\\test", MCProject.createEmpty(), {} as Manifest);

    it("animation controllers", () => {
      expect(typeof BP.animation_controllers === "object").toBeTruthy();
    });

    it("animations", () => {
      expect(typeof BP.animations === "object").toBeTruthy();
    });

    it("blocks", () => {
      expect(typeof BP.blocks === "object").toBeTruthy();
    });

    it("context", () => {
      expect(typeof BP.context === "object").toBeTruthy();
    });

    it("entities", () => {
      expect(typeof BP.entities === "object").toBeTruthy();
    });

    it("folder", () => {
      expect(typeof BP.folder === "string").toBeTruthy();
    });

    it("functions", () => {
      expect(typeof BP.functions === "object").toBeTruthy();
    });

    it("items", () => {
      expect(typeof BP.items === "object").toBeTruthy();
    });

    it("loot_tables", () => {
      expect(typeof BP.loot_tables === "object").toBeTruthy();
    });

    it("structures", () => {
      expect(typeof BP.structures === "object").toBeTruthy();
    });

    it("trading", () => {
      expect(typeof BP.trading === "object").toBeTruthy();
    });
  });

  describe("is", () => {
    const BP = new BehaviorPack.BehaviorPack("c:\\test", MCProject.createEmpty(), {} as Manifest);

    it("Is not undefined", () => {
      expect(BP).toBeDefined();
    });

    it("Is not an object", () => {
      expect(typeof BP === "object").toBeTruthy();
    });

    it("Is a BehaviorPack", () => {
      expect(BehaviorPack.BehaviorPack.is(BP)).toBeTruthy();
    });
  });
});
