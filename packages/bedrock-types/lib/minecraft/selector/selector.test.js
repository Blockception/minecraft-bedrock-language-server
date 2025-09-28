"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
describe("Selector", () => {
    describe("Types", () => {
        const validTypes = ["@a", "@s", "@c", "@v", "@e", "@p", "@r", "@initiator"];
        const invalidType = ["@x"];
        validTypes.forEach((type) => {
            it(`Type: ${type} should be valid`, () => {
                expect(_1.Selector.isValidType(type)).toBeTruthy();
            });
        });
        invalidType.forEach((type) => {
            it(`Type: ${type} should be invalid`, () => {
                expect(_1.Selector.isValidType(type)).toBeFalsy();
            });
        });
    });
    describe("Is", () => {
        const valid = [
            ["@a", true, true],
            ["@s", true, true],
            ["@c", true, true],
            ["@v", true, true],
            ["@e", true, true],
            ["@p", true, true],
            ["@r", true, true],
            ['"Fake player"', false, true],
            ["@initiator", true, true],
            ["*", true, true],
        ];
        const invalid = [
            ["@x", true, true],
            ["test", false, false],
            ['"Fake player"', false, false],
            ["*", false, false],
        ];
        valid.forEach((args) => {
            it(`Type: ${args[0]} should be valid`, () => {
                expect(_1.Selector.isSelector(args[0], args[1], args[2])).toBeTruthy();
            });
        });
        invalid.forEach((args) => {
            it(`Type: ${args[0]} should be invalid`, () => {
                expect(_1.Selector.isSelector(args[0], args[1], args[2])).toBeFalsy();
            });
        });
    });
});
//# sourceMappingURL=selector.test.js.map