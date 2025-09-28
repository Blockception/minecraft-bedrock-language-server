import { Json } from "./json";

describe("Json", () => {
  describe("To", () => {
    const data = `{"id":"controller.example","documentation":"example"}`;
    const obj = Json.To<TestInterface>(data);

    it("not undefined", () => {
      expect(obj).toBeDefined();
    });

    if (!obj) return;

    it("Validation", () => {
      expect(obj.documentation).toEqual("example");
      expect(obj.id).toEqual("controller.example");
    });
  });

  describe("To Doc", () => {
    const data = `{"id":"controller.example","documentation":"example"}`;
    const obj = Json.To<TestInterface>({ getText: () => data, uri: "example" });

    it("not undefined", () => {
      expect(obj).toBeDefined();
    });

    if (!obj) return;

    it("Validation", () => {
      expect(obj.documentation).toEqual("example");
      expect(obj.id).toEqual("controller.example");
    });
  });
});

interface TestInterface {
  id: string;
  documentation: string;
}
