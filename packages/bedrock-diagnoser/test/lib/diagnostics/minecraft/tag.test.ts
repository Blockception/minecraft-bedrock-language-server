import { GeneralInfo } from 'bc-minecraft-bedrock-project/src/project/general/types';
import { Types } from "bc-minecraft-bedrock-types";
import { Location } from "bc-minecraft-bedrock-types/src/types";
import { minecraft_tag_diagnose } from "../../../../src/lib/diagnostics/minecraft/tag";
import { TestDiagnoser } from "../../../diagnoser";

describe("Tag", () => {
  it("diagnose no errors", () => {
    const B = TestDiagnoser.create();
    const data = B.context.getProjectData().projectData;

    data.general.tags.set([
      GeneralInfo.create("init", Location.create(""), "main tickingarea"),
      GeneralInfo.create("Flying", Location.create(""), "main tickingarea"),
      GeneralInfo.create("Follow", Location.create(""), "main tickingarea"),
      GeneralInfo.create("Attack", Location.create(""), "main tickingarea"),
    ]);

    minecraft_tag_diagnose(Types.OffsetWord.create("init"), B);
    minecraft_tag_diagnose(Types.OffsetWord.create("Flying"), B);
    minecraft_tag_diagnose(Types.OffsetWord.create("Follow"), B);
    minecraft_tag_diagnose(Types.OffsetWord.create("Attack"), B);
    minecraft_tag_diagnose(Types.OffsetWord.create(""), B);

    B.expectEmpty();
  });

  it("diagnose with errors", () => {
    const B = new TestDiagnoser();
    minecraft_tag_diagnose(Types.OffsetWord.create("main"), B);
    minecraft_tag_diagnose(Types.OffsetWord.create("calc"), B);
    minecraft_tag_diagnose(Types.OffsetWord.create("spawn"), B);
    minecraft_tag_diagnose(Types.OffsetWord.create("Spawn"), B);

    B.expectAmount(4);
  });

  it("diagnose with errors", () => {
    const B = new TestDiagnoser();

    const objectivesData = B.context.getProjectData().projectData.general.tags;
    const tags: string[] = ["te/st", "test!example", "Test@Example", "Test#Example"];
    
    tags.forEach((t) => objectivesData.set(GeneralInfo.create(t, Location.create(""))));
    tags.forEach((t) => minecraft_tag_diagnose(Types.OffsetWord.create(t), B));

    B.expectAmount(4);
  }); 
});
