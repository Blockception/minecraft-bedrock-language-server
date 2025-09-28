"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const process_1 = require("./process");
describe("Function", () => {
    const data = [
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
        const data = (0, process_1.process)({ uri: item.uri, getText: () => "//example" });
        expect(data).toMatchSnapshot();
    });
});
//# sourceMappingURL=function.test.js.map