"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const diagnose_1 = require("./diagnose");
const validIds = ["minecraft:stick", "stick", "stick:0", "namespace:item:variant", "namespace:item"];
describe("ItemDefinition", () => {
    test.each(validIds)("can be parsed correctly: %s", (id) => {
        expect(diagnose_1.ItemDefinition.parse(id)).toMatchSnapshot();
    });
});
//# sourceMappingURL=diagnose.test.js.map