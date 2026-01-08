import { GeneralInfo } from 'bc-minecraft-bedrock-project/src/project/general/types';
import { minecraft_objectives_diagnose } from '../../../../src/diagnostics/minecraft';
import { TestDiagnoser } from "../../../diagnoser";
import { Location, OffsetWord } from "bc-minecraft-bedrock-shared";

describe("Objective", () => {
  it("diagnose no errors", () => {
    const B = new TestDiagnoser();

    const objectivesData = B.context.getProjectData().projectData.general.objectives;

    const objectives: string[] = ["test", "test.example", "Test_Example", "Test-Example"];

    objectives.forEach((o) => objectivesData.set(GeneralInfo.create(o, Location.create(""))));
    objectives.forEach((o) => minecraft_objectives_diagnose(OffsetWord.create(o), B));

    B.expectAmount(0);
  });

  it("diagnose with errors", () => {
    const B = new TestDiagnoser();

    const objectivesData = B.context.getProjectData().projectData.general.objectives;

    const objectives: string[] = ["te/st", "test!example", "Test@Example", "Test#Example"];

    objectives.forEach((o) => objectivesData.set(GeneralInfo.create(o, Location.create(""))));
    objectives.forEach((o) => minecraft_objectives_diagnose(OffsetWord.create(o), B));

    B.expectAmount(4);
  });  

  it("diagnose with errors", () => {
    const B = new TestDiagnoser();

    const objectives: string[] = ["test", "test.example", "Test_Example", "Test-Example"];
    objectives.forEach((o) => minecraft_objectives_diagnose(OffsetWord.create(o), B));

    B.expectAmount(4);
  });
});
