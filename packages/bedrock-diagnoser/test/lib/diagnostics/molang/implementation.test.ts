import { MolangSet, NodeType } from "bc-minecraft-molang/lib/src/molang";
import { diagnose_molang_implementation, MolangMetadata } from "../../../../src/lib/diagnostics/molang/diagnostics";
import { Metadata } from "../../../../src/lib/types";
import { TestDiagnoser } from "../../../diagnoser";

describe("Molang", () => {
  describe("diagnose_molang_implementation", () => {
    it("no errors", () => {
      const diagnoser = Metadata.withMetadata(TestDiagnoser.create(), { userType: "Entities" } as MolangMetadata);

      const using = new MolangSet();
      const resource = new MolangSet();

      diagnose_molang_implementation(
        { id: "animation.example.walk", molang: using },
        { id: "minecraft:sheep", molang: resource },
        diagnoser
      );

      using.assigned.add({ scope: "variable", names: ["foo"], position: 0, type: NodeType.Variable });
      resource.using.add({ scope: "variable", names: ["foo"], position: 0, type: NodeType.Variable });

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
