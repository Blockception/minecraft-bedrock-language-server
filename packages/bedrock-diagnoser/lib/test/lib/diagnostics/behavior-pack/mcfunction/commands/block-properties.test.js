"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const mcfunction_1 = require("../../../../../../src/lib/diagnostics/behavior-pack/mcfunction");
const diagnoser_1 = require("../../../../../diagnoser");
describe("BehaviorPack", () => {
    describe("Mcfunctions", () => {
        describe("Commands", () => {
            //Correct commands
            const correctsCommands = [
                'setblock ~ ~ ~ spruce_log ["pillar_axis"="x"]',
                "setblock ~ ~ ~ spruce_log []",
            ];
            //Incorrect commands
            const incorrectCommands = [
                "setblock ~ ~ ~ spruce_log [pillar_axis:x]",
                "setblock ~ ~ ~ stone [pillar_axis:x]",
            ];
            for (let I = 0; I < correctsCommands.length; I++) {
                const command = correctsCommands[I];
                it(`correct ${command}`, () => {
                    const doc = {
                        uri: path_1.default.join("behavior_pack", "functions", "test.mcfunction"),
                        getText() {
                            return command;
                        },
                    };
                    const diagnoser = diagnoser_1.TestDiagnoser.createDocument(undefined, doc);
                    (0, mcfunction_1.diagnose_mcfunction_commands_document)(diagnoser);
                    diagnoser.expectEmpty();
                });
            }
            for (let I = 0; I < incorrectCommands.length; I++) {
                const command = incorrectCommands[I];
                it(`incorrect ${command}`, () => {
                    const doc = {
                        uri: path_1.default.join("behavior_pack", "functions", "test.mcfunction"),
                        getText() {
                            return command;
                        },
                    };
                    const diagnoser = diagnoser_1.TestDiagnoser.createDocument(undefined, doc);
                    (0, mcfunction_1.diagnose_mcfunction_commands_document)(diagnoser);
                    diagnoser.expectAny();
                });
            }
        });
    });
});
//# sourceMappingURL=block-properties.test.js.map