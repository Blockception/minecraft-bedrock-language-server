import { Conditional } from ".";

describe("Conditional", () => {
  it("getId", () => {
    const example: Conditional = { example: 1 };

    expect(Conditional.getId(example)).toEqual("example");
  });

  it("getId2", () => {
    expect(Conditional.getId("example")).toEqual("example");
  });

  it("getCondition", () => {
    const example: Conditional = { example: 1 };

    expect(Conditional.getCondition(example)).toEqual(1);
  });

  it("getCondition2", () => {
    const example: Conditional = { example: "foo" };

    expect(Conditional.getCondition(example)).toEqual("foo");
  });

  it("forEach works as intented", () => {
    const example: (Conditional | string)[] = [{ example: "foo" }, "foo", { example2: 1 }];

    const values: (string | number)[] = [];
    const ids: string[] = [];

    Conditional.forEach(example, (id, value) => {
      values.push(value);
      ids.push(id);
    });

    expect(ids).toEqual(expect.arrayContaining(["example", "foo", "example2"]));
    expect(values).toEqual(expect.arrayContaining(["foo", 1, "1.0"]));
  });
});
