import { Location } from "bc-minecraft-bedrock-types/lib/types";
import { MolangSet } from "bc-minecraft-molang/lib/src/molang";
import { MCProject } from "bc-minecraft-project";
import { TextProjectContext } from "../../test/utility";
import { Manifest } from "../internal/types";
import { Defined, References, Using } from "../types/references";
import { BehaviorPack } from "./behavior-pack";
import { ProjectData } from "./project-data";
import { ResourcePack } from "./resource-pack";

describe("ProjectData", () => {
  describe("Sanity Check", () => {
    const P = new ProjectData(new TextProjectContext());

    it("P is not undefined", () => {
      expect(P).toBeDefined();
    });

    describe("BehaviorPacks", () => {
      it("Is not undefined", () => {
        expect(P.behaviorPacks).toBeDefined();
      });

      it("Has packs", () => {
        expect(P.behaviorPacks.packs).toBeDefined();
      });
    });

    describe("ResourcePacks", () => {
      it("Is not undefined", () => {
        expect(P.resourcePacks).toBeDefined();
      });

      it("Has packs", () => {
        expect(P.resourcePacks.packs).toBeDefined();
      });
    });

    describe("General", () => {
      it("Is not undefined", () => {
        expect(P.general).toBeDefined();
      });

      it("has fakeEntities", () => {
        expect(P.general.fakeEntities).toBeDefined();
      });

      it("has objectives", () => {
        expect(P.general.objectives).toBeDefined();
      });

      it("has tags", () => {
        expect(P.general.tags).toBeDefined();
      });

      it("has tickingAreas", () => {
        expect(P.general.tickingAreas).toBeDefined();
      });
    });
  });

  describe("Behaviourpack", () => {
    let P: ProjectData;
    let pack: BehaviorPack;

    beforeEach(() => {
      P = new ProjectData(new TextProjectContext());
      pack = P.behaviorPacks.add("c:\\temp\\bp", MCProject.createEmpty(), {} as Manifest);
    });

    it("Has 1 bp", () => {
      expect(P.behaviorPacks.count()).toEqual(1);
    });

    describe("get", () => {
      const uri = "c:\\temp\\bp\\loot_tables\\empty.loot.json";

      beforeEach(() => {
        pack.loot_tables.set({
          id: "empty.loot.json",
          location: Location.create(uri),
        });
      });

      it("not undefined", () => {
        const data = P.get(uri);
        expect(data).toBeDefined();
      });

      it("Is behaviorpack", () => {
        const data = P.get(uri);
        expect(BehaviorPack.is(data)).toBeTruthy();
      });

      it("Has loot_tables", () => {
        const data = P.get(uri);
        if (!BehaviorPack.is(data)) throw new Error();
        expect(data.loot_tables.has("empty.loot.json")).toBeTruthy();
      });
    });

    it("Remove File", () => {
      const uri = "c:\\temp\\bp\\loot_tables\\empty.loot.json";

      pack.loot_tables.set({
        id: "empty.loot.json",
        location: Location.create(uri),
      });

      expect(P.behaviorPacks.packs).toBeDefined();
      expect(P.behaviorPacks.loot_tables).toBeDefined();
      expect(P.behaviorPacks.loot_tables.has("empty.loot.json")).toBeTruthy();

      expect(P.deleteFile(uri)).toBeTruthy();

      expect(P.behaviorPacks.packs).toBeDefined();
      expect(P.behaviorPacks.loot_tables.has("empty.loot.json")).toBeFalsy();
    });

    it("Remove Folder", () => {
      const uri = "c:\\temp\\bp\\loot_tables\\empty.loot.json";

      pack.loot_tables.set({
        id: "empty.loot.json",
        location: Location.create(uri),
      });

      expect(P.behaviorPacks.loot_tables).toBeDefined();
      expect(P.behaviorPacks.loot_tables.has("empty.loot.json")).toBeTruthy();

      expect(P.deleteFolder("c:\\temp\\bp\\loot_tables")).toBeTruthy();

      expect(P.behaviorPacks.loot_tables.has("empty.loot.json")).toBeFalsy();
    });

    it("Remove Folder - Entire Pack", () => {
      const pack = P.behaviorPacks.add("c:\\temp\\bp", MCProject.createEmpty(), {} as Manifest);

      const uri = "c:\\temp\\bp\\loot_tables\\empty.loot.json";

      pack.loot_tables.set({
        id: "empty.loot.json",
        location: Location.create(uri),
      });

      expect(P.behaviorPacks.loot_tables.has("empty.loot.json")).toBeTruthy();

      expect(P.deleteFolder("c:\\temp\\bp")).toBeTruthy();

      expect(P.behaviorPacks.loot_tables.has("empty.loot.json")).toBeFalsy();
      expect(P.behaviorPacks.count()).toEqual(0);
    });
  });

  describe("Resourcepack", () => {
    let P: ProjectData;
    let pack: ResourcePack;

    beforeEach(() => {
      P = new ProjectData(new TextProjectContext());
      pack = P.resourcePacks.add("c:\\temp\\rp", MCProject.createEmpty(), {} as Manifest);
    });

    it("add", () => {
      expect(P.resourcePacks.count()).toEqual(1);
    });

    it("get", () => {
      const uri = "c:\\temp\\rp\\sounds\\sound_definitions.json";
      const id = "random.pop";

      pack.sounds.set({
        id: id,
        location: Location.create(uri),
      });

      const data = P.get(uri);

      if (!data) {
        throw new Error("expacted a pack");
      } else {
        if (ResourcePack.is(data)) {
          expect(data.sounds.has(id)).toBeTruthy();
        } else {
          throw new Error("expacted a rp pack");
        }
      }
    });

    it("Remove File", () => {
      const uri = "c:\\temp\\rp\\sounds\\sound_definitions.json";
      const id = "random.pop";

      pack.sounds.set({
        id: id,
        location: Location.create(uri),
      });

      expect(P.resourcePacks.sounds.has(id)).toBeTruthy();

      expect(P.deleteFile(uri)).toBeTruthy();
      expect(P.resourcePacks.sounds.has(id)).toBeFalsy();
    });

    it("Remove Folder", () => {
      const uri = "c:\\temp\\rp\\sounds\\sound_definitions.json";
      const id = "random.pop";

      pack.sounds.set({
        id: id,
        location: Location.create(uri),
      });

      expect(P.resourcePacks.sounds.has(id)).toBeTruthy();
      expect(P.deleteFolder("c:\\temp\\rp\\sounds")).toBeTruthy();

      expect(P.resourcePacks.sounds.has(id)).toBeFalsy();
    });

    it("Remove Folder - Entire Pack", () => {
      const uri = "c:\\temp\\rp\\sounds\\sound_definitions.json";
      const id = "random.pop";

      pack.sounds.set({
        id: id,
        location: Location.create(uri),
      });

      expect(P.resourcePacks.sounds.has(id)).toBeTruthy();

      expect(P.deleteFolder("c:\\temp\\rp")).toBeTruthy();

      expect(P.resourcePacks.sounds.has(id)).toBeFalsy();
      expect(P.resourcePacks.count()).toEqual(0);
    });
  });

  describe("General", () => {
    let P: ProjectData;

    beforeEach(() => {
      P = new ProjectData(new TextProjectContext());
    });

    it("Remove File", () => {
      const uri = "c:\\temp\\rp\\sounds\\sound_definitions.json";
      const id = "init";

      P.general.tags.set({ id: id, location: Location.create(uri) });

      expect(P.general.tags.has(id)).toBeTruthy();

      expect(P.deleteFile(uri)).toBeTruthy();

      expect(P.general.tags.has(id)).toBeFalsy();
    });
  });

  describe("find", () => {
    const data = new ProjectData(new TextProjectContext());

    const bp = data.behaviorPacks.add("c:\\bp", MCProject.createEmpty(), {} as Manifest);
    const rp = data.resourcePacks.add("c:\\rp", MCProject.createEmpty(), {} as Manifest);

    const loc = { uri: "", position: 0 };
    const molang = new MolangSet();
    const doc = "Documentation";
    const emptyDefinedUsing = References.create();

    bp.animation_controllers.set({
      animations: emptyDefinedUsing,
      id: "bp.animation_controller",
      location: loc,
      molang: molang,
      documentation: doc,
      events: Using.create(),
    });
    bp.animations.set({
      id: "bp.animation",
      location: loc,
      molang: molang,
      documentation: doc,
      events: Using.create(),
    });
    bp.blocks.set({
      id: "bp.block",
      location: loc,
      molang: molang,
      documentation: doc,
      states: [],
    });
    bp.entities.set({
      id: "bp.entity",
      animations: References.create(),
      documentation: doc,
      events: Defined.create(),
      families: Defined.create(),
      groups: Defined.create(),
      location: loc,
      molang: molang,
      properties: [],
      runtime_identifier: "",
    });
    bp.functions.set({ id: "bp.function", location: loc, documentation: doc });
    bp.items.set({
      id: "bp.item",
      location: loc,
      molang: molang,
      documentation: doc,
      isFood: false,
    });
    bp.loot_tables.set({
      id: "bp.loot_table",
      location: loc,
      documentation: doc,
    });
    bp.structures.set({
      id: "bp.structure",
      location: loc,
      documentation: doc,
    });
    bp.trading.set({ id: "bp.trading", location: loc, documentation: doc });

    rp.animation_controllers.set({
      animations: emptyDefinedUsing,
      id: "rp.animation_controller",
      location: loc,
      molang: molang,
      documentation: doc,
      particles: emptyDefinedUsing,
      sounds: emptyDefinedUsing,
    });
    rp.animations.set({
      id: "rp.animation",
      location: loc,
      molang: molang,
      documentation: doc,
      particles: emptyDefinedUsing,
      sounds: emptyDefinedUsing,
    });
    rp.attachables.set({
      animations: emptyDefinedUsing,
      id: "rp.attachable",
      location: loc,
      molang: molang,
      documentation: doc,
    });
    rp.block_culling_rules.set({
      id: "rp.block_culling_rules",
      location: loc,
      documentation: doc,
      affected_bones: Defined.create(),
    });
    rp.entities.set({
      animations: emptyDefinedUsing,
      id: "rp.entity",
      location: loc,
      molang: molang,
      documentation: doc,
    });
    rp.fogs.set({ id: "rp.fog", location: loc, documentation: doc });
    rp.materials.set({ id: "rp.material", location: loc, documentation: doc });
    rp.models.set({
      id: "rp.model",
      location: loc,
      documentation: doc,
      bones: Defined.create(),
      root_bone_uses_binding: false,
      locators: Defined.create(),
    });
    rp.particles.set({ id: "rp.particle", location: loc, documentation: doc });
    rp.render_controllers.set({
      id: "rp.render_controller",
      location: loc,
      documentation: doc,
      molang: molang,
    });
    rp.sounds.set({ id: "rp.sound", location: loc, documentation: doc });
    rp.textures.set({ id: "rp.texture", location: loc, documentation: doc });

    const ids = [
      "bp.animation_controller",
      "bp.animation",
      "bp.block",
      "bp.entity",
      "bp.function",
      "bp.item",
      "bp.loot_table",
      "bp.structure",
      "bp.trading",
      "rp.animation_controller",
      "rp.animation",
      "rp.attachable",
      "rp.entity",
      "rp.fog",
      "rp.material",
      "rp.model",
      "rp.particle",
      "rp.render_controller",
      "rp.sound",
      "rp.texture",
    ];

    test.each(ids)(`find id %s`, (id) => {
      const item = data.find((item) => item.id === id);
      expect(item).toBeDefined();
    });
  });
});
