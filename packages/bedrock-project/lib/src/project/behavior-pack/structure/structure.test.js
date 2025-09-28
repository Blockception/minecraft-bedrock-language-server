"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const process_1 = require("../../../../src/project/behavior-pack/structure/process");
describe("Structure", () => {
    const data = [
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
        const out = (0, process_1.process)({ uri: item.uri, getText: () => "//example" });
        expect(out).toMatchSnapshot();
    });
});
//# sourceMappingURL=structure.test.js.map