"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const text_1 = require("./text");
describe("Text", () => {
    const tests = [
        ['"example"', "example"],
        ["example", "example"],
        ['"I am too complex"', '"I am too complex"'],
    ];
    describe("unQuote", () => {
        tests.forEach((test) => {
            const [from, to] = test;
            it(`${from} => ${to}`, () => {
                expect(text_1.Text.UnQuote(from)).toEqual(to);
            });
        });
    });
});
//# sourceMappingURL=text.test.js.map