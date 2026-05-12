"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const structure_1 = require("../../../../src/diagnostics/behavior-pack/structure");
const diagnoser_1 = require("../../../diagnoser");
describe("BehaviorPack", () => {
    describe("Structures", () => {
        let diagnoser;
        let data;
        beforeEach(() => {
            diagnoser = diagnoser_1.TestDiagnoser.create();
            data = diagnoser.context.getProjectData().projectData;
        });
        it("simple namespace:name no errors", () => {
            data.behaviorPacks.packs[0].structures.set({
                id: "puff:coin1",
                documentation: "",
                location: { position: 0, uri: "" },
            });
            (0, structure_1.diagnose_structure_implementation)({ offset: 0, text: "puff:coin1" }, diagnoser);
            diagnoser.expectEmpty();
        });
        it("deep path namespace:name no errors", () => {
            data.behaviorPacks.packs[0].structures.set({
                id: "stuff:towers/diamond",
                documentation: "",
                location: { position: 0, uri: "" },
            });
            (0, structure_1.diagnose_structure_implementation)({ offset: 0, text: "stuff:towers/diamond" }, diagnoser);
            diagnoser.expectEmpty();
        });
        it("mystructure namespace for root structures", () => {
            data.behaviorPacks.packs[0].structures.set({
                id: "mystructure:house",
                documentation: "",
                location: { position: 0, uri: "" },
            });
            (0, structure_1.diagnose_structure_implementation)({ offset: 0, text: "mystructure:house" }, diagnoser);
            diagnoser.expectEmpty();
        });
        it("quoted structure name is looked up unquoted", () => {
            data.behaviorPacks.packs[0].structures.set({
                id: "mystructure:house",
                documentation: "",
                location: { position: 0, uri: "" },
            });
            (0, structure_1.diagnose_structure_implementation)({ offset: 0, text: '"mystructure:house"' }, diagnoser);
            diagnoser.expectEmpty();
        });
        it("missing structure reports error", () => {
            (0, structure_1.diagnose_structure_implementation)({ offset: 0, text: "puff:coin1" }, diagnoser);
            diagnoser.expectAmount(1);
        });
    });
});
//# sourceMappingURL=structure.test.js.map