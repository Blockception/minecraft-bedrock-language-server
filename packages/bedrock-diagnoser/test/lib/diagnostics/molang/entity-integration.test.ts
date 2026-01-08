import { MolangSet, NodeType } from "bc-minecraft-molang";
import { diagnose_molang_implementation, MolangMetadata } from "../../../../src/diagnostics/molang/diagnostics";
import { Metadata } from "../../../../src/types";
import { TestDiagnoser } from "../../../diagnoser";
import { OffsetWord } from 'bc-minecraft-bedrock-shared';

describe("Entity Integration Tests", () => {
  describe("Real-world entity scenarios", () => {
    it("entity with textures, geometry, and variable.attack_time should not produce false errors", () => {
      const diagnoser = Metadata.withMetadata(TestDiagnoser.create(), { userType: "Entities" } as MolangMetadata);

      // Entity defines textures var_0, var_1 and geometry default
      const entity = new MolangSet();
      entity.assigned.add({ scope: "texture", names: ["var_0"], position: 0, type: NodeType.ResourceReference });
      entity.assigned.add({ scope: "texture", names: ["var_1"], position: 0, type: NodeType.ResourceReference });
      entity.assigned.add({ scope: "geometry", names: ["default"], position: 0, type: NodeType.ResourceReference });

      // Animation uses variable.attack_time (built-in) and geometry.default (defined)
      const animation = new MolangSet();
      animation.add(OffsetWord.create("variable.attack_time * 10", 0));
      animation.add(OffsetWord.create("geometry.default ? 1 : 0", 0));

      diagnose_molang_implementation(
        { id: "pv:ceratosaurus", molang: entity },
        { id: "animation.pv_ceratosaurus.walk", molang: animation },
        diagnoser
      );

      // Should have no errors
      diagnoser.expectEmpty();
    });

    it("render controller using defined textures should not produce errors", () => {
      const diagnoser = Metadata.withMetadata(TestDiagnoser.create(), { userType: "RenderControllers" } as MolangMetadata);

      // Entity defines textures var_0 and var_1
      const entity = new MolangSet();
      entity.assigned.add({ scope: "texture", names: ["var_0"], position: 0, type: NodeType.ResourceReference });
      entity.assigned.add({ scope: "texture", names: ["var_1"], position: 0, type: NodeType.ResourceReference });

      // Render controller uses both textures
      const renderController = new MolangSet();
      renderController.using.add({ scope: "texture", names: ["var_0"], position: 0, type: NodeType.ResourceReference });
      renderController.using.add({ scope: "texture", names: ["var_1"], position: 0, type: NodeType.ResourceReference });

      diagnose_molang_implementation(
        { id: "pv:ceratosaurus", molang: entity },
        { id: "controller.render.pv_ceratosaurus", molang: renderController },
        diagnoser
      );

      // Should have no errors - both textures are defined
      diagnoser.expectEmpty();
    });

    it("render controller using undefined texture should produce error", () => {
      const diagnoser = Metadata.withMetadata(TestDiagnoser.create(), { userType: "RenderControllers" } as MolangMetadata);

      // Entity defines only var_0
      const entity = new MolangSet();
      entity.assigned.add({ scope: "texture", names: ["var_0"], position: 0, type: NodeType.ResourceReference });

      // Render controller uses both var_0 and undefined var_1
      const renderController = new MolangSet();
      renderController.using.add({ scope: "texture", names: ["var_0"], position: 0, type: NodeType.ResourceReference });
      renderController.using.add({ scope: "texture", names: ["var_1"], position: 0, type: NodeType.ResourceReference });

      diagnose_molang_implementation(
        { id: "pv:ceratosaurus", molang: entity },
        { id: "controller.render.pv_ceratosaurus", molang: renderController },
        diagnoser
      );

      // Should have 1 error for undefined texture.var_1
      diagnoser.expectAmount(1);
      expect(diagnoser.items[0].message).toContain("texture.var_1");
    });

    it("animation using undefined geometry should produce error", () => {
      const diagnoser = Metadata.withMetadata(TestDiagnoser.create(), { userType: "Entities" } as MolangMetadata);

      // Entity defines no geometries
      const entity = new MolangSet();

      // Animation tries to use undefined geometry
      const animation = new MolangSet();
      animation.using.add({ scope: "geometry", names: ["pv_ceratosaurus"], position: 0, type: NodeType.ResourceReference });

      diagnose_molang_implementation(
        { id: "pv:ceratosaurus", molang: entity },
        { id: "animation.pv_ceratosaurus.run", molang: animation },
        diagnoser
      );

      // Should have 1 error for undefined geometry
      diagnoser.expectAmount(1);
      expect(diagnoser.items[0].message).toContain("geometry.pv_ceratosaurus");
    });

    it("complex entity with all resource types and built-ins should work correctly", () => {
      const diagnoser = Metadata.withMetadata(TestDiagnoser.create(), { userType: "Entities" } as MolangMetadata);

      // Entity defines multiple resources
      const entity = new MolangSet();
      entity.assigned.add({ scope: "texture", names: ["default"], position: 0, type: NodeType.ResourceReference });
      entity.assigned.add({ scope: "texture", names: ["special"], position: 0, type: NodeType.ResourceReference });
      entity.assigned.add({ scope: "geometry", names: ["default"], position: 0, type: NodeType.ResourceReference });
      entity.assigned.add({ scope: "material", names: ["default"], position: 0, type: NodeType.ResourceReference });
      entity.assigned.add({ scope: "variable", names: ["custom"], position: 0, type: NodeType.Variable });

      // Animation uses mix of built-in, defined variables, and resources
      const animation = new MolangSet();
      // Built-in variable
      animation.add(OffsetWord.create("variable.attack_time", 0));
      // Built-in context
      animation.add(OffsetWord.create("context.is_first_person", 0));
      // Custom variable (defined by entity)
      animation.add(OffsetWord.create("variable.custom", 0));
      // Defined resources
      animation.add(OffsetWord.create("texture.default", 0));
      animation.add(OffsetWord.create("geometry.default", 0));
      animation.add(OffsetWord.create("material.default", 0));

      diagnose_molang_implementation(
        { id: "test:entity", molang: entity },
        { id: "animation.test.complex", molang: animation },
        diagnoser
      );

      // Should have no errors - everything is either built-in or defined
      diagnoser.expectEmpty();
    });
  });
});
