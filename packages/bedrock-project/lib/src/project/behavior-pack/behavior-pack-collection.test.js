"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("bc-minecraft-bedrock-types/lib/types");
const bc_minecraft_project_1 = require("bc-minecraft-project");
const _1 = require(".");
describe("BehaviorPackCollection", () => {
    it("sanity check", () => {
        const pc = new _1.BehaviorPackCollection();
        expect(pc.packs).toBeDefined();
        expect(pc.packs).toHaveLength(0);
        pc.add("c:\\project\\", bc_minecraft_project_1.MCProject.createEmpty(), {});
        expect(pc.packs).toBeDefined();
        expect(pc.packs).toHaveLength(1);
        expect(pc.delete("c:\\project\\")).toBeTruthy();
        expect(pc.packs).toBeDefined();
        expect(pc.packs).toHaveLength(0);
    });
    it("count", () => {
        const P = new _1.BehaviorPackCollection();
        expect(P.count()).toEqual(0);
        P.add("c:/project/bp", bc_minecraft_project_1.MCProject.createEmpty(), {});
        expect(P.count()).toEqual(1);
        P.add("c:/project2/bp", bc_minecraft_project_1.MCProject.createEmpty(), {});
        expect(P.count()).toEqual(2);
    });
    it("add", () => {
        const P = new _1.BehaviorPackCollection();
        const pack = P.add("c:/project/bp", bc_minecraft_project_1.MCProject.createEmpty(), {});
        expect(pack.folder).toEqual("c:/project/bp");
        expect(P.count()).toEqual(1);
        P.add("c:/project2/bp", bc_minecraft_project_1.MCProject.createEmpty(), {});
        expect(P.count()).toEqual(2);
    });
    it("add duplicate", () => {
        const P = new _1.BehaviorPackCollection();
        expect(P.count()).toEqual(0);
        P.add("c:/project/bp", bc_minecraft_project_1.MCProject.createEmpty(), {});
        P.add("c:/project/bp", bc_minecraft_project_1.MCProject.createEmpty(), {});
        expect(P.count()).toEqual(2);
    });
    it("get", () => {
        const P = new _1.BehaviorPackCollection();
        const pack = P.add("c:\\temp\\bp", bc_minecraft_project_1.MCProject.createEmpty(), {});
        const uri = "c:\\temp\\bp\\loot_tables\\empty.loot.json";
        pack.loot_tables.set({
            id: "empty.loot.json",
            location: types_1.Location.create(uri),
        });
        const item = P.get(uri);
        expect(item).toBeDefined();
    });
    it("Remove File", () => {
        const P = new _1.BehaviorPackCollection();
        const pack = P.add("c:\\temp\\bp", bc_minecraft_project_1.MCProject.createEmpty(), {});
        const uri = "c:\\temp\\bp\\loot_tables\\empty.loot.json";
        pack.loot_tables.set({
            id: "empty.loot.json",
            location: types_1.Location.create(uri),
        });
        expect(P.packs).toBeDefined();
        expect(P.loot_tables.has("empty.loot.json")).toBeTruthy();
        expect(P.deleteFile(uri)).toBeTruthy();
        expect(P.packs).toBeDefined();
        expect(P.loot_tables.has("empty.loot.json")).toBeFalsy();
    });
    it("Remove Folder", () => {
        const P = new _1.BehaviorPackCollection();
        const pack = P.add("c:\\temp\\bp", bc_minecraft_project_1.MCProject.createEmpty(), {});
        const uri = "c:\\temp\\bp\\loot_tables\\empty.loot.json";
        pack.loot_tables.set({
            id: "empty.loot.json",
            location: types_1.Location.create(uri),
        });
        expect(P.loot_tables.has("empty.loot.json")).toBeTruthy();
        expect(P.deleteFolder("c:\\temp\\bp\\loot_tables")).toBeTruthy();
        expect(P.loot_tables.has("empty.loot.json")).toBeFalsy();
    });
    it("Remove Folder - Entire Pack", () => {
        const P = new _1.BehaviorPackCollection();
        const pack = P.add("c:\\temp\\bp", bc_minecraft_project_1.MCProject.createEmpty(), {});
        const uri = "c:\\temp\\bp\\loot_tables\\empty.loot.json";
        pack.loot_tables.set({
            id: "empty.loot.json",
            location: types_1.Location.create(uri),
        });
        expect(P.loot_tables.has("empty.loot.json")).toBeTruthy();
        expect(P.deleteFolder("c:\\temp\\bp")).toBeTruthy();
        expect(P.loot_tables.has("empty.loot.json")).toBeFalsy();
        expect(P.count()).toEqual(0);
    });
});
//# sourceMappingURL=behavior-pack-collection.test.js.map