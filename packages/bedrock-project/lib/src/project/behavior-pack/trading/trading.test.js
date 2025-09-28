"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const process_1 = require("../../../../src/project/behavior-pack/trading/process");
describe("Trading", () => {
    const files = [
        "F:\\Temp2\\world\\behavior_packs\\EW-BP\\trading\\blocks\\example.json",
        "F:/Temp2/world/behavior_packs/EW-BP/trading/blocks/example.json",
        "F:/Temp2/world/behavior_packs/EW-BP/trading/blocks example.json",
    ];
    test.each(files)("process: $s", (uri) => {
        const out = (0, process_1.process)({ uri: uri, getText: () => "//example" });
        expect(out).toMatchSnapshot();
    });
});
//# sourceMappingURL=trading.test.js.map