import { MCAttributes } from "../../src/main";

const Text1 = `diagnostics.objectives=true
diagnostics.tags=false
diagnostics.json=true`;

describe("MCAttributes", () => {
  describe("tostring1", () => {
    const data = MCAttributes.parse(Text1);
    const content = MCAttributes.toString(data);
    const lines = Text1.split("\n");

    lines
      .map((item) => item.trim())
      .forEach((item) => {
        it(`${item} is present`, () => {
          expect(content.includes(item)).toBeTruthy();
        });
      });
  });
});
