import { ProjectData, TextDocument } from "bc-minecraft-bedrock-project";
import { diagnose_structure_implementation } from '../../../../src/diagnostics/behavior-pack/structure';
import { TestDiagnoser } from "../../../diagnoser";

describe("BehaviorPack", () => {
  describe("Structures", () => {
    let diagnoser: TestDiagnoser<TextDocument>;
    let data: ProjectData;

    beforeEach(() => {
      diagnoser = TestDiagnoser.create();
      data = diagnoser.context.getProjectData().projectData;
    });

    it("simple namespace:name no errors", () => {
      data.behaviorPacks.packs[0].structures.set({
        id: "puff:coin1",
        documentation: "",
        location: { position: 0, uri: "" },
      });

      diagnose_structure_implementation({ offset: 0, text: "puff:coin1" }, diagnoser);

      diagnoser.expectEmpty();
    });

    it("deep path namespace:name no errors", () => {
      data.behaviorPacks.packs[0].structures.set({
        id: "stuff:towers/diamond",
        documentation: "",
        location: { position: 0, uri: "" },
      });

      diagnose_structure_implementation({ offset: 0, text: "stuff:towers/diamond" }, diagnoser);

      diagnoser.expectEmpty();
    });

    it("mystructure namespace for root structures", () => {
      data.behaviorPacks.packs[0].structures.set({
        id: "mystructure:house",
        documentation: "",
        location: { position: 0, uri: "" },
      });

      diagnose_structure_implementation({ offset: 0, text: "mystructure:house" }, diagnoser);

      diagnoser.expectEmpty();
    });

    it("missing structure reports error", () => {
      diagnose_structure_implementation({ offset: 0, text: "puff:coin1" }, diagnoser);

      diagnoser.expectAmount(1);
    });
  });
});
