import { XP } from "./xp";

describe("XP", () => {
  const valid = ["13", "1000", "-1000", "13L", "1000L", "-1000L"];

  const invalid = ["13.64", "1000.74", "-1000.26", "13.15376L", "1000.546L", "-1000.123L", "asdb", "xpL", "-aL"];

  valid.forEach((value) => {
    it(`is(${value}) should return true`, () => {
      expect(XP.is(value)).toBeTruthy();
    });

    if (value.endsWith("L") || value.endsWith("l")) {
      const integer = parseInt(value.slice(0, -1));

      it(`isLevel(${value}) should return true`, () => {
        expect(XP.isLevel(value)).toBeTruthy();
      });

      it(`parse(${value}) should return ${integer}`, () => {
        expect(XP.parse(value)).toEqual(integer);
      });
    } else {
      it(`isLevel(${value}) should return false`, () => {
        expect(XP.isLevel(value)).toBeFalsy();
      });

      const integer = parseInt(value);

      it(`parse(${value}) should return ${integer}`, () => {
        expect(XP.parse(value)).toEqual(integer);
      });
    }
  });

  invalid.forEach((value) => {
    it(`is(${value}) should return false`, () => {
      expect(XP.is(value)).toBeFalsy();
    });
  });
});
