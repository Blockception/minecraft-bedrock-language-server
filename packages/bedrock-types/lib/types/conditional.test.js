"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
describe("Conditional", () => {
    it("getId", () => {
        const example = { example: 1 };
        expect(_1.Conditional.getId(example)).toEqual("example");
    });
    it("getId2", () => {
        expect(_1.Conditional.getId("example")).toEqual("example");
    });
    it("getCondition", () => {
        const example = { example: 1 };
        expect(_1.Conditional.getCondition(example)).toEqual(1);
    });
    it("getCondition2", () => {
        const example = { example: "foo" };
        expect(_1.Conditional.getCondition(example)).toEqual("foo");
    });
    it("forEach works as intented", () => {
        const example = [{ example: "foo" }, "foo", { example2: 1 }];
        const values = [];
        const ids = [];
        _1.Conditional.forEach(example, (id, value) => {
            values.push(value);
            ids.push(id);
        });
        expect(ids).toEqual(expect.arrayContaining(["example", "foo", "example2"]));
        expect(values).toEqual(expect.arrayContaining(["foo", 1, "1.0"]));
    });
});
//# sourceMappingURL=conditional.test.js.map