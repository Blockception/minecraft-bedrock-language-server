import { MolangSet, NodeType } from "bc-minecraft-molang";
import { diagnose_molang_implementation, MolangMetadata } from "../../../../src/diagnostics/molang/diagnostics";
import { Metadata } from "../../../../src/types";
import { TestDiagnoser } from "../../../diagnoser";
import { Types } from "bc-minecraft-bedrock-types";

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

    it("nullish coalescing should not require variable to be defined (issue fix)", () => {
      const diagnoser = Metadata.withMetadata(TestDiagnoser.create(), { userType: "Entities" } as MolangMetadata);

      // Entity defines no variables
      const entity = new MolangSet();
      
      // Animation uses v.width with null coalescing - should NOT require it to be defined
      const animation = new MolangSet();
      const molangText = 'v.width ?? 1';
      animation.add(Types.OffsetWord.create(molangText, 0));

      // Should have no errors because v.width is protected by ??
      diagnose_molang_implementation(
        { id: "minecraft:test_entity", molang: entity },
        { id: "animation.test.walk", molang: animation },
        diagnoser
      );

      diagnoser.expectEmpty();
    });

    it("complex nullish coalescing expression should not require undefined variables", () => {
      const diagnoser = Metadata.withMetadata(TestDiagnoser.create(), { userType: "Entities" } as MolangMetadata);

      // Entity defines variable.is_rolled_up
      const entity = new MolangSet();
      entity.assigned.add({ scope: "variable", names: ["is_rolled_up"], position: 0, type: NodeType.Variable });
      
      // Animation uses complex expression with null coalescing
      const animation = new MolangSet();
      const molangText = 'variable.rolled_up_time = variable.is_rolled_up ? ((variable.rolled_up_time ?? 0.0) + query.delta_time) : 0.0';
      animation.add(Types.OffsetWord.create(molangText, 0));

      // Should have no errors:
      // - variable.rolled_up_time is assigned, not using
      // - variable.is_rolled_up is in using, but entity defines it
      // - variable.rolled_up_time inside ?? is protected, not in using
      diagnose_molang_implementation(
        { id: "minecraft:test_entity", molang: entity },
        { id: "animation.test.walk", molang: animation },
        diagnoser
      );

      diagnoser.expectEmpty();
    });
  });
});
