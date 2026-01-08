import { GeneralInfo } from 'bc-minecraft-bedrock-project/src/project/general/types';
import { Location, OffsetWord } from "bc-minecraft-bedrock-shared";
import { minecraft_tickingarea_diagnose } from "../../../../src/diagnostics/minecraft/tickingarea";
import { TestDiagnoser } from "../../../diagnoser";

describe("Tickingarea", () => {
  it("diagnose no errors", () => {
    const B = TestDiagnoser.create();
    const data = B.context.getProjectData().projectData;

    data.general.tickingAreas.set([
      GeneralInfo.create("main", Location.create(""), "main tickingarea"),
      GeneralInfo.create("calc", Location.create(""), "calculation area"),
      GeneralInfo.create("spawn", Location.create(""), "spawn location"),
      GeneralInfo.create("Spawn", Location.create(""), "spawn location"),
    ]);

    minecraft_tickingarea_diagnose(OffsetWord.create("main"), B);
    minecraft_tickingarea_diagnose(OffsetWord.create("calc"), B);
    minecraft_tickingarea_diagnose(OffsetWord.create("spawn"), B);
    minecraft_tickingarea_diagnose(OffsetWord.create("Spawn"), B);

    B.expectEmpty();
  });

  it("diagnose with errors", () => {
    const B = new TestDiagnoser();
    minecraft_tickingarea_diagnose(OffsetWord.create("main"), B);
    minecraft_tickingarea_diagnose(OffsetWord.create("calc"), B);
    minecraft_tickingarea_diagnose(OffsetWord.create("spawn"), B);
    minecraft_tickingarea_diagnose(OffsetWord.create("Spawn"), B);

    B.expectAmount(4);
  });
});
