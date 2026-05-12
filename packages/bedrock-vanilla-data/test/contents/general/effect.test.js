"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const src_1 = require("../../../src");
describe('General', () => {
    it('effect', () => {
        expect(src_1.MinecraftData.General.Effects).toBeDefined();
        expect(src_1.MinecraftData.General.Effects.length).toBeGreaterThan(0);
    });
});
//# sourceMappingURL=effect.test.js.map