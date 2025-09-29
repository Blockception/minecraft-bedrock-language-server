import { General } from '../../src';

describe("General", () => {
  describe("getQueries", () => {
    const queries = ["unhappy_counter", "time_of_day", "swelling_dir"];

    queries.forEach((item) =>
      it(`getQuery should return ${item}`, () => {
        expect(General.getQuery(item)).toBeDefined();
      })
    );
  });

  describe("getMath", () => {
    const math = ["abs", "cos", "sin"];

    math.forEach((item) =>
      it(item, () => {
        expect(General.getMath(item)).toBeDefined();
      })
    );
  });
});
