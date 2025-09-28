import { process } from "../../../../src/project/behavior-pack/structure/process";

describe("Structure", () => {
  const data: { uri: string; result: string }[] = [
    {
      uri: "F:\\Temp2\\world\\behavior_packs\\EW-BP\\structures\\empty\\air_1.mcstructure",
      result: '"empty/air_1"',
    },
    {
      uri: "F:/Temp2/world/behavior_packs/EW-BP/structures/empty/air_1.mcstructure",
      result: '"empty/air_1"',
    },
    {
      uri: "F:/Temp2/world/behavior_packs/EW-BP/structures/empty/temp/air_1.mcstructure",
      result: '"empty/temp/air_1"',
    },
  ];

  test.each(data)("$result from $uri", (item) => {
    const out = process({ uri: item.uri, getText: () => "//example" });

    expect(out).toMatchSnapshot();
  });
});
