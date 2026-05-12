"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bc_minecraft_molang_1 = require("bc-minecraft-molang");
const diagnostics_1 = require("../../../../src/diagnostics/molang/diagnostics");
const types_1 = require("../../../../src/types");
const diagnoser_1 = require("../../../diagnoser");
const bc_minecraft_bedrock_shared_1 = require("bc-minecraft-bedrock-shared");
describe("Entity Integration Tests", () => {
    describe("Real-world entity scenarios", () => {
        it("entity with textures, geometry, and variable.attack_time should not produce false errors", () => {
            const diagnoser = types_1.Metadata.withMetadata(diagnoser_1.TestDiagnoser.create(), { userType: "Entities" });
            // Entity defines textures var_0, var_1 and geometry default
            const entity = new bc_minecraft_molang_1.MolangSet();
            entity.assigned.add({ scope: "texture", names: ["var_0"], position: 0, type: bc_minecraft_molang_1.NodeType.ResourceReference });
            entity.assigned.add({ scope: "texture", names: ["var_1"], position: 0, type: bc_minecraft_molang_1.NodeType.ResourceReference });
            entity.assigned.add({ scope: "geometry", names: ["default"], position: 0, type: bc_minecraft_molang_1.NodeType.ResourceReference });
            // Animation uses variable.attack_time (built-in) and geometry.default (defined)
            const animation = new bc_minecraft_molang_1.MolangSet();
            animation.add(bc_minecraft_bedrock_shared_1.OffsetWord.create("variable.attack_time * 10", 0));
            animation.add(bc_minecraft_bedrock_shared_1.OffsetWord.create("geometry.default ? 1 : 0", 0));
            (0, diagnostics_1.diagnose_molang_implementation)({ id: "pv:ceratosaurus", molang: entity }, { id: "animation.pv_ceratosaurus.walk", molang: animation }, diagnoser);
            // Should have no errors
            diagnoser.expectEmpty();
        });
        it("render controller using defined textures should not produce errors", () => {
            const diagnoser = types_1.Metadata.withMetadata(diagnoser_1.TestDiagnoser.create(), { userType: "RenderControllers" });
            // Entity defines textures var_0 and var_1
            const entity = new bc_minecraft_molang_1.MolangSet();
            entity.assigned.add({ scope: "texture", names: ["var_0"], position: 0, type: bc_minecraft_molang_1.NodeType.ResourceReference });
            entity.assigned.add({ scope: "texture", names: ["var_1"], position: 0, type: bc_minecraft_molang_1.NodeType.ResourceReference });
            // Render controller uses both textures
            const renderController = new bc_minecraft_molang_1.MolangSet();
            renderController.using.add({ scope: "texture", names: ["var_0"], position: 0, type: bc_minecraft_molang_1.NodeType.ResourceReference });
            renderController.using.add({ scope: "texture", names: ["var_1"], position: 0, type: bc_minecraft_molang_1.NodeType.ResourceReference });
            (0, diagnostics_1.diagnose_molang_implementation)({ id: "pv:ceratosaurus", molang: entity }, { id: "controller.render.pv_ceratosaurus", molang: renderController }, diagnoser);
            // Should have no errors - both textures are defined
            diagnoser.expectEmpty();
        });
        it("render controller using undefined texture should produce error", () => {
            const diagnoser = types_1.Metadata.withMetadata(diagnoser_1.TestDiagnoser.create(), { userType: "RenderControllers" });
            // Entity defines only var_0
            const entity = new bc_minecraft_molang_1.MolangSet();
            entity.assigned.add({ scope: "texture", names: ["var_0"], position: 0, type: bc_minecraft_molang_1.NodeType.ResourceReference });
            // Render controller uses both var_0 and undefined var_1
            const renderController = new bc_minecraft_molang_1.MolangSet();
            renderController.using.add({ scope: "texture", names: ["var_0"], position: 0, type: bc_minecraft_molang_1.NodeType.ResourceReference });
            renderController.using.add({ scope: "texture", names: ["var_1"], position: 0, type: bc_minecraft_molang_1.NodeType.ResourceReference });
            (0, diagnostics_1.diagnose_molang_implementation)({ id: "pv:ceratosaurus", molang: entity }, { id: "controller.render.pv_ceratosaurus", molang: renderController }, diagnoser);
            // Should have 1 error for undefined texture.var_1
            diagnoser.expectAmount(1);
            expect(diagnoser.items[0].message).toContain("texture.var_1");
        });
        it("animation using undefined geometry should produce error", () => {
            const diagnoser = types_1.Metadata.withMetadata(diagnoser_1.TestDiagnoser.create(), { userType: "Entities" });
            // Entity defines no geometries
            const entity = new bc_minecraft_molang_1.MolangSet();
            // Animation tries to use undefined geometry
            const animation = new bc_minecraft_molang_1.MolangSet();
            animation.using.add({ scope: "geometry", names: ["pv_ceratosaurus"], position: 0, type: bc_minecraft_molang_1.NodeType.ResourceReference });
            (0, diagnostics_1.diagnose_molang_implementation)({ id: "pv:ceratosaurus", molang: entity }, { id: "animation.pv_ceratosaurus.run", molang: animation }, diagnoser);
            // Should have 1 error for undefined geometry
            diagnoser.expectAmount(1);
            expect(diagnoser.items[0].message).toContain("geometry.pv_ceratosaurus");
        });
        it("complex entity with all resource types and built-ins should work correctly", () => {
            const diagnoser = types_1.Metadata.withMetadata(diagnoser_1.TestDiagnoser.create(), { userType: "Entities" });
            // Entity defines multiple resources
            const entity = new bc_minecraft_molang_1.MolangSet();
            entity.assigned.add({ scope: "texture", names: ["default"], position: 0, type: bc_minecraft_molang_1.NodeType.ResourceReference });
            entity.assigned.add({ scope: "texture", names: ["special"], position: 0, type: bc_minecraft_molang_1.NodeType.ResourceReference });
            entity.assigned.add({ scope: "geometry", names: ["default"], position: 0, type: bc_minecraft_molang_1.NodeType.ResourceReference });
            entity.assigned.add({ scope: "material", names: ["default"], position: 0, type: bc_minecraft_molang_1.NodeType.ResourceReference });
            entity.assigned.add({ scope: "variable", names: ["custom"], position: 0, type: bc_minecraft_molang_1.NodeType.Variable });
            // Animation uses mix of built-in, defined variables, and resources
            const animation = new bc_minecraft_molang_1.MolangSet();
            // Built-in variable
            animation.add(bc_minecraft_bedrock_shared_1.OffsetWord.create("variable.attack_time", 0));
            // Built-in context
            animation.add(bc_minecraft_bedrock_shared_1.OffsetWord.create("context.is_first_person", 0));
            // Custom variable (defined by entity)
            animation.add(bc_minecraft_bedrock_shared_1.OffsetWord.create("variable.custom", 0));
            // Defined resources
            animation.add(bc_minecraft_bedrock_shared_1.OffsetWord.create("texture.default", 0));
            animation.add(bc_minecraft_bedrock_shared_1.OffsetWord.create("geometry.default", 0));
            animation.add(bc_minecraft_bedrock_shared_1.OffsetWord.create("material.default", 0));
            (0, diagnostics_1.diagnose_molang_implementation)({ id: "test:entity", molang: entity }, { id: "animation.test.complex", molang: animation }, diagnoser);
            // Should have no errors - everything is either built-in or defined
            diagnoser.expectEmpty();
        });
    });
});
//# sourceMappingURL=entity-integration.test.js.map