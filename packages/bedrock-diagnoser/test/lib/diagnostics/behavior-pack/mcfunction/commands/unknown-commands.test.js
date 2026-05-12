"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const mcfunction_1 = require("../../../../../../src/diagnostics/behavior-pack/mcfunction");
const diagnoser_1 = require("../../../../../diagnoser");
describe("BehaviorPack", () => {
    describe("Mcfunctions", () => {
        describe("Unknown commands", () => {
            // Known valid commands should produce no errors
            const validCommands = [
                "say hello",
                "kill @a",
                "tp @s ~ ~ ~",
            ];
            // Completely unknown top-level commands should produce errors
            const unknownCommands = [
                "fake command",
                "notacommand",
                "foobar @a",
            ];
            for (const command of validCommands) {
                it(`valid: ${command}`, () => {
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
            for (const command of unknownCommands) {
                it(`unknown: ${command}`, () => {
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
//# sourceMappingURL=unknown-commands.test.js.map