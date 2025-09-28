"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const process_1 = require("./process");
describe("LootTable", () => {
    const files = [
        "F:\\Temp2\\world\\behavior_packs\\EW-BP\\loot_tables\\blocks\\example.json",
        "F:/Temp2/world/behavior_packs/EW-BP/loot_tables/blocks/example.json",
        "F:/Temp2/world/behavior_packs/EW-BP/loot_tables/blocks example.json",
    ];
    test.each(files)("process $s", (uri) => {
        const data = (0, process_1.process)({ uri: uri, getText: () => "//example" });
        expect(data).toMatchSnapshot();
    });
});
//# sourceMappingURL=loot-table.test.js.map