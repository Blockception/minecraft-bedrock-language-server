"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bc_minecraft_bedrock_project_1 = require("bc-minecraft-bedrock-project");
const bc_minecraft_project_1 = require("bc-minecraft-project");
const diagnose_1 = require("../../../../src/lib/diagnostics/format/diagnose");
const diagnoser_1 = require("../../../diagnoser");
describe("Filepath lengths", () => {
    let diagnoser;
    let pack;
    beforeEach(() => {
        diagnoser = new diagnoser_1.TestDiagnoser();
        pack = new bc_minecraft_bedrock_project_1.BehaviorPack.BehaviorPack("Content/world_template/behavior_packs/TE-bp", bc_minecraft_project_1.MCProject.createEmpty(), {});
    });
    it("Total length", () => {
        const path = "Content/world_template/behavior_packs/TE-bp/functions/abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyabcdefghijklmnopqrstuvwxy.mcfunction";
        (0, diagnose_1.format_diagnose_path)(pack, path, diagnoser);
        diagnoser.expectAmount(2);
    });
    it("Total length2", () => {
        const path = "Content/world_template/behavior_packs/TE-bp/functions/abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz/abcdefghijklmnopqrstuvwxy/abcdefghijklmnopqrstuvwxy.mcfunction";
        (0, diagnose_1.format_diagnose_path)(pack, path, diagnoser);
        diagnoser.expectAmount(1);
    });
    it("Segment length2", () => {
        const path = "Content/world_template/behavior_packs/TE-bp/functions/abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefg.mcfunction";
        (0, diagnose_1.format_diagnose_path)(pack, path, diagnoser);
        diagnoser.expectAmount(1);
    });
    it("Just Okay", () => {
        const path = "Content/world_template/behavior_packs/TE-bp/functions/abcdefghij/abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstu.mcfunction";
        (0, diagnose_1.format_diagnose_path)(pack, path, diagnoser);
        diagnoser.expectEmpty();
    });
});
//# sourceMappingURL=diagnose%20path.test.js.map