"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bc_minecraft_bedrock_command_1 = require("bc-minecraft-bedrock-command");
const types_1 = require("bc-minecraft-bedrock-project/src/project/general/types");
const bc_minecraft_bedrock_shared_1 = require("bc-minecraft-bedrock-shared");
const bc_minecraft_molang_1 = require("bc-minecraft-molang");
const references_1 = require("bc-minecraft-bedrock-project/src/types/references");
const selector_1 = require("../../../../src/diagnostics/minecraft/selector");
const diagnoser_1 = require("../../../diagnoser");
const testprojectdata_1 = require("../../../testprojectdata");
describe("Selector", () => {
    const context = testprojectdata_1.TestProjectData.createContext();
    const pi = { required: false, text: "", type: bc_minecraft_bedrock_command_1.ParameterType.selector };
    const cache = context.getProjectData().projectData;
    cache.general.objectives.set(types_1.GeneralInfo.create("data", bc_minecraft_bedrock_shared_1.Location.create("test"), "test objective"));
    cache.general.tags.set(types_1.GeneralInfo.create("foo", bc_minecraft_bedrock_shared_1.Location.create("test"), "test tag"));
    cache.general.tags.set(types_1.GeneralInfo.create("hello there", bc_minecraft_bedrock_shared_1.Location.create("test"), "test tag with spaces"));
    it("Double negative types should not return errors", () => {
        const B = new diagnoser_1.TestDiagnoser(context);
        //Loop over all vanilla versions
        (0, selector_1.minecraft_selector_diagnose)(pi, bc_minecraft_bedrock_shared_1.OffsetWord.create("@e[type=!player,type=!minecraft:sheep]"), B);
        B.expectEmpty();
    });
    it("All negative and one positive types", () => {
        const B = new diagnoser_1.TestDiagnoser(context);
        //Loop over all vanilla versions
        (0, selector_1.minecraft_selector_diagnose)(pi, bc_minecraft_bedrock_shared_1.OffsetWord.create("@e[type=!player,type=!minecraft:sheep,type=minecraft:zombie]"), B);
        B.expectEmpty();
    });
    it("Double negative gamemode", () => {
        const B = new diagnoser_1.TestDiagnoser(context);
        //Loop over all vanilla versions
        (0, selector_1.minecraft_selector_diagnose)(pi, bc_minecraft_bedrock_shared_1.OffsetWord.create("@e[m=!1,m=!2]"), B);
        B.expectEmpty();
    });
    it("All negative and one positive gamemode", () => {
        const B = new diagnoser_1.TestDiagnoser();
        //Loop over all vanilla versions
        (0, selector_1.minecraft_selector_diagnose)(pi, bc_minecraft_bedrock_shared_1.OffsetWord.create("@e[m=!1,m=!2,m=0]"), B);
        B.expectEmpty();
    });
    describe("has_property property variant", () => {
        const entityLoc = bc_minecraft_bedrock_shared_1.Location.create("file:///bp/entities/test.json");
        it("property=<known_property_id> should not produce errors", () => {
            const diagnoser = diagnoser_1.TestDiagnoser.create();
            const data = diagnoser.context.getProjectData().projectData;
            data.behaviorPacks.packs[0].entities.set({
                id: "test:entity",
                animations: references_1.References.create(),
                documentation: "",
                events: references_1.Defined.create(),
                families: references_1.Defined.create(),
                groups: references_1.Defined.create(),
                location: entityLoc,
                molang: new bc_minecraft_molang_1.MolangSet(),
                properties: [{ name: "test:property", type: "bool", default: false }],
                runtime_identifier: "",
            });
            (0, selector_1.minecraft_selector_diagnose)(pi, bc_minecraft_bedrock_shared_1.OffsetWord.create("@e[has_property={property=test:property}]"), diagnoser);
            diagnoser.expectEmpty();
        });
        it("property=!<known_property_id> (negated) should not produce errors", () => {
            const diagnoser = diagnoser_1.TestDiagnoser.create();
            const data = diagnoser.context.getProjectData().projectData;
            data.behaviorPacks.packs[0].entities.set({
                id: "test:entity",
                animations: references_1.References.create(),
                documentation: "",
                events: references_1.Defined.create(),
                families: references_1.Defined.create(),
                groups: references_1.Defined.create(),
                location: entityLoc,
                molang: new bc_minecraft_molang_1.MolangSet(),
                properties: [{ name: "test:property", type: "bool", default: false }],
                runtime_identifier: "",
            });
            (0, selector_1.minecraft_selector_diagnose)(pi, bc_minecraft_bedrock_shared_1.OffsetWord.create("@e[has_property={property=!test:property}]"), diagnoser);
            diagnoser.expectEmpty();
        });
        it("property=<unknown_property_id> should produce an error", () => {
            const diagnoser = diagnoser_1.TestDiagnoser.create();
            (0, selector_1.minecraft_selector_diagnose)(pi, bc_minecraft_bedrock_shared_1.OffsetWord.create("@e[has_property={property=unknown:property}]"), diagnoser);
            diagnoser.expectAny();
        });
    });
    describe("has_property value variant", () => {
        const entityLoc = bc_minecraft_bedrock_shared_1.Location.create("file:///bp/entities/test.json");
        function makeEntity(diagnoser, id, propName, values) {
            diagnoser.context.getProjectData().projectData.behaviorPacks.packs[0].entities.set({
                id,
                animations: references_1.References.create(),
                documentation: "",
                events: references_1.Defined.create(),
                families: references_1.Defined.create(),
                groups: references_1.Defined.create(),
                location: entityLoc,
                molang: new bc_minecraft_molang_1.MolangSet(),
                properties: [{ name: propName, type: "enum", default: values[0], values }],
                runtime_identifier: "",
            });
        }
        it("valid value for its own property should not produce errors", () => {
            const diagnoser = diagnoser_1.TestDiagnoser.create();
            makeEntity(diagnoser, "test:entity1", "test:val1", ["a", "b", "c"]);
            makeEntity(diagnoser, "test:entity2", "test:val2", ["d", "e", "f"]);
            (0, selector_1.minecraft_selector_diagnose)(pi, bc_minecraft_bedrock_shared_1.OffsetWord.create("@e[has_property={test:val1=a}]"), diagnoser);
            diagnoser.expectEmpty();
        });
        it("value from a different property on another entity should produce an error", () => {
            const diagnoser = diagnoser_1.TestDiagnoser.create();
            makeEntity(diagnoser, "test:entity1", "test:val1", ["a", "b", "c"]);
            makeEntity(diagnoser, "test:entity2", "test:val2", ["d", "e", "f"]);
            // "d" is only valid for test:val2, not test:val1
            (0, selector_1.minecraft_selector_diagnose)(pi, bc_minecraft_bedrock_shared_1.OffsetWord.create("@e[has_property={test:val1=d}]"), diagnoser);
            diagnoser.expectAny();
        });
        it("invalid value with only one entity having the property should produce an error", () => {
            const diagnoser = diagnoser_1.TestDiagnoser.create();
            makeEntity(diagnoser, "test:entity3", "test:val3", ["a", "b", "c"]);
            (0, selector_1.minecraft_selector_diagnose)(pi, bc_minecraft_bedrock_shared_1.OffsetWord.create("@e[has_property={test:val3=q}]"), diagnoser);
            diagnoser.expectAny();
        });
        it("valid value with only one entity having the property should not produce errors", () => {
            const diagnoser = diagnoser_1.TestDiagnoser.create();
            makeEntity(diagnoser, "test:entity3", "test:val3", ["a", "b", "c"]);
            (0, selector_1.minecraft_selector_diagnose)(pi, bc_minecraft_bedrock_shared_1.OffsetWord.create("@e[has_property={test:val3=a}]"), diagnoser);
            diagnoser.expectEmpty();
        });
    });
    describe("Expecting no errors", () => {
        const valid = [
            "@a[hasitem={item=minecraft:stone,data=1}]",
            "@a[hasitem={item=stone,data=1}]",
            "@e[type=!player,type=!minecraft:sheep]",
            "@a[type=player,type=!minecraft:sheep,type=!minecraft:sheep]",
            "@s",
            "@e[type=minecraft:sheep,r=2]",
            "@p[ry=180,rym=135]",
            "@s[y=15,dy=-100,z=~,x=~]",
            "@s[scores={data=..3,data=5..}]",
            '@e[name="main",tag=foo]',
            '@e[tag="hello there"]',
            '@e[tag=""]',
            "@e[x=0,y=2,z=3,dx=4,dy=5,dz=6,type=minecraft:sheep,c=1]",
            "@a[hasitem={item=diamond,location=slot.inventory,slot=5}]",
            "@a[hasitem={item=diamond,location=slot.inventory,slot=5..8}]",
            "@a[hasitem={item=diamond,location=slot.inventory,slot=0..26}]",
            "@a[hasitem={item=diamond,location=slot.hotbar,slot=0..8}]",
            "@a[hasitem={item=diamond,location=slot.inventory,slot=..10}]",
            "@a[hasitem={item=diamond,location=slot.inventory,slot=5..}]",
        ];
        valid.forEach((test) => {
            it(test, () => {
                const B = new diagnoser_1.TestDiagnoser(context);
                //Loop over all vanilla versions
                (0, selector_1.minecraft_selector_diagnose)(pi, bc_minecraft_bedrock_shared_1.OffsetWord.create(test), B);
                B.expectEmpty();
            });
        });
    });
    describe("Expecting errors", () => {
        const invalid = [
            "@a[hasitem={data=1}]",
            "@e[type=player,type=minecraft:sheep]",
            "@a[scores={data=1},scores={data=2}]",
            "@a[scores={data={value=1}}",
            "@a[scores={data=[value=1]}",
            "@r[hasitem={item=minecraft:stone,data=1},hasitem=[{item=minecraft:stone,data=2}]]",
            "@r[hasitem=[item=minecraft:stone]]",
            "@a[hasitem={item=diamond,location=slot.inventory,slot=54}]",
            "@a[hasitem={item=diamond,location=slot.inventory,slot=-1}]",
            "@a[hasitem={item=diamond,location=slot.inventory,slot=10..5}]",
        ];
        invalid.forEach((test) => {
            it(test, () => {
                const B = new diagnoser_1.TestDiagnoser(context);
                //Loop over all vanilla versions
                (0, selector_1.minecraft_selector_diagnose)(pi, bc_minecraft_bedrock_shared_1.OffsetWord.create(test), B);
                B.expectAny();
            });
        });
    });
});
//# sourceMappingURL=selector.test.js.map