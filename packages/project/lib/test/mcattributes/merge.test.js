"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const main_1 = require("../../src/main");
describe("MCAttributes", () => {
    it("given two mcattributes, can be merged", () => {
        const first = {
            "property-1": "value-1",
            "property-2": "value-1",
            "property-3": "value-1",
            "property-4": "value-1",
            "property-5": "value-1",
            "property-6": "value-1",
        };
        const second = {
            "property-5": "value-2",
            "property-6": "value-2",
            "property-7": "value-2",
            "property-8": "value-2",
            "property-9": "value-2",
        };
        const merged = main_1.MCAttributes.merge(first, second);
        expect(merged).toMatchSnapshot();
    });
});
