import { MCIgnore } from "../../src/main";

const Text1 = `OutputFolder
Temp
Template/something
!BP/**/*.json`;

describe("MCIgnore", () => {
  const data = MCIgnore.parse(Text1);
  const content = MCIgnore.toString(data);
  const lines = Text1.split("\n");

  lines
    .map((item) => item.trim())
    .forEach((item) => {
      it(`${item} is present`, () => {
        expect(content.includes(item)).toBeTruthy();
      });
    });
});
