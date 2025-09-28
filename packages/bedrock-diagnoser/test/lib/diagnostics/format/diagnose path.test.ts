import { BehaviorPack } from "bc-minecraft-bedrock-project";
import { MCProject } from "bc-minecraft-project";
import { format_diagnose_path } from "../../../../src/lib/diagnostics/format/diagnose";
import { TestDiagnoser } from "../../../diagnoser";
import { Manifest } from 'bc-minecraft-bedrock-project/lib/src/internal/types';

describe("Filepath lengths", () => {
  let diagnoser: TestDiagnoser;
  let pack:  BehaviorPack.BehaviorPack;

  beforeEach(() => {
    diagnoser = new TestDiagnoser();
    pack = new BehaviorPack.BehaviorPack("Content/world_template/behavior_packs/TE-bp", MCProject.createEmpty(), {} as Manifest);
  });

  it("Total length", () => {
    const path =
      "Content/world_template/behavior_packs/TE-bp/functions/abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyabcdefghijklmnopqrstuvwxy.mcfunction";

    format_diagnose_path(pack, path, diagnoser);

    diagnoser.expectAmount(2);
  });

  it("Total length2", () => {
    const path =
      "Content/world_template/behavior_packs/TE-bp/functions/abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz/abcdefghijklmnopqrstuvwxy/abcdefghijklmnopqrstuvwxy.mcfunction";

    format_diagnose_path(pack, path, diagnoser);

    diagnoser.expectAmount(1);
  });

  it("Segment length2", () => {
    const path = "Content/world_template/behavior_packs/TE-bp/functions/abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefg.mcfunction";

    format_diagnose_path(pack, path, diagnoser);

    diagnoser.expectAmount(1);
  });

  it("Just Okay", () => {
    const path = "Content/world_template/behavior_packs/TE-bp/functions/abcdefghij/abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstu.mcfunction";

    format_diagnose_path(pack, path, diagnoser);

    diagnoser.expectEmpty();
  });
});
