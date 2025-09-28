import { process } from "../../../../src/project/behavior-pack/trading/process";

describe("Trading", () => {
  const files = [
    "F:\\Temp2\\world\\behavior_packs\\EW-BP\\trading\\blocks\\example.json",
    "F:/Temp2/world/behavior_packs/EW-BP/trading/blocks/example.json",
    "F:/Temp2/world/behavior_packs/EW-BP/trading/blocks example.json",
  ];

  test.each(files)("process: $s", (uri) => {
    const out = process({ uri: uri, getText: () => "//example" });
    expect(out).toMatchSnapshot();
  });
});
