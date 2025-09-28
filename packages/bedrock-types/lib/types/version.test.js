"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
describe("Version", () => {
    it("parse", () => {
        const v = _1.Version.parse("1.10");
        expect(v.major).toEqual(1);
        expect(v.minor).toEqual(10);
        expect(v.patch).toEqual(0);
        const v2 = _1.Version.parse("1.16.220");
        expect(v2.major).toEqual(1);
        expect(v2.minor).toEqual(16);
        expect(v2.patch).toEqual(220);
    });
    it("from Array", () => {
        const v = _1.Version.fromArray([1, 16, 220]);
        expect(v.major).toEqual(1);
        expect(v.minor).toEqual(16);
        expect(v.patch).toEqual(220);
        const vv = _1.Version.fromArray([1, 16]);
        expect(vv.major).toEqual(1);
        expect(vv.minor).toEqual(16);
        expect(vv.patch).toEqual(0);
    });
    it("compare", () => {
        expect(_1.Version.compare("1.10.0", "1.17.0")).toEqual(-1);
        expect(_1.Version.compare("1.16.220", "1.10.0")).toEqual(1);
        expect(_1.Version.compare([1, 10, 220], "1.10.0")).toEqual(1);
        expect(_1.Version.compare({ major: 1, minor: 10, patch: 0 }, "1.17.0")).toEqual(-1);
        expect(_1.Version.compare("1.16.220", { major: 1, minor: 10, patch: 0 })).toEqual(1);
        expect(_1.Version.compare([1, 10, 220], { major: 1, minor: 10, patch: 0 })).toEqual(1);
    });
});
//# sourceMappingURL=version.test.js.map