"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const main_1 = require("../../src/main");
describe("MCAttributes", () => {
    it("given two mcattributes, can be merged", () => {
        const item = {
            "property-1": "value-1",
            "property-2": "value-1",
            "property-3": "value-1",
            "property-4": "value-1",
            "property-5": "value-1",
            "property-6": "value-1",
        };
        for (let i = 0; i < 10; i++) {
            const key = `property-${i}`;
            const value = `value-2-${i}`;
            main_1.MCAttributes.getOrAdd(item, key, value);
        }
        expect(item).toMatchSnapshot();
    });
});
