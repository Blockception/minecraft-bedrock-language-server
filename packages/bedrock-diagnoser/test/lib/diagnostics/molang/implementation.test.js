"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bc_minecraft_molang_1 = require("bc-minecraft-molang");
const diagnostics_1 = require("../../../../src/diagnostics/molang/diagnostics");
const types_1 = require("../../../../src/types");
const diagnoser_1 = require("../../../diagnoser");
const bc_minecraft_bedrock_shared_1 = require("bc-minecraft-bedrock-shared");
describe("Molang", () => {
    describe("diagnose_molang_implementation", () => {
        it("no errors", () => {
            const diagnoser = types_1.Metadata.withMetadata(diagnoser_1.TestDiagnoser.create(), { userType: "Entities" });
            const using = new bc_minecraft_molang_1.MolangSet();
            const resource = new bc_minecraft_molang_1.MolangSet();
            using.assigned.add({ scope: "variable", names: ["foo"], position: 0, type: bc_minecraft_molang_1.NodeType.Variable });
            resource.using.add({ scope: "variable", names: ["foo"], position: 0, type: bc_minecraft_molang_1.NodeType.Variable });
            (0, diagnostics_1.diagnose_molang_implementation)({ id: "animation.example.walk", molang: using }, { id: "minecraft:sheep", molang: resource }, diagnoser);
            diagnoser.expectEmpty();
        });
        it("it should be able to pass with short hand checks", () => {
            const diagnoser = types_1.Metadata.withMetadata(diagnoser_1.TestDiagnoser.create(), { userType: "Entities" });
            const using = new bc_minecraft_molang_1.MolangSet();
            const resource = new bc_minecraft_molang_1.MolangSet();
            using.assigned.add({ scope: "variable", names: ["foo"], position: 0, type: bc_minecraft_molang_1.NodeType.Variable });
            resource.using.add({ scope: "v", names: ["foo"], position: 0, type: bc_minecraft_molang_1.NodeType.Variable });
            using.assigned.add({ scope: "v", names: ["bar"], position: 0, type: bc_minecraft_molang_1.NodeType.Variable });
            resource.using.add({ scope: "variable", names: ["bar"], position: 0, type: bc_minecraft_molang_1.NodeType.Variable });
            (0, diagnostics_1.diagnose_molang_implementation)({ id: "animation.example.walk", molang: using }, { id: "minecraft:sheep", molang: resource }, diagnoser);
            diagnoser.expectEmpty();
        });
        it("1 error", () => {
            const diagnoser = types_1.Metadata.withMetadata(diagnoser_1.TestDiagnoser.create(), { userType: "Entities" });
            const using = new bc_minecraft_molang_1.MolangSet();
            const resource = new bc_minecraft_molang_1.MolangSet();
            using.assigned.add({ scope: "variable", names: ["bar"], position: 0, type: bc_minecraft_molang_1.NodeType.Variable });
            resource.using.add({ scope: "variable", names: ["foo"], position: 0, type: bc_minecraft_molang_1.NodeType.Variable });
            (0, diagnostics_1.diagnose_molang_implementation)({ id: "animation.example.walk", molang: using }, { id: "minecraft:sheep", molang: resource }, diagnoser);
            diagnoser.expectAmount(1);
        });
        it("nullish coalescing should not require variable to be defined (issue fix)", () => {
            const diagnoser = types_1.Metadata.withMetadata(diagnoser_1.TestDiagnoser.create(), { userType: "Entities" });
            // Entity defines no variables
            const entity = new bc_minecraft_molang_1.MolangSet();
            // Animation uses v.width with null coalescing - should NOT require it to be defined
            const animation = new bc_minecraft_molang_1.MolangSet();
            const molangText = 'v.width ?? 1';
            animation.add(bc_minecraft_bedrock_shared_1.OffsetWord.create(molangText, 0));
            // Should have no errors because v.width is protected by ??
            (0, diagnostics_1.diagnose_molang_implementation)({ id: "minecraft:test_entity", molang: entity }, { id: "animation.test.walk", molang: animation }, diagnoser);
            diagnoser.expectEmpty();
        });
        it("complex nullish coalescing expression should not require undefined variables", () => {
            const diagnoser = types_1.Metadata.withMetadata(diagnoser_1.TestDiagnoser.create(), { userType: "Entities" });
            // Entity defines variable.is_rolled_up
            const entity = new bc_minecraft_molang_1.MolangSet();
            entity.assigned.add({ scope: "variable", names: ["is_rolled_up"], position: 0, type: bc_minecraft_molang_1.NodeType.Variable });
            // Animation uses complex expression with null coalescing
            const animation = new bc_minecraft_molang_1.MolangSet();
            const molangText = 'variable.rolled_up_time = variable.is_rolled_up ? ((variable.rolled_up_time ?? 0.0) + query.delta_time) : 0.0';
            animation.add(bc_minecraft_bedrock_shared_1.OffsetWord.create(molangText, 0));
            // Should have no errors:
            // - variable.rolled_up_time is assigned, not using
            // - variable.is_rolled_up is in using, but entity defines it
            // - variable.rolled_up_time inside ?? is protected, not in using
            (0, diagnostics_1.diagnose_molang_implementation)({ id: "minecraft:test_entity", molang: entity }, { id: "animation.test.walk", molang: animation }, diagnoser);
            diagnoser.expectEmpty();
        });
        it("should still report error for undefined variable not protected by nullish coalescing", () => {
            const diagnoser = types_1.Metadata.withMetadata(diagnoser_1.TestDiagnoser.create(), { userType: "Entities" });
            // Entity defines no variables
            const entity = new bc_minecraft_molang_1.MolangSet();
            // Animation uses undefined variable WITHOUT null coalescing protection
            const animation = new bc_minecraft_molang_1.MolangSet();
            const molangText = 'v.width + 1'; // No ?? here, should require definition
            animation.add(bc_minecraft_bedrock_shared_1.OffsetWord.create(molangText, 0));
            (0, diagnostics_1.diagnose_molang_implementation)({ id: "minecraft:test_entity", molang: entity }, { id: "animation.test.walk", molang: animation }, diagnoser);
            // Should have 1 error for undefined v.width
            diagnoser.expectAmount(1);
        });
        it("right side of nullish coalescing should still require definition if it's a variable", () => {
            const diagnoser = types_1.Metadata.withMetadata(diagnoser_1.TestDiagnoser.create(), { userType: "Entities" });
            // Entity defines no variables
            const entity = new bc_minecraft_molang_1.MolangSet();
            // Animation uses v.fallback on right side of ?? - should require it to be defined
            const animation = new bc_minecraft_molang_1.MolangSet();
            const molangText = 'v.primary ?? v.fallback';
            animation.add(bc_minecraft_bedrock_shared_1.OffsetWord.create(molangText, 0));
            (0, diagnostics_1.diagnose_molang_implementation)({ id: "minecraft:test_entity", molang: entity }, { id: "animation.test.walk", molang: animation }, diagnoser);
            // Should have 1 error for undefined v.fallback (right side still needs definition)
            diagnoser.expectAmount(1);
        });
        it("chained nullish coalescing with final literal should not require any variables", () => {
            const diagnoser = types_1.Metadata.withMetadata(diagnoser_1.TestDiagnoser.create(), { userType: "Entities" });
            // Entity defines no variables
            const entity = new bc_minecraft_molang_1.MolangSet();
            // Animation uses chained ?? with literal at the end
            const animation = new bc_minecraft_molang_1.MolangSet();
            const molangText = 'v.a ?? (v.b ?? (v.c ?? 0))'; // All are protected by ??
            animation.add(bc_minecraft_bedrock_shared_1.OffsetWord.create(molangText, 0));
            (0, diagnostics_1.diagnose_molang_implementation)({ id: "minecraft:test_entity", molang: entity }, { id: "animation.test.walk", molang: animation }, diagnoser);
            // Should have no errors - all variables are protected
            diagnoser.expectEmpty();
        });
        it("nullish coalescing mixed with regular usage should only protect left side", () => {
            const diagnoser = types_1.Metadata.withMetadata(diagnoser_1.TestDiagnoser.create(), { userType: "Entities" });
            // Entity defines no variables
            const entity = new bc_minecraft_molang_1.MolangSet();
            // Animation uses variable both in ?? and outside
            const animation = new bc_minecraft_molang_1.MolangSet();
            const molangText = 'v.result = v.required + (v.optional ?? 0)';
            animation.add(bc_minecraft_bedrock_shared_1.OffsetWord.create(molangText, 0));
            (0, diagnostics_1.diagnose_molang_implementation)({ id: "minecraft:test_entity", molang: entity }, { id: "animation.test.walk", molang: animation }, diagnoser);
            // Should have 1 error for undefined v.required (not protected by ??)
            // v.optional is protected, v.result is assigned
            diagnoser.expectAmount(1);
        });
        it("multiple nullish coalescing expressions should all be protected", () => {
            const diagnoser = types_1.Metadata.withMetadata(diagnoser_1.TestDiagnoser.create(), { userType: "Entities" });
            // Entity defines no variables
            const entity = new bc_minecraft_molang_1.MolangSet();
            // Animation uses multiple ?? expressions
            const animation = new bc_minecraft_molang_1.MolangSet();
            const molangText = '(v.x ?? 0) + (v.y ?? 0) + (v.z ?? 0)';
            animation.add(bc_minecraft_bedrock_shared_1.OffsetWord.create(molangText, 0));
            (0, diagnostics_1.diagnose_molang_implementation)({ id: "minecraft:test_entity", molang: entity }, { id: "animation.test.walk", molang: animation }, diagnoser);
            // Should have no errors - all variables are protected
            diagnoser.expectEmpty();
        });
        it("nullish coalescing in conditional should work correctly", () => {
            const diagnoser = types_1.Metadata.withMetadata(diagnoser_1.TestDiagnoser.create(), { userType: "Entities" });
            // Entity defines v.condition
            const entity = new bc_minecraft_molang_1.MolangSet();
            entity.assigned.add({ scope: "v", names: ["condition"], position: 0, type: bc_minecraft_molang_1.NodeType.Variable });
            // Animation uses ?? in ternary operator
            const animation = new bc_minecraft_molang_1.MolangSet();
            const molangText = 'v.condition ? (v.value ?? 0) : 1';
            animation.add(bc_minecraft_bedrock_shared_1.OffsetWord.create(molangText, 0));
            (0, diagnostics_1.diagnose_molang_implementation)({ id: "minecraft:test_entity", molang: entity }, { id: "animation.test.walk", molang: animation }, diagnoser);
            // Should have no errors
            diagnoser.expectEmpty();
        });
        it("different variable scopes with nullish coalescing", () => {
            const diagnoser = types_1.Metadata.withMetadata(diagnoser_1.TestDiagnoser.create(), { userType: "Entities" });
            // Entity defines no variables
            const entity = new bc_minecraft_molang_1.MolangSet();
            // Animation uses various scope prefixes with ??
            const animation = new bc_minecraft_molang_1.MolangSet();
            const molangText = '(v.a ?? 0) + (variable.b ?? 0) + (t.c ?? 0) + (temp.d ?? 0)';
            animation.add(bc_minecraft_bedrock_shared_1.OffsetWord.create(molangText, 0));
            (0, diagnostics_1.diagnose_molang_implementation)({ id: "minecraft:test_entity", molang: entity }, { id: "animation.test.walk", molang: animation }, diagnoser);
            // Should have no errors - all protected by ??
            diagnoser.expectEmpty();
        });
        it("built-in variable.attack_time should not require definition for Entities", () => {
            const diagnoser = types_1.Metadata.withMetadata(diagnoser_1.TestDiagnoser.create(), { userType: "Entities" });
            // Entity defines no variables
            const entity = new bc_minecraft_molang_1.MolangSet();
            // Animation uses built-in variable.attack_time
            const animation = new bc_minecraft_molang_1.MolangSet();
            const molangText = 'variable.attack_time';
            animation.add(bc_minecraft_bedrock_shared_1.OffsetWord.create(molangText, 0));
            (0, diagnostics_1.diagnose_molang_implementation)({ id: "minecraft:test_entity", molang: entity }, { id: "animation.test.walk", molang: animation }, diagnoser);
            // Should have no errors - attack_time is built-in for Entities
            diagnoser.expectEmpty();
        });
        it("built-in variable.attack_time should not require definition for RenderControllers", () => {
            const diagnoser = types_1.Metadata.withMetadata(diagnoser_1.TestDiagnoser.create(), { userType: "RenderControllers" });
            // Entity defines no variables
            const entity = new bc_minecraft_molang_1.MolangSet();
            // Render controller uses built-in variable.attack_time
            const renderController = new bc_minecraft_molang_1.MolangSet();
            const molangText = 'variable.attack_time';
            renderController.add(bc_minecraft_bedrock_shared_1.OffsetWord.create(molangText, 0));
            (0, diagnostics_1.diagnose_molang_implementation)({ id: "minecraft:test_entity", molang: entity }, { id: "controller.render.test", molang: renderController }, diagnoser);
            // Should have no errors - attack_time is built-in for RenderControllers
            diagnoser.expectEmpty();
        });
        it("built-in context.is_first_person should not require definition for Entities", () => {
            const diagnoser = types_1.Metadata.withMetadata(diagnoser_1.TestDiagnoser.create(), { userType: "Entities" });
            // Entity defines no contexts
            const entity = new bc_minecraft_molang_1.MolangSet();
            // Animation uses built-in context.is_first_person
            const animation = new bc_minecraft_molang_1.MolangSet();
            const molangText = 'context.is_first_person';
            animation.add(bc_minecraft_bedrock_shared_1.OffsetWord.create(molangText, 0));
            (0, diagnostics_1.diagnose_molang_implementation)({ id: "minecraft:test_entity", molang: entity }, { id: "animation.test.walk", molang: animation }, diagnoser);
            // Should have no errors - is_first_person is built-in context for Entities
            diagnoser.expectEmpty();
        });
        it("built-in context.item_slot should not require definition for Entities", () => {
            const diagnoser = types_1.Metadata.withMetadata(diagnoser_1.TestDiagnoser.create(), { userType: "Entities" });
            // Entity defines no contexts
            const entity = new bc_minecraft_molang_1.MolangSet();
            // Animation uses built-in context.item_slot
            const animation = new bc_minecraft_molang_1.MolangSet();
            const molangText = 'c.item_slot';
            animation.add(bc_minecraft_bedrock_shared_1.OffsetWord.create(molangText, 0));
            (0, diagnostics_1.diagnose_molang_implementation)({ id: "minecraft:test_entity", molang: entity }, { id: "animation.test.walk", molang: animation }, diagnoser);
            // Should have no errors - item_slot is built-in context for Entities (using shorthand c.)
            diagnoser.expectEmpty();
        });
        it("texture references should require definition", () => {
            const diagnoser = types_1.Metadata.withMetadata(diagnoser_1.TestDiagnoser.create(), { userType: "Entities" });
            // Entity defines texture.var_0
            const entity = new bc_minecraft_molang_1.MolangSet();
            entity.assigned.add({ scope: "texture", names: ["var_0"], position: 0, type: bc_minecraft_molang_1.NodeType.ResourceReference });
            // Render controller uses texture.var_0 and texture.var_1
            const renderController = new bc_minecraft_molang_1.MolangSet();
            renderController.using.add({ scope: "texture", names: ["var_0"], position: 0, type: bc_minecraft_molang_1.NodeType.ResourceReference });
            renderController.using.add({ scope: "texture", names: ["var_1"], position: 0, type: bc_minecraft_molang_1.NodeType.ResourceReference });
            (0, diagnostics_1.diagnose_molang_implementation)({ id: "minecraft:test_entity", molang: entity }, { id: "controller.render.test", molang: renderController }, diagnoser);
            // Should have 1 error for undefined texture.var_1 (var_0 is defined)
            diagnoser.expectAmount(1);
        });
        it("geometry references should require definition", () => {
            const diagnoser = types_1.Metadata.withMetadata(diagnoser_1.TestDiagnoser.create(), { userType: "Entities" });
            // Entity defines no geometries
            const entity = new bc_minecraft_molang_1.MolangSet();
            // Animation uses geometry.pv_ceratosaurus
            const animation = new bc_minecraft_molang_1.MolangSet();
            animation.using.add({ scope: "geometry", names: ["pv_ceratosaurus"], position: 0, type: bc_minecraft_molang_1.NodeType.ResourceReference });
            (0, diagnostics_1.diagnose_molang_implementation)({ id: "minecraft:test_entity", molang: entity }, { id: "animation.test.run", molang: animation }, diagnoser);
            // Should have 1 error for undefined geometry
            diagnoser.expectAmount(1);
        });
        it("material references should require definition", () => {
            const diagnoser = types_1.Metadata.withMetadata(diagnoser_1.TestDiagnoser.create(), { userType: "Entities" });
            // Entity defines material.default
            const entity = new bc_minecraft_molang_1.MolangSet();
            entity.assigned.add({ scope: "material", names: ["default"], position: 0, type: bc_minecraft_molang_1.NodeType.ResourceReference });
            // Render controller uses material.default
            const renderController = new bc_minecraft_molang_1.MolangSet();
            renderController.using.add({ scope: "material", names: ["default"], position: 0, type: bc_minecraft_molang_1.NodeType.ResourceReference });
            (0, diagnostics_1.diagnose_molang_implementation)({ id: "minecraft:test_entity", molang: entity }, { id: "controller.render.test", molang: renderController }, diagnoser);
            // Should have no errors - material is defined
            diagnoser.expectEmpty();
        });
    });
});
//# sourceMappingURL=implementation.test.js.map