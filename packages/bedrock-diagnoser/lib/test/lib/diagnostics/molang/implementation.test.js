"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const molang_1 = require("bc-minecraft-molang/lib/src/molang");
const diagnostics_1 = require("../../../../src/lib/diagnostics/molang/diagnostics");
const types_1 = require("../../../../src/lib/types");
const diagnoser_1 = require("../../../diagnoser");
describe("Molang", () => {
    describe("diagnose_molang_implementation", () => {
        it("no errors", () => {
            const diagnoser = types_1.Metadata.withMetadata(diagnoser_1.TestDiagnoser.create(), { userType: "Entities" });
            const using = new molang_1.MolangSet();
            const resource = new molang_1.MolangSet();
            (0, diagnostics_1.diagnose_molang_implementation)({ id: "animation.example.walk", molang: using }, { id: "minecraft:sheep", molang: resource }, diagnoser);
            using.assigned.add({ scope: "variable", names: ["foo"], position: 0, type: molang_1.NodeType.Variable });
            resource.using.add({ scope: "variable", names: ["foo"], position: 0, type: molang_1.NodeType.Variable });
            diagnoser.expectEmpty();
        });
        it("1 error", () => {
            const diagnoser = types_1.Metadata.withMetadata(diagnoser_1.TestDiagnoser.create(), { userType: "Entities" });
            const using = new molang_1.MolangSet();
            const resource = new molang_1.MolangSet();
            using.assigned.add({ scope: "variable", names: ["bar"], position: 0, type: molang_1.NodeType.Variable });
            resource.using.add({ scope: "variable", names: ["foo"], position: 0, type: molang_1.NodeType.Variable });
            (0, diagnostics_1.diagnose_molang_implementation)({ id: "animation.example.walk", molang: using }, { id: "minecraft:sheep", molang: resource }, diagnoser);
            diagnoser.expectAmount(1);
        });
        it("1 error", () => {
            const diagnoser = types_1.Metadata.withMetadata(diagnoser_1.TestDiagnoser.create(), { userType: "Entities" });
            const using = new molang_1.MolangSet();
            const resource = new molang_1.MolangSet();
            using.assigned.add({ scope: "variable", names: ["bar"], position: 0, type: molang_1.NodeType.Variable });
            resource.using.add({ scope: "variable", names: ["foo"], position: 0, type: molang_1.NodeType.Variable });
            (0, diagnostics_1.diagnose_molang_implementation)({ id: "animation.example.walk", molang: using }, { id: "minecraft:sheep", molang: resource }, diagnoser);
            diagnoser.expectAmount(1);
        });
    });
});
//# sourceMappingURL=implementation.test.js.map