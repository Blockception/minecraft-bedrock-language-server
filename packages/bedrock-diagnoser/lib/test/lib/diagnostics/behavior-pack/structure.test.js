"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const structure_1 = require("../../../../src/lib/diagnostics/behavior-pack/structure");
const diagnoser_1 = require("../../../diagnoser");
describe("BehaviorPack", () => {
    describe("Structures", () => {
        let diagnoser;
        let data;
        beforeEach(() => {
            diagnoser = diagnoser_1.TestDiagnoser.create();
            data = diagnoser.context.getProjectData().projectData;
        });
        it("quotes", () => {
            data.behaviorPacks.packs[0].structures.set({
                id: "test/example",
                documentation: "",
                location: { position: 0, uri: "" },
            });
            (0, structure_1.diagnose_structure_implementation)({ offset: 0, text: "test/example" }, diagnoser);
            (0, structure_1.diagnose_structure_implementation)({ offset: 0, text: "test:example" }, diagnoser);
            diagnoser.expectAmount(1);
        });
        it("no errors", () => {
            data.behaviorPacks.packs[0].structures.set({
                id: '"test/example"',
                documentation: "",
                location: { position: 0, uri: "" },
            });
            (0, structure_1.diagnose_structure_implementation)({ offset: 0, text: '"test/example"' }, diagnoser);
            (0, structure_1.diagnose_structure_implementation)({ offset: 0, text: '"test:example"' }, diagnoser);
            diagnoser.expectEmpty();
        });
        it("missing", () => {
            data.behaviorPacks.packs[0].structures.set({
                id: '"test/example"',
                documentation: "",
                location: { position: 0, uri: "" },
            });
            (0, structure_1.diagnose_structure_implementation)({ offset: 0, text: '"t/example"' }, diagnoser);
            (0, structure_1.diagnose_structure_implementation)({ offset: 0, text: '"t:example"' }, diagnoser);
            diagnoser.expectAmount(2);
        });
    });
});
//# sourceMappingURL=structure.test.js.map