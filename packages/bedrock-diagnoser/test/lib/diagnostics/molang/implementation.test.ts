import { MolangSet, NodeType } from "bc-minecraft-molang";
import { diagnose_molang_implementation, MolangMetadata } from "../../../../src/diagnostics/molang/diagnostics";
import { Metadata } from "../../../../src/types";
import { TestDiagnoser } from "../../../diagnoser";

describe("Molang", () => {
  describe("diagnose_molang_implementation", () => {
    it("no errors", () => {
      const diagnoser = Metadata.withMetadata(TestDiagnoser.create(), { userType: "Entities" } as MolangMetadata);

      const using = new MolangSet();
      const resource = new MolangSet();

      using.assigned.add({ scope: "variable", names: ["foo"], position: 0, type: NodeType.Variable });
      resource.using.add({ scope: "variable", names: ["foo"], position: 0, type: NodeType.Variable });

      diagnose_molang_implementation(
        { id: "animation.example.walk", molang: using },
        { id: "minecraft:sheep", molang: resource },
        diagnoser
      );

      diagnoser.expectEmpty();
    });

    it("it should be able to pass with short hand checks", () => {
      const diagnoser = Metadata.withMetadata(TestDiagnoser.create(), { userType: "Entities" } as MolangMetadata);

      const using = new MolangSet();
      const resource = new MolangSet();

      using.assigned.add({ scope: "variable", names: ["foo"], position: 0, type: NodeType.Variable });
      resource.using.add({ scope: "v", names: ["foo"], position: 0, type: NodeType.Variable });

      using.assigned.add({ scope: "v", names: ["bar"], position: 0, type: NodeType.Variable });
      resource.using.add({ scope: "variable", names: ["bar"], position: 0, type: NodeType.Variable });

      diagnose_molang_implementation(
        { id: "animation.example.walk", molang: using },
        { id: "minecraft:sheep", molang: resource },
        diagnoser
      );

      diagnoser.expectEmpty();
    });

    it("1 error", () => {
      const diagnoser = Metadata.withMetadata(TestDiagnoser.create(), { userType: "Entities" } as MolangMetadata);

      const using = new MolangSet();
      const resource = new MolangSet();

      using.assigned.add({ scope: "variable", names: ["bar"], position: 0, type: NodeType.Variable });
      resource.using.add({ scope: "variable", names: ["foo"], position: 0, type: NodeType.Variable });

      diagnose_molang_implementation(
        { id: "animation.example.walk", molang: using },
        { id: "minecraft:sheep", molang: resource },
        diagnoser
      );

      diagnoser.expectAmount(1);
    });
  });
});
