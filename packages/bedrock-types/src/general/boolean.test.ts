import { Boolean } from ".";

describe("Boolean", () => {
  const tests = [
    { value: "0", is: false, parse: false },
    { value: "1", is: false, parse: true },
    { value: "false", is: true, parse: false },
    { value: "False", is: true, parse: false },
    { value: "foo", is: false, parse: false },
    { value: "true", is: true, parse: true },
    { value: "True", is: true, parse: true },
  ];

  test.each(tests)("parse and pass: '$value' -> is: $is, parse: $parse", (item) => {
    const { value, is, parse } = item;

    expect(Boolean.is(value)).toEqual(is);
    expect(Boolean.parse(value)).toEqual(parse);
  });
});
