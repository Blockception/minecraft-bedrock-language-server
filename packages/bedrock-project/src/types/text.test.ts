import { Text } from "./text";

describe("Text", () => {
  const tests = [
    ['"example"', "example"],
    ["example", "example"],
    ['"I am too complex"', '"I am too complex"'],
  ];

  describe("unQuote", () => {
    tests.forEach((test) => {
      const [from, to] = test;
      it(`${from} => ${to}`, () => {
        expect(Text.UnQuote(from)).toEqual(to);
      });
    });
  });
});
