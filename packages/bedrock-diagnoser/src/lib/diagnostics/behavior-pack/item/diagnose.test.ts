import { ItemDefinition } from "./diagnose";

const validIds = ["minecraft:stick", "stick", "stick:0", "namespace:item:variant", "namespace:item"];

describe("ItemDefinition", () => {
  test.each(validIds)("can be parsed correctly: %s", (id) => {
    expect(ItemDefinition.parse(id)).toMatchSnapshot();
  });
});
