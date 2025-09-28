import { MinecraftData } from "../../src/main";

describe("Sanity", () => {
  it("No undefined", () => {
    const object = MinecraftData;

    traverse_for_undefined(object, "MinecraftData");
  });
});

function traverse_for_undefined(data: any, path: string): void {
  const names = Object.getOwnPropertyNames(data);

  for (let I = 0; I < names.length; I++) {
    const name = names[I];
    const item = data[name];
    const t = typeof item;

    expect(t).toBeDefined();

    if (t === "object") traverse_for_undefined(item, path + "." + name);
  }
}
