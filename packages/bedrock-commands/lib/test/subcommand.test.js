"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const main_1 = require("../src/main");
describe("subcommand", () => {
    test("function subcommand should be retrievable", () => {
        const c = main_1.Command.parse("execute run function test");
        let sub = c.getSubCommand(true);
        expect(sub).toBeDefined();
        expect(sub === null || sub === void 0 ? void 0 : sub.getKeyword()).toEqual("run");
        sub = sub === null || sub === void 0 ? void 0 : sub.getSubCommand(true);
        expect(sub).toBeDefined();
        expect(sub === null || sub === void 0 ? void 0 : sub.getKeyword()).toEqual("function");
    });
    test("say subcommand should be retrievable", () => {
        const c = main_1.Command.parse("execute run say hi");
        let sub = c.getSubCommand(true);
        expect(sub).toBeDefined();
        expect(sub === null || sub === void 0 ? void 0 : sub.getKeyword()).toEqual("run");
        sub = sub === null || sub === void 0 ? void 0 : sub.getSubCommand(true);
        expect(sub).toBeDefined();
        expect(sub === null || sub === void 0 ? void 0 : sub.getKeyword()).toEqual("say");
    });
    test("function subcommand should be retrievable", () => {
        const c = main_1.Command.parse("execute as @s at @s run function test");
        let sub = c.getSubCommand(true);
        expect(sub).toBeDefined();
        expect(sub === null || sub === void 0 ? void 0 : sub.getKeyword()).toEqual("as");
        sub = sub === null || sub === void 0 ? void 0 : sub.getSubCommand(true);
        expect(sub).toBeDefined();
        expect(sub === null || sub === void 0 ? void 0 : sub.getKeyword()).toEqual("at");
        sub = sub === null || sub === void 0 ? void 0 : sub.getSubCommand(true);
        expect(sub).toBeDefined();
        expect(sub === null || sub === void 0 ? void 0 : sub.getKeyword()).toEqual("run");
        sub = sub === null || sub === void 0 ? void 0 : sub.getSubCommand(true);
        expect(sub).toBeDefined();
        expect(sub === null || sub === void 0 ? void 0 : sub.getKeyword()).toEqual("function");
    });
});
//# sourceMappingURL=subcommand.test.js.map