"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const main_1 = require("../../src/main");
describe("Sanity", () => {
    it("No undefined", () => {
        const object = main_1.MinecraftData;
        traverse_for_undefined(object, "MinecraftData");
    });
});
function traverse_for_undefined(data, path) {
    const names = Object.getOwnPropertyNames(data);
    for (let I = 0; I < names.length; I++) {
        const name = names[I];
        const item = data[name];
        const t = typeof item;
        expect(t).toBeDefined();
        if (t === "object")
            traverse_for_undefined(item, path + "." + name);
    }
}
//# sourceMappingURL=sanity.js.map