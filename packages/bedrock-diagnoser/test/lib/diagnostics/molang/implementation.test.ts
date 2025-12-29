import { MolangSet, NodeType } from "bc-minecraft-molang";
import { diagnose_molang_implementation, MolangMetadata } from "../../../../src/diagnostics/molang/diagnostics";
import { Metadata } from "../../../../src/types";
import { TestDiagnoser } from "../../../diagnoser";
import { OffsetWord } from "@blockception/packages-shared";

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
      animation.add(OffsetWord.create(molangText, 0));

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
      animation.add(OffsetWord.create(molangText, 0));

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

    it("should still report error for undefined variable not protected by nullish coalescing", () => {
      const diagnoser = Metadata.withMetadata(TestDiagnoser.create(), { userType: "Entities" } as MolangMetadata);

      // Entity defines no variables
      const entity = new MolangSet();
      
      // Animation uses undefined variable WITHOUT null coalescing protection
      const animation = new MolangSet();
      const molangText = 'v.width + 1'; // No ?? here, should require definition
      animation.add(OffsetWord.create(molangText, 0));

      diagnose_molang_implementation(
        { id: "minecraft:test_entity", molang: entity },
        { id: "animation.test.walk", molang: animation },
        diagnoser
      );

      // Should have 1 error for undefined v.width
      diagnoser.expectAmount(1);
    });

    it("right side of nullish coalescing should still require definition if it's a variable", () => {
      const diagnoser = Metadata.withMetadata(TestDiagnoser.create(), { userType: "Entities" } as MolangMetadata);

      // Entity defines no variables
      const entity = new MolangSet();
      
      // Animation uses v.fallback on right side of ?? - should require it to be defined
      const animation = new MolangSet();
      const molangText = 'v.primary ?? v.fallback';
      animation.add(OffsetWord.create(molangText, 0));

      diagnose_molang_implementation(
        { id: "minecraft:test_entity", molang: entity },
        { id: "animation.test.walk", molang: animation },
        diagnoser
      );

      // Should have 1 error for undefined v.fallback (right side still needs definition)
      diagnoser.expectAmount(1);
    });

    it("chained nullish coalescing with final literal should not require any variables", () => {
      const diagnoser = Metadata.withMetadata(TestDiagnoser.create(), { userType: "Entities" } as MolangMetadata);

      // Entity defines no variables
      const entity = new MolangSet();
      
      // Animation uses chained ?? with literal at the end
      const animation = new MolangSet();
      const molangText = 'v.a ?? (v.b ?? (v.c ?? 0))'; // All are protected by ??
      animation.add(OffsetWord.create(molangText, 0));

      diagnose_molang_implementation(
        { id: "minecraft:test_entity", molang: entity },
        { id: "animation.test.walk", molang: animation },
        diagnoser
      );

      // Should have no errors - all variables are protected
      diagnoser.expectEmpty();
    });

    it("nullish coalescing mixed with regular usage should only protect left side", () => {
      const diagnoser = Metadata.withMetadata(TestDiagnoser.create(), { userType: "Entities" } as MolangMetadata);

      // Entity defines no variables
      const entity = new MolangSet();
      
      // Animation uses variable both in ?? and outside
      const animation = new MolangSet();
      const molangText = 'v.result = v.required + (v.optional ?? 0)';
      animation.add(OffsetWord.create(molangText, 0));

      diagnose_molang_implementation(
        { id: "minecraft:test_entity", molang: entity },
        { id: "animation.test.walk", molang: animation },
        diagnoser
      );

      // Should have 1 error for undefined v.required (not protected by ??)
      // v.optional is protected, v.result is assigned
      diagnoser.expectAmount(1);
    });

    it("multiple nullish coalescing expressions should all be protected", () => {
      const diagnoser = Metadata.withMetadata(TestDiagnoser.create(), { userType: "Entities" } as MolangMetadata);

      // Entity defines no variables
      const entity = new MolangSet();
      
      // Animation uses multiple ?? expressions
      const animation = new MolangSet();
      const molangText = '(v.x ?? 0) + (v.y ?? 0) + (v.z ?? 0)';
      animation.add(OffsetWord.create(molangText, 0));

      diagnose_molang_implementation(
        { id: "minecraft:test_entity", molang: entity },
        { id: "animation.test.walk", molang: animation },
        diagnoser
      );

      // Should have no errors - all variables are protected
      diagnoser.expectEmpty();
    });

    it("nullish coalescing in conditional should work correctly", () => {
      const diagnoser = Metadata.withMetadata(TestDiagnoser.create(), { userType: "Entities" } as MolangMetadata);

      // Entity defines v.condition
      const entity = new MolangSet();
      entity.assigned.add({ scope: "v", names: ["condition"], position: 0, type: NodeType.Variable });
      
      // Animation uses ?? in ternary operator
      const animation = new MolangSet();
      const molangText = 'v.condition ? (v.value ?? 0) : 1';
      animation.add(OffsetWord.create(molangText, 0));

      diagnose_molang_implementation(
        { id: "minecraft:test_entity", molang: entity },
        { id: "animation.test.walk", molang: animation },
        diagnoser
      );

      // Should have no errors
      diagnoser.expectEmpty();
    });

    it("different variable scopes with nullish coalescing", () => {
      const diagnoser = Metadata.withMetadata(TestDiagnoser.create(), { userType: "Entities" } as MolangMetadata);

      // Entity defines no variables
      const entity = new MolangSet();
      
      // Animation uses various scope prefixes with ??
      const animation = new MolangSet();
      const molangText = '(v.a ?? 0) + (variable.b ?? 0) + (t.c ?? 0) + (temp.d ?? 0)';
      animation.add(OffsetWord.create(molangText, 0));

      diagnose_molang_implementation(
        { id: "minecraft:test_entity", molang: entity },
        { id: "animation.test.walk", molang: animation },
        diagnoser
      );

      // Should have no errors - all protected by ??
      diagnoser.expectEmpty();
    });
  });
});
