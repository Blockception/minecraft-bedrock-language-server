import { process } from "./process";

describe("Function", () => {
  const data: { uri: string; result: string }[] = [
    {
      uri: "F:\\Temp2\\world\\behavior_packs\\EW-BP\\functions\\empty\\air_1.mcfunction",
      result: "empty/air_1",
    },
    {
      uri: "F:/Temp2/world/behavior_packs/EW-BP/functions/empty/air_1.mcfunction",
      result: "empty/air_1",
    },
    {
      uri: "F:/Temp2/world/behavior_packs/EW-BP/functions/empty/temp/air_1.mcfunction",
      result: "empty/temp/air_1",
    },
    {
      uri: "F:/Temp2/world/behavior_packs/EW-BP/functions/empty/temp build/air_1.mcfunction",
      result: '"empty/temp build/air_1"',
    },
  ];

  test.each(data)(`$result from $uri`, (item) => {
    const data = process({ uri: item.uri, getText: () => "//example" });

    expect(data).toMatchSnapshot();
  });
});
