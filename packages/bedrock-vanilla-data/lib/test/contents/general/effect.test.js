"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const main_1 = require("../../../src/main");
describe("General", () => {
    it("effect", () => {
        expect(main_1.MinecraftData.General.Effects).toBeDefined();
        expect(main_1.MinecraftData.General.Effects.length).toBeGreaterThan(0);
    });
});
//# sourceMappingURL=effect.test.js.map