import { Json } from ".";

describe("Json", () => {
  const isObject = ['{"rawtext":[{"text":"example"}]}', '{"rawtext":[{"text":"example}]}'];
  const isObjectInvalid= ['{"rawtext":[{"text":"example"}]', '{"rawtext"'];

  test.each(isObject)("isObject($s) should return true", (value) => {
    expect(Json.isObject(value)).toBeTruthy();
  });

  test.each(isObjectInvalid)("isObject($s) should return false", (value) => {
    expect(Json.isObject(value)).toBeFalsy();
  });

  const isArray = ['["rawtext",[{"text":"example"}]]'];
  const isArrayInvalid = ["example:something,hello:1", "[foo:1"];

  isArray.forEach((value) => {
    it(`isArray(${value}) should return true`, () => {
      expect(Json.isArray(value)).toBeTruthy();
    });
  });

  isArrayInvalid.forEach((value) => {
    it(`isArray(${value}) should return false`, () => {
      expect(Json.isArray(value)).toBeFalsy();
    });
  });
});
