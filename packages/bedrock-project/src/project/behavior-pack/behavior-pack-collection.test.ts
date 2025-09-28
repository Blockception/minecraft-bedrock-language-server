import { Location } from "bc-minecraft-bedrock-types/lib/types";
import { MCProject } from "bc-minecraft-project";
import { BehaviorPackCollection } from ".";
import { Manifest } from "../../internal/types";

describe("BehaviorPackCollection", () => {
  it("sanity check", () => {
    const pc = new BehaviorPackCollection();
    expect(pc.packs).toBeDefined();
    expect(pc.packs).toHaveLength(0);

    pc.add("c:\\project\\", MCProject.createEmpty(), {} as Manifest);

    expect(pc.packs).toBeDefined();
    expect(pc.packs).toHaveLength(1);

    expect(pc.delete("c:\\project\\")).toBeTruthy();

    expect(pc.packs).toBeDefined();
    expect(pc.packs).toHaveLength(0);
  });

  it("count", () => {
    const P = new BehaviorPackCollection();

    expect(P.count()).toEqual(0);

    P.add("c:/project/bp", MCProject.createEmpty(), {} as Manifest);

    expect(P.count()).toEqual(1);

    P.add("c:/project2/bp", MCProject.createEmpty(), {} as Manifest);
    expect(P.count()).toEqual(2);
  });

  it("add", () => {
    const P = new BehaviorPackCollection();
    const pack = P.add("c:/project/bp", MCProject.createEmpty(), {} as Manifest);

    expect(pack.folder).toEqual("c:/project/bp");
    expect(P.count()).toEqual(1);

    P.add("c:/project2/bp", MCProject.createEmpty(), {} as Manifest);
    expect(P.count()).toEqual(2);
  });

  it("add duplicate", () => {
    const P = new BehaviorPackCollection();

    expect(P.count()).toEqual(0);

    P.add("c:/project/bp", MCProject.createEmpty(), {} as Manifest);
    P.add("c:/project/bp", MCProject.createEmpty(), {} as Manifest);

    expect(P.count()).toEqual(2);
  });

  it("get", () => {
    const P = new BehaviorPackCollection();
    const pack = P.add("c:\\temp\\bp", MCProject.createEmpty(), {} as Manifest);

    const uri = "c:\\temp\\bp\\loot_tables\\empty.loot.json";
    pack.loot_tables.set({
      id: "empty.loot.json",
      location: Location.create(uri),
    });

    const item = P.get(uri);
    expect(item).toBeDefined();
  });

  it("Remove File", () => {
    const P = new BehaviorPackCollection();
    const pack = P.add("c:\\temp\\bp", MCProject.createEmpty(), {} as Manifest);

    const uri = "c:\\temp\\bp\\loot_tables\\empty.loot.json";

    pack.loot_tables.set({
      id: "empty.loot.json",
      location: Location.create(uri),
    });

    expect(P.packs).toBeDefined();
    expect(P.loot_tables.has("empty.loot.json")).toBeTruthy();

    expect(P.deleteFile(uri)).toBeTruthy();

    expect(P.packs).toBeDefined();
    expect(P.loot_tables.has("empty.loot.json")).toBeFalsy();
  });

  it("Remove Folder", () => {
    const P = new BehaviorPackCollection();
    const pack = P.add("c:\\temp\\bp", MCProject.createEmpty(), {} as Manifest);

    const uri = "c:\\temp\\bp\\loot_tables\\empty.loot.json";

    pack.loot_tables.set({
      id: "empty.loot.json",
      location: Location.create(uri),
    });

    expect(P.loot_tables.has("empty.loot.json")).toBeTruthy();

    expect(P.deleteFolder("c:\\temp\\bp\\loot_tables")).toBeTruthy();

    expect(P.loot_tables.has("empty.loot.json")).toBeFalsy();
  });

  it("Remove Folder - Entire Pack", () => {
    const P = new BehaviorPackCollection();
    const pack = P.add("c:\\temp\\bp", MCProject.createEmpty(), {} as Manifest);

    const uri = "c:\\temp\\bp\\loot_tables\\empty.loot.json";

    pack.loot_tables.set({
      id: "empty.loot.json",
      location: Location.create(uri),
    });

    expect(P.loot_tables.has("empty.loot.json")).toBeTruthy();

    expect(P.deleteFolder("c:\\temp\\bp")).toBeTruthy();

    expect(P.loot_tables.has("empty.loot.json")).toBeFalsy();
    expect(P.count()).toEqual(0);
  });
});
