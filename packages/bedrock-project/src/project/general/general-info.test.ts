import { GeneralInfo } from "../../../src/project/general/types/general-info";

describe("GeneralInfo", () => {
  describe("Create", () => {
    it("With quotes", () => {
      const test = GeneralInfo.create('"example"', { position: 0, uri: "example" }, "A fake entity");

      expect(test.id).toEqual("example");
    });

    it("Without quotes", () => {
      const test = GeneralInfo.create("example", { position: 0, uri: "example" }, "A fake entity");

      expect(test.id).toEqual("example");
    });
  });
});
