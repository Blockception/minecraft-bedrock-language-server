"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bc_minecraft_bedrock_command_1 = require("bc-minecraft-bedrock-command");
const types_1 = require("bc-minecraft-bedrock-project/lib/src/project/general/types");
const bc_minecraft_bedrock_types_1 = require("bc-minecraft-bedrock-types");
const types_2 = require("bc-minecraft-bedrock-types/lib/types");
const selector_1 = require("../../../../src/lib/diagnostics/minecraft/selector");
const diagnoser_1 = require("../../../diagnoser");
const testprojectdata_1 = require("../../../testprojectdata");
describe("Selector", () => {
    const context = testprojectdata_1.TestProjectData.createContext();
    const pi = { required: false, text: "", type: bc_minecraft_bedrock_command_1.ParameterType.selector };
    const cache = context.getProjectData().projectData;
    cache.general.objectives.set(types_1.GeneralInfo.create("data", types_2.Location.create("test"), "test objective"));
    cache.general.tags.set(types_1.GeneralInfo.create("foo", types_2.Location.create("test"), "test tag"));
    it("Double negative types should not return errors", () => {
        const B = new diagnoser_1.TestDiagnoser(context);
        //Loop over all vanilla versions
        (0, selector_1.minecraft_selector_diagnose)(pi, bc_minecraft_bedrock_types_1.Types.OffsetWord.create("@e[type=!player,type=!minecraft:sheep]"), B);
        B.expectEmpty();
    });
    it("All negative and one positive types", () => {
        const B = new diagnoser_1.TestDiagnoser(context);
        //Loop over all vanilla versions
        (0, selector_1.minecraft_selector_diagnose)(pi, bc_minecraft_bedrock_types_1.Types.OffsetWord.create("@e[type=!player,type=!minecraft:sheep,type=minecraft:zombie]"), B);
        B.expectEmpty();
    });
    it("Double negative gamemode", () => {
        const B = new diagnoser_1.TestDiagnoser(context);
        //Loop over all vanilla versions
        (0, selector_1.minecraft_selector_diagnose)(pi, bc_minecraft_bedrock_types_1.Types.OffsetWord.create("@e[m=!1,m=!2]"), B);
        B.expectEmpty();
    });
    it("All negative and one positive gamemode", () => {
        const B = new diagnoser_1.TestDiagnoser();
        //Loop over all vanilla versions
        (0, selector_1.minecraft_selector_diagnose)(pi, bc_minecraft_bedrock_types_1.Types.OffsetWord.create("@e[m=!1,m=!2,m=0]"), B);
        B.expectEmpty();
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
            "@e[x=0,y=2,z=3,dx=4,dy=5,dz=6,type=minecraft:sheep,c=1]",
        ];
        valid.forEach((test) => {
            it(test, () => {
                const B = new diagnoser_1.TestDiagnoser(context);
                //Loop over all vanilla versions
                (0, selector_1.minecraft_selector_diagnose)(pi, bc_minecraft_bedrock_types_1.Types.OffsetWord.create(test), B);
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
        ];
        invalid.forEach((test) => {
            it(test, () => {
                const B = new diagnoser_1.TestDiagnoser(context);
                //Loop over all vanilla versions
                (0, selector_1.minecraft_selector_diagnose)(pi, bc_minecraft_bedrock_types_1.Types.OffsetWord.create(test), B);
                B.expectAny();
            });
        });
    });
});
//# sourceMappingURL=selector.test.js.map