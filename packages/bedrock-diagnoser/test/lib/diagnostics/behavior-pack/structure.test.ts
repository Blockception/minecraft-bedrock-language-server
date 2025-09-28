import { ProjectData, TextDocument } from "bc-minecraft-bedrock-project";
import { diagnose_structure_implementation } from '../../../../src/lib/diagnostics/behavior-pack/structure';
import { TestDiagnoser } from "../../../diagnoser";

describe("BehaviorPack", () => {
  describe("Structures", () => {
    let diagnoser: TestDiagnoser<TextDocument>;
    let data: ProjectData;

    beforeEach(() => {
      diagnoser = TestDiagnoser.create();
      data = diagnoser.context.getProjectData().projectData;
    });

    it("quotes", () => {
      data.behaviorPacks.packs[0].structures.set({
        id: "test/example",
        documentation: "",
        location: { position: 0, uri: "" },
      });

      diagnose_structure_implementation({ offset: 0, text: "test/example" }, diagnoser);
      diagnose_structure_implementation({ offset: 0, text: "test:example" }, diagnoser);

      diagnoser.expectAmount(1);
    });

    it("no errors", () => {
      data.behaviorPacks.packs[0].structures.set({
        id: '"test/example"',
        documentation: "",
        location: { position: 0, uri: "" },
      });

      diagnose_structure_implementation({ offset: 0, text: '"test/example"' }, diagnoser);
      diagnose_structure_implementation({ offset: 0, text: '"test:example"' }, diagnoser);

      diagnoser.expectEmpty();
    });

    it("missing", () => {
      data.behaviorPacks.packs[0].structures.set({
        id: '"test/example"',
        documentation: "",
        location: { position: 0, uri: "" },
      });

      diagnose_structure_implementation({ offset: 0, text: '"t/example"' }, diagnoser);
      diagnose_structure_implementation({ offset: 0, text: '"t:example"' }, diagnoser);

      diagnoser.expectAmount(2);
    });
  });
});
