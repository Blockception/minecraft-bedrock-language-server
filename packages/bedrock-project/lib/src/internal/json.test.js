"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const json_1 = require("./json");
describe("Json", () => {
    describe("To", () => {
        const data = `{"id":"controller.example","documentation":"example"}`;
        const obj = json_1.Json.To(data);
        it("not undefined", () => {
            expect(obj).toBeDefined();
        });
        if (!obj)
            return;
        it("Validation", () => {
            expect(obj.documentation).toEqual("example");
            expect(obj.id).toEqual("controller.example");
        });
    });
    describe("To Doc", () => {
        const data = `{"id":"controller.example","documentation":"example"}`;
        const obj = json_1.Json.To({ getText: () => data, uri: "example" });
        it("not undefined", () => {
            expect(obj).toBeDefined();
        });
        if (!obj)
            return;
        it("Validation", () => {
            expect(obj.documentation).toEqual("example");
            expect(obj.id).toEqual("controller.example");
        });
    });
});
//# sourceMappingURL=json.test.js.map