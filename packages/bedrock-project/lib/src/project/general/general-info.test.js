"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const general_info_1 = require("../../../src/project/general/types/general-info");
describe("GeneralInfo", () => {
    describe("Create", () => {
        it("With quotes", () => {
            const test = general_info_1.GeneralInfo.create('"example"', { position: 0, uri: "example" }, "A fake entity");
            expect(test.id).toEqual("example");
        });
        it("Without quotes", () => {
            const test = general_info_1.GeneralInfo.create("example", { position: 0, uri: "example" }, "A fake entity");
            expect(test.id).toEqual("example");
        });
    });
});
//# sourceMappingURL=general-info.test.js.map