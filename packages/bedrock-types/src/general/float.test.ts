import { Float } from ".";

describe("Float", () => {
  const valid = ["0.2", "-0.2", "-.2", ".2", "123456.987654", "-123456.987654", "-.987654", ".987654"];

  test.each(valid)("is %s should return false", (item) => {
    expect(Float.is(item)).toBeTruthy();
  });

  const invalid = ["foo"];

  test.each(invalid)("is %s should return false", (item) => {
    expect(Float.is(item)).toBeFalsy();
  });
});
