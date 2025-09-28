import { Coordinate } from "./coordinate";

describe("Coordinates", () => {
  const valid = [
    //Positive integers
    "^+5",
    "~+5",
    "^5",
    "~5",

    //Positive floats
    "^+5.2",
    "~+5.3",
    "~+0.5",
    "~+.5",
    "^5.2",
    "~5.3",
    "~.5",
    "~0.5",

    //Negative integers
    "^-5",
    "~-5",
    "~-.5",

    //Negative floats
    "^-5.2",
    "~-5.3",

    //Other
    "^",
    "~",
    "^0",
    "~0",
  ];

  const invalid = ["&16", "*4341", "x", "y"];

  test.each(valid)("$s should return true", (value) => {
    expect(Coordinate.is(value)).toBeTruthy();
  });

  test.each(invalid)("$s should return false", (value) => {
    expect(Coordinate.is(value)).toBeFalsy();
  });
});
