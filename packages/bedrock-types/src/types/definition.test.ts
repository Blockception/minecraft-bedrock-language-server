import { Definition } from ".";

describe("Definition", () => {
  it("getId", () => {
    const example: Definition = {
      walk: "animation.sheep.walk",
      default: "animation.sheep.default",
    };

    expect(Definition.count(example)).toEqual(2);
    expect(Definition.getId(example, 0)).toEqual("animation.sheep.walk");
    expect(Definition.getId(example, 1)).toEqual("animation.sheep.default");
  });

  it("getIds", () => {
    const example: Definition = {
      walk: "animation.sheep.walk",
      default: "animation.sheep.default",
    };

    const keys = Definition.getIds(example);
    expect(keys).toEqual(expect.arrayContaining(["animation.sheep.walk", "animation.sheep.default"]));
  });

  it("getReference", () => {
    const example: Definition = {
      walk: "animation.sheep.walk",
      default: "animation.sheep.default",
    };

    expect(Definition.count(example)).toEqual(2);
    expect(Definition.getReference(example, 0)).toEqual("walk");
    expect(Definition.getReference(example, 1)).toEqual("default");
  });

  it("getReferences", () => {
    const example: Definition = {
      walk: "animation.sheep.walk",
      default: "animation.sheep.default",
    };

    const keys = Definition.getReferences(example);
    expect(keys).toEqual(expect.arrayContaining(["walk", "default"]));
  });

  it("foreach", () => {
    const example: Definition = {
      walk: "animation.sheep.walk",
      default: "animation.sheep.default",
    };

    const ids: string[] = [];
    const references: string[] = [];

    Definition.forEach(example, (reference, id) => {
      ids.push(id);
      references.push(reference);
    });

    expect(ids).toEqual(expect.arrayContaining(["animation.sheep.walk", "animation.sheep.default"]));
    expect(references).toEqual(expect.arrayContaining(["walk", "default"]));
  });
});
