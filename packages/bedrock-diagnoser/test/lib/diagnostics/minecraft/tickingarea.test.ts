import { GeneralInfo } from 'bc-minecraft-bedrock-project/src/project/general/types';
import { Types } from "bc-minecraft-bedrock-types";
import { minecraft_tickingarea_diagnose } from "../../../../src/diagnostics/minecraft/tickingarea";
import { TestDiagnoser } from "../../../diagnoser";

describe("Tickingarea", () => {
  it("diagnose no errors", () => {
    const B = TestDiagnoser.create();
    const data = B.context.getProjectData().projectData;

    data.general.tickingAreas.set([
      GeneralInfo.create("main", Types.Location.create(""), "main tickingarea"),
      GeneralInfo.create("calc", Types.Location.create(""), "calculation area"),
      GeneralInfo.create("spawn", Types.Location.create(""), "spawn location"),
      GeneralInfo.create("Spawn", Types.Location.create(""), "spawn location"),
    ]);

    minecraft_tickingarea_diagnose(Types.OffsetWord.create("main"), B);
    minecraft_tickingarea_diagnose(Types.OffsetWord.create("calc"), B);
    minecraft_tickingarea_diagnose(Types.OffsetWord.create("spawn"), B);
    minecraft_tickingarea_diagnose(Types.OffsetWord.create("Spawn"), B);

    B.expectEmpty();
  });

  it("diagnose with errors", () => {
    const B = new TestDiagnoser();
    minecraft_tickingarea_diagnose(Types.OffsetWord.create("main"), B);
    minecraft_tickingarea_diagnose(Types.OffsetWord.create("calc"), B);
    minecraft_tickingarea_diagnose(Types.OffsetWord.create("spawn"), B);
    minecraft_tickingarea_diagnose(Types.OffsetWord.create("Spawn"), B);

    B.expectAmount(4);
  });
});
