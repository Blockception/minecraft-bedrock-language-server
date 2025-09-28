"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bc_minecraft_project_1 = require("bc-minecraft-project");
const _1 = require(".");
describe("ResourcePackCollection", () => {
    it("sanity check", () => {
        const pc = new _1.ResourcePackCollection();
        expect(pc.packs).toBeDefined();
        expect(pc.packs).toHaveLength(0);
        pc.add("c:\\project\\", bc_minecraft_project_1.MCProject.createEmpty(), {});
        expect(pc.packs).toBeDefined();
        expect(pc.packs).toHaveLength(1);
        expect(pc.delete("c:\\project\\")).toBeTruthy();
        expect(pc.packs).toBeDefined();
        expect(pc.packs).toHaveLength(0);
    });
});
//# sourceMappingURL=resource-pack-collection.test.js.map