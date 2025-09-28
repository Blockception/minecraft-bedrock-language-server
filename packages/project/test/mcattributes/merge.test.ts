import { MCAttributes } from '../../src/main';

describe("MCAttributes", () => {
  it("given two mcattributes, can be merged", () => {
    const first: MCAttributes = {
      "property-1": "value-1",
      "property-2": "value-1",
      "property-3": "value-1",
      "property-4": "value-1",
      "property-5": "value-1",
      "property-6": "value-1",
    };
    const second: MCAttributes = {
      "property-5": "value-2",
      "property-6": "value-2",
      "property-7": "value-2",
      "property-8": "value-2",
      "property-9": "value-2",
    };

    const merged = MCAttributes.merge(first, second);
    expect(merged).toMatchSnapshot()
  })
})