import { MCProject } from "bc-minecraft-project";
import { TextProjectContext } from '../../../../../test/utility';
import { Manifest } from '../../../../internal/types';
import { TextDocument } from '../../../../types';
import { ProjectData } from '../../../project-data';

describe("Commands", () => {
  it("mcfunction", () => {
    const P = new ProjectData(new TextProjectContext());

    P.behaviorPacks.add("c:\\bp", MCProject.createEmpty(), {} as Manifest);

    const doc: TextDocument = {
      uri: "c:\\bp\\functions\\example.mcfunction",
      getText: () => `tag @s add foo
scoreboard objectives add id dummy
tickingarea add 0 0 0 5 5 5 "main"
tickingarea add circle 1 2 3 5 foo
scoreboard players set global id 0`,
    };

    const out = P.process(doc);

    expect(out).toBeDefined();
    expect(P.behaviorPacks.functions.get("example")).toBeDefined();
    expect(P.general.tags.count()).toEqual(1);
    expect(P.general.objectives.count()).toEqual(1);
    expect(P.general.fakeEntities.count()).toEqual(1);
    expect(P.general.tickingAreas.count()).toEqual(2);

    expect(P.general.tickingAreas.has("main")).toBeTruthy();
    expect(P.general.tickingAreas.has("foo")).toBeTruthy();
  });

  it("animation", () => {
    const P = new ProjectData(new TextProjectContext());

    P.behaviorPacks.add("c:\\bp", MCProject.createEmpty(), {} as Manifest);

    const doc: TextDocument = {
      uri: "c:\\bp\\animations\\example.animation.json",
      getText: () => `{
        "format_version": "1.10.0",
        "animations": {
          "animation.example.foo": {
            "animation_length": 4.5,
            "loop": false,
            "timeline": {
              "0.0": ["/tag @s add foo", "/scoreboard objectives add id dummy"],
              "1.0": ["/tickingarea add 0 0 0 5 5 5 \\"main\\""],
              "2.0": ["/tickingarea add circle 1 2 3 5 foo"],
              "3.0": ["/scoreboard players set global id 0"]
            }
          }
        }
      }`,
    };

    const out = P.process(doc);

    expect(out).toBeDefined();
    expect(P.behaviorPacks.animations.get("animation.example.foo")).toBeDefined();
    expect(P.general.tags.count()).toEqual(1);
    expect(P.general.objectives.count()).toEqual(1);
    expect(P.general.fakeEntities.count()).toEqual(1);
    expect(P.general.tickingAreas.count()).toEqual(2);

    expect(P.general.tickingAreas.has("main")).toBeTruthy();
    expect(P.general.tickingAreas.has("foo")).toBeTruthy();
  });

  it("animation_controller", () => {
    const P = new ProjectData(new TextProjectContext());

    P.behaviorPacks.add("c:\\bp", MCProject.createEmpty(), {} as Manifest);

    const doc: TextDocument = {
      uri: "c:\\bp\\animation_controllers\\controller.example.json",
      getText: () => `{
        "format_version": "1.10.0",
        "animation_controllers": {
          "controller.animation.example": {
            "states": {
              "default": {
                "transitions": [{ "A": "query.has_armor_slot(0)" }, { "B": "query.has_armor_slot(1)" }, { "C": "query.has_armor_slot(2)" }, { "D": "query.has_armor_slot(3)" }]
              },
              "A": {
                "on_entry": ["/tag @s add foo", "/scoreboard objectives add id dummy"]
              },
              "B": {
                "on_entry": ["/tickingarea add 0 0 0 5 5 5 \\"main\\""]
              },
              "C": {
                "on_entry": ["/tickingarea add circle 1 2 3 5 foo"]
              },
              "D": {
                "on_entry": ["/scoreboard players set global id 0"]
              }
            }
          }
        }
      }`,
    };

    const out = P.process(doc);

    expect(out).toBeDefined();
    expect(P.behaviorPacks.animation_controllers.get("controller.animation.example")).toBeDefined();
    expect(P.general.tags.count()).toEqual(1);
    expect(P.general.objectives.count()).toEqual(1);
    expect(P.general.fakeEntities.count()).toEqual(1);
    expect(P.general.tickingAreas.count()).toEqual(2);

    expect(P.general.tickingAreas.has("main")).toBeTruthy();
    expect(P.general.tickingAreas.has("foo")).toBeTruthy();
  });
});
