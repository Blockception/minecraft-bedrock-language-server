"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const json_1 = require("../json");
const _1 = require(".");
describe("Selector - Parse", () => {
    const data = [
        {
            selector: "@a[tag=Sometag,scores={foo=1..}]",
            offset: 0,
            type: "@a",
            contains: ["tag", "scores"],
        },
        {
            selector: "@a[tag=Sometag,scores={foo=1..}]",
            offset: 0,
            type: "@a",
            contains: ["tag", "scores"],
        },
        {
            selector: "@a[x=~0.5,y=50,z=~50,r=50,rm=3,tag=something]",
            offset: 0,
            type: "@a",
            contains: ["x", "y", "z", "r", "rm", "tag"],
        },
        {
            selector: "@e[family=]",
            offset: 5,
            type: "@e",
            contains: ["family"],
        },
        {
            selector: "@a[x =~0.5, y=50, z =~50,r =50, rm =3,tag =something,tag =!foo]",
            offset: 5,
            type: "@a",
            contains: ["x", "y", "z", "r", "rm", "tag"],
        },
    ];
    data.forEach((test) => {
        it(`Should parse ${test.selector}`, () => {
            const { selector, offset } = test;
            const sel = _1.Selector.parse(selector, offset);
            expect(sel).toBeDefined();
            if (sel === undefined)
                return;
            expect(sel.selectorType).toEqual(test.type);
            expect(sel.type).toEqual(json_1.CompactJson.Type.Array);
            test.contains.forEach((attr) => contains(sel, attr));
        });
    });
});
function contains(sel, attr) {
    expect(sel.contains(attr)).toBeTruthy();
}
//# sourceMappingURL=parse.test.js.map