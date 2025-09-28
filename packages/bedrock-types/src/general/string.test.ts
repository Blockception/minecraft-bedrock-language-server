import { String } from ".";

describe("String", () => {
  const valid = ["foo", "bar", '"im valid now"'];
  const invalid = ["im not valid"];

  test.each(valid)("$s should return true", (value) => {
    expect(String.is(value)).toBeTruthy();
  });

  test.each(invalid)("$s should return false", (value) => {
    expect(String.is(value)).toBeFalsy();
  });
});
