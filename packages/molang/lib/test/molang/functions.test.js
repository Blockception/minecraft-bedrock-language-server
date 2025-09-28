"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const molang_1 = require("../../src/molang");
const dataset_lookslike_1 = require("../data/dataset-lookslike");
const dataset_valid_1 = require("../data/dataset-valid");
describe("Functions", () => {
    describe("IsMolangType", () => {
        const shouldbe = [
            "variable.is_holding_right = 0.0;",
            "variable.is_blinking = 0.0;",
            "variable.last_blink_time = 0.0;",
            "variable.hand_bob = 0.0;",
            "variable.first_person_rotation_factor = math.sin((1 - variable.attack_time) * 180.0);",
            "variable.tcos1 = -variable.tcos0;",
            "@s to:anger",
            "@s to:Angrey_wolf",
            "query.variant == 1",
        ];
        test.each(shouldbe)("should be valid: %#. %s", (item) => {
            expect((0, molang_1.isMolangType)(item)).not.toEqual(molang_1.MolangType.unknown);
        });
        const invalid = ["minecraft:player"];
        test.each(invalid)("should not valid: %#. %s", (item) => {
            expect((0, molang_1.isMolangType)(item)).toEqual(molang_1.MolangType.unknown);
        });
    });
    describe("isMolang", () => {
        test.each(dataset_valid_1.valid_syntaxes)("should be valid: %#. %s", (item) => {
            expect((0, molang_1.isMolang)(item)).toBeTruthy();
        });
        test.each(dataset_lookslike_1.looks_like_molang)("should not be valid: %#. %s", (item) => {
            expect((0, molang_1.isMolang)(item)).toBeFalsy();
        });
    });
    it("getEvent", () => {
        const data = (0, molang_1.getEvent)("@s to:anger");
        expect(data).toEqual("to:anger");
    });
    describe("isValidMolang", () => {
        test.each(dataset_valid_1.valid_syntaxes)("isValidMolang should be valid: %#. %s", (item) => {
            expect((0, molang_1.isValidMolang)(item)).toBeTruthy();
        });
    });
});
//# sourceMappingURL=functions.test.js.map