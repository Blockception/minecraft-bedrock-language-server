import { Integer } from ".";

describe("Integer", () => {
  const valid = ["-123456", "123456"];
  const invalid = ["foo"];

  test.each(valid)("$s should return true", (value) => {
    expect(Integer.is(value)).toBeTruthy();
  });

  test.each(invalid)("$s should return false", (value) => {
    expect(Integer.is(value)).toBeFalsy();
  });
});
