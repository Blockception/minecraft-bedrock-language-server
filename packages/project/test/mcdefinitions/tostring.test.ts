import { MCDefinition } from "../../src/main";

const Text1 = `tag=allowed
tag=!denied
family=npc
family=enemy`;

describe("MCDefinitions", () => {
  describe("tostring1", () => {
    const data = MCDefinition.parse(Text1);
    const content = MCDefinition.toString(data);
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
